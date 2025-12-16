/**
 * Supabase Entities - API Client für MimiCheck Backend
 * 
 * Features:
 * - Type-safe CRUD Operations
 * - Automatic user_id injection
 * - Error handling
 * - RLS-compliant
 * 
 * @author Cascade AI
 * @date 2025-11-14
 */

import { supabase } from './supabaseClient';
import type {
  UserProfile as UserProfileType,
  Application,
  Abrechnung as AbrechnungType,
  Foerderleistung as FoerderleistungType,
  Antrag as AntragType,
  Notification as NotificationType,
  UploadResult,
  ListOptions
} from './types';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get current user's profile ID (creates profile if not exists)
 */
async function getCurrentUserProfileId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Try to find existing profile
  const { data: profile } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user.id)
    .single();

  // If profile exists, return it
  if (profile) return profile.id;

  // Profile not found - create one automatically
  console.warn('Creating new user profile for:', user.email);
  const { data: newProfile, error: insertError } = await supabase
    .from('users')
    .insert({
      auth_id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      created_at: new Date().toISOString()
    })
    .select('id')
    .single();

  if (insertError) {
    console.error('Failed to create user profile:', insertError);
    throw new Error('Could not create user profile');
  }

  return newProfile.id;
}

/**
 * Handle Supabase errors
 */
function handleError(error: unknown, operation: string): never {
  console.error(`${operation} failed:`, error);
  const message = error instanceof Error ? error.message : `${operation} failed`;
  throw new Error(message);
}

function sanitizeUserProfileUpdates(updates: Record<string, unknown>): Record<string, unknown> {
  const input: Record<string, unknown> = updates || {};

  // Flatten legacy nested payloads (best-effort)
  const legacyLebenssituation = (input.lebenssituation && typeof input.lebenssituation === 'object') ? (input.lebenssituation as Record<string, unknown>) : {};
  const wohnadresse = (legacyLebenssituation.wohnadresse && typeof legacyLebenssituation.wohnadresse === 'object') ? (legacyLebenssituation.wohnadresse as Record<string, unknown>) : {};
  const bankverbindung = (legacyLebenssituation.bankverbindung && typeof legacyLebenssituation.bankverbindung === 'object') ? (legacyLebenssituation.bankverbindung as Record<string, unknown>) : {};

  const merged: Record<string, unknown> = {
    ...input,
    // Legacy mappings
    plz: input.plz ?? wohnadresse.plz,
    ort: input.ort ?? wohnadresse.ort,
    strasse: input.strasse ?? wohnadresse.strasse,
    iban: input.iban ?? bankverbindung.iban,
    bic: input.bic ?? bankverbindung.bic,
    kontoinhaber: input.kontoinhaber ?? bankverbindung.kontoinhaber,
    nettoeinkommen: input.nettoeinkommen ?? input.monatliches_nettoeinkommen ?? legacyLebenssituation.monatliches_nettoeinkommen,
    beschaeftigungsart: input.beschaeftigungsart ?? input.beschaeftigungsstatus ?? legacyLebenssituation.beschaeftigungsstatus,
    kaltmiete: input.kaltmiete ?? input.monatliche_miete ?? input.monatliche_miete_kalt ?? legacyLebenssituation.monatliche_miete_kalt,
    anzahl_kinder: input.anzahl_kinder ?? input.kinder_anzahl ?? legacyLebenssituation.anzahl_kinder
  };

  // Drop unsupported / dangerous keys
  delete merged.id;
  delete merged.auth_id;
  delete merged.created_at;
  delete merged.updated_at;
  delete merged.last_signed_in;
  delete merged.full_name;
  delete merged.lebenssituation;

  // Only allow columns that exist on public.users
  const allowed = new Set([
    'name', 'email', 'role',
    'stripe_customer_id', 'subscription_tier', 'subscription_status', 'subscription_id', 'subscription_current_period_end',
    'anrede', 'vorname', 'nachname', 'geburtsdatum', 'steuer_id', 'sozialversicherungsnummer',
    'strasse', 'hausnummer', 'adresszusatz', 'plz', 'ort', 'bundesland', 'landkreis',
    'telefon_mobil', 'telefon_festnetz', 'de_mail',
    'iban', 'bic', 'kontoinhaber', 'bank_name',
    'krankenversicherung_typ', 'krankenversicherung_name', 'krankenversicherung_nummer',
    'wohnform', 'wohnflaeche', 'anzahl_zimmer', 'kaltmiete', 'nebenkosten', 'heizkosten', 'einzugsdatum', 'wohnart',
    'beschaeftigungsart', 'arbeitgeber', 'bruttoeinkommen', 'nettoeinkommen', 'weitere_einkuenfte',
    'familienstand', 'partner_vorname', 'partner_nachname', 'partner_geburtsdatum', 'partner_einkommen',
    'kinder', 'anzahl_kinder',
    'vermoegen_gesamt', 'vermoegen_details',
    'behinderung', 'behinderungsgrad', 'pflegegrad', 'schwangerschaft', 'alleinerziehend',
    'bildungsstand', 'aktuell_in_ausbildung', 'ausbildungsart', 'ausbildungsstaette',
    'dsgvo_einwilligung', 'ki_verarbeitung_einwilligung', 'datenweitergabe_behoerden',
    'profile_completeness', 'onboarding_completed_at', 'zustimmung'
  ]);

  const numericFields = new Set([
    'kaltmiete', 'nebenkosten', 'heizkosten', 'bruttoeinkommen', 'nettoeinkommen', 'partner_einkommen', 'vermoegen_gesamt'
  ]);
  const intFields = new Set([
    'wohnflaeche', 'anzahl_zimmer', 'anzahl_kinder', 'behinderungsgrad', 'pflegegrad', 'profile_completeness'
  ]);
  const boolFields = new Set([
    'behinderung', 'schwangerschaft', 'alleinerziehend',
    'aktuell_in_ausbildung',
    'dsgvo_einwilligung', 'ki_verarbeitung_einwilligung', 'datenweitergabe_behoerden',
    'zustimmung'
  ]);
  const jsonFields = new Set(['weitere_einkuenfte', 'kinder', 'vermoegen_details']);
  const dateFields = new Set(['geburtsdatum', 'einzugsdatum']);

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (!allowed.has(key)) continue;

    // Normalize empty strings
    if (value === '') {
      sanitized[key] = null;
      continue;
    }

    if (value === undefined) continue;

    if (numericFields.has(key)) {
      if (value === null) {
        sanitized[key] = null;
      } else {
        const num = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
        sanitized[key] = Number.isFinite(num) ? num : null;
      }
      continue;
    }

    if (intFields.has(key)) {
      if (value === null) {
        sanitized[key] = null;
      } else {
        const num = typeof value === 'number' ? value : Number(String(value));
        sanitized[key] = Number.isFinite(num) ? Math.trunc(num) : null;
      }
      continue;
    }

    if (boolFields.has(key)) {
      if (typeof value === 'boolean') {
        sanitized[key] = value;
      } else if (value === null) {
        sanitized[key] = null;
      } else {
        const v = String(value).toLowerCase().trim();
        sanitized[key] = v === 'true' || v === '1' || v === 'yes';
      }
      continue;
    }

    if (jsonFields.has(key)) {
      if (typeof value === 'string') {
        try {
          sanitized[key] = JSON.parse(value);
        } catch {
          sanitized[key] = null;
        }
      } else {
        sanitized[key] = value;
      }
      continue;
    }

    if (dateFields.has(key)) {
      if (value === null) {
        sanitized[key] = null;
      } else {
        // Keep YYYY-MM-DD as-is; if ISO timestamp, keep as-is (Postgres can parse)
        sanitized[key] = value;
      }
      continue;
    }

    sanitized[key] = value;
  }

  return sanitized;
}

// ============================================
// USER PROFILES
// ============================================

interface UserProfileEntity {
  _profileCache: UserProfileType | null;
  _profileCacheTime: number;
  _CACHE_TTL: number;
  getCurrent(forceRefresh?: boolean): Promise<UserProfileType | null>;
  me(): Promise<UserProfileType | null>;
  updateProfile(updates: Partial<UserProfileType>): Promise<UserProfileType>;
  updateMyUserData(updates: Partial<UserProfileType>): Promise<UserProfileType>;
  update(updates: Partial<UserProfileType>): Promise<UserProfileType>;
}

export const UserProfile: UserProfileEntity = {
  // Cache for user profile
  _profileCache: null,
  _profileCacheTime: 0,
  _CACHE_TTL: 60000, // 1 minute

  /**
   * Get current user's profile (with caching)
   */
  async getCurrent(forceRefresh = false) {
    try {
      // Check cache first (schnellster Pfad)
      const now = Date.now();
      if (!forceRefresh && this._profileCache && (now - this._profileCacheTime < this._CACHE_TTL)) {
        return this._profileCache;
      }

      // Timeout für getUser (verhindert Hängen)
      const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) => {
        setTimeout(() => resolve({ data: { user: null } }), 3000);
      });
      
      const userPromise = supabase.auth.getUser();
      const { data: { user } } = await Promise.race([userPromise, timeoutPromise]);
      
      if (!user) {
        // No auth user found - return null silently
        return null;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (error) {
        console.error('UserProfile.getCurrent: Error fetching profile:', error);
        // Wenn kein Profil gefunden, erstelle eines
        if (error.code === 'PGRST116') {
          console.warn('UserProfile.getCurrent: Creating new profile for', user.email);
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert({
              auth_id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
              created_at: new Date().toISOString()
            })
            .select('*')
            .single();
          
          if (createError) {
            console.error('UserProfile.getCurrent: Failed to create profile:', createError);
            return null;
          }
          
          // Füge full_name als Alias hinzu für Kompatibilität
          const profileWithAlias: UserProfileType = { ...newProfile, full_name: newProfile.name };
          this._profileCache = profileWithAlias;
          this._profileCacheTime = now;
          return profileWithAlias;
        }
        throw error;
      }

      // Füge full_name als Alias hinzu für Kompatibilität mit bestehendem Code
      const profileWithAlias: UserProfileType = { ...data, full_name: data.name };
      
      // Update cache
      this._profileCache = profileWithAlias;
      this._profileCacheTime = now;

      return profileWithAlias;
    } catch (error) {
      console.error('UserProfile.getCurrent: Unexpected error:', error);
      // Nicht werfen - einfach null zurückgeben
      return null;
    }
  },

  /**
   * Alias for getCurrent (legacy support)
   */
  async me() {
    return this.getCurrent();
  },

  /**
   * Alias for update (legacy support)
   */
  async updateProfile(updates) {
    return this.update(updates);
  },

  /**
   * Alias for update (legacy support)
   */
  async updateMyUserData(updates) {
    return this.update(updates);
  },

  /**
   * Update current user's profile
   */
  async update(updates) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const safeUpdates = sanitizeUserProfileUpdates(updates as Record<string, unknown>);

      const { data, error } = await supabase
        .from('users')
        .update(safeUpdates)
        .eq('auth_id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update cache
      this._profileCache = data;
      this._profileCacheTime = Date.now();

      return data;
    } catch (error) {
      handleError(error, 'Update user profile');
    }
  }
};


// ============================================
// ABRECHNUNGEN (mapped to 'applications' table)
// ============================================

interface AbrechnungEntity {
  list(options?: ListOptions): Promise<AbrechnungType[]>;
  get(id: string): Promise<AbrechnungType | null>;
  create(abrechnungData: Partial<AbrechnungType>): Promise<AbrechnungType | null>;
  update(id: string, updates: Partial<AbrechnungType>): Promise<AbrechnungType | null>;
  delete(id: string): Promise<{ success: boolean }>;
}

export const Abrechnung: AbrechnungEntity = {
  /**
   * List all abrechnungen for current user
   * NOTE: Uses 'applications' table in database
   */
  async list(options = {}) {
    try {
      const userId = await getCurrentUserProfileId();

      let query = supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId);

      // Sorting - map legacy field names to actual columns
      if (options.orderBy) {
        const orderField = options.orderBy === 'created_date' ? 'created_at' : options.orderBy;
        query = query.order(orderField, { ascending: options.ascending ?? false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Map fields for backward compatibility
      return (data || []).flatMap((item: unknown) => {
        if (!item || typeof item !== 'object') return [];
        const record = item as unknown as AbrechnungType & Record<string, unknown>;
        const title = record.title;
        const createdAt = record.created_at;

        const filename = typeof title === 'string'
          ? title
          : (title === null || title === undefined ? title : String(title));

        const created_date = typeof createdAt === 'string'
          ? createdAt
          : (createdAt === null || createdAt === undefined ? createdAt : String(createdAt));

        return [{
          ...record,
          filename,
          created_date
        } as unknown as AbrechnungType];
      });
    } catch (error) {
      console.error('List abrechnungen failed:', error);
      // Return empty array instead of throwing - graceful degradation
      return [];
    }
  },

  /**
   * Get single abrechnung by ID
   */
  async get(id) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data ? { ...data, filename: data.title, created_date: data.created_at } : null;
    } catch (error) {
      handleError(error, 'Get abrechnung');
    }
  },

  /**
   * Create new abrechnung
   */
  async create(abrechnungData) {
    try {
      const userId = await getCurrentUserProfileId();

      // Map legacy field names to actual columns
      const mappedData: Partial<Application> = {
        ...abrechnungData,
        title: abrechnungData.filename || abrechnungData.title || 'Neue Abrechnung',
        type: abrechnungData.type || 'abrechnung',
        user_id: userId
      };
      delete mappedData.filename;
      delete mappedData.created_date;

      const { data, error } = await supabase
        .from('applications')
        .insert(mappedData)
        .select()
        .single();

      if (error) throw error;
      return data ? { ...data, filename: data.title, created_date: data.created_at } : null;
    } catch (error) {
      handleError(error, 'Create abrechnung');
    }
  },

  /**
   * Update abrechnung
   */
  async update(id, updates) {
    try {
      const userId = await getCurrentUserProfileId();

      // Map legacy field names
      const mappedUpdates: Partial<Application> = { ...updates };
      if (mappedUpdates.filename) {
        mappedUpdates.title = mappedUpdates.filename;
        delete mappedUpdates.filename;
      }

      const { data, error } = await supabase
        .from('applications')
        .update(mappedUpdates)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data ? { ...data, filename: data.title, created_date: data.created_at } : null;
    } catch (error) {
      handleError(error, 'Update abrechnung');
    }
  },

  /**
   * Delete abrechnung
   */
  async delete(id) {
    try {
      const userId = await getCurrentUserProfileId();

      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      handleError(error, 'Delete abrechnung');
    }
  }
};

// ============================================
// FÖRDERLEISTUNGEN
// ============================================

interface FoerderleistungEntity {
  list(options?: ListOptions): Promise<FoerderleistungType[]>;
  get(id: string): Promise<FoerderleistungType | null>;
  create(foerderleistungData: Partial<FoerderleistungType>): Promise<FoerderleistungType | null>;
  update(id: string, updates: Partial<FoerderleistungType>): Promise<FoerderleistungType | null>;
}

export const Foerderleistung: FoerderleistungEntity = {
  /**
   * List all förderleistungen (including global ones)
   */
  async list(options = {}) {
    try {
      let userId: string | null = null;
      try {
        userId = await getCurrentUserProfileId();
      } catch {
        // Not authenticated - only show public entries
      }

      let query = supabase
        .from('foerderleistungen')
        .select('*');

      // Show public (user_id IS NULL) and own entries
      if (userId) {
        query = query.or(`user_id.eq.${userId},user_id.is.null`);
      } else {
        query = query.is('user_id', null);
      }

      // Filter by type
      if (options.typ) {
        query = query.eq('typ', options.typ);
      }

      // Filter by status
      if (options.status) {
        query = query.eq('status', options.status);
      }

      // Sorting
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('List förderleistungen failed:', error);
      return [];
    }
  },

  /**
   * Get single förderleistung
   */
  async get(id) {
    try {
      const { data, error } = await supabase
        .from('foerderleistungen')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'Get förderleistung');
    }
  },

  /**
   * Create new förderleistung
   */
  async create(foerderleistungData) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('foerderleistungen')
        .insert({
          ...foerderleistungData,
          user_id: userId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'Create förderleistung');
    }
  },

  /**
   * Update förderleistung
   */
  async update(id, updates) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('foerderleistungen')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'Update förderleistung');
    }
  }
};

// ============================================
// ANTRÄGE (mapped to 'applications' table)
// ============================================

interface AntragEntity {
  list(options?: ListOptions): Promise<AntragType[]>;
  get(id: string): Promise<AntragType | null>;
  create(antragData: Partial<AntragType>): Promise<AntragType | null>;
  update(id: string, updates: Partial<AntragType>): Promise<AntragType | null>;
}

export const Antrag: AntragEntity = {
  /**
   * List all anträge for current user
   * NOTE: Uses 'applications' table in database
   */
  async list(options = {}) {
    try {
      const userId = await getCurrentUserProfileId();

      let query = supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId);

      // Filter by status
      if (options.status) {
        query = query.eq('status', options.status);
      }

      // Sorting
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('List anträge failed:', error);
      return [];
    }
  },

  /**
   * Get single antrag
   */
  async get(id) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data || null;
    } catch (error) {
      handleError(error, 'Get antrag');
    }
  },

  /**
   * Create new antrag
   */
  async create(antragData) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('applications')
        .insert({
          ...antragData,
          user_id: userId,
          type: antragData.type || 'other'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'Create antrag');
    }
  },

  /**
   * Update antrag
   */
  async update(id, updates) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'Update antrag');
    }
  }
};


// ============================================
// NOTIFICATIONS
// ============================================

interface NotificationEntity {
  list(options?: ListOptions): Promise<NotificationType[]>;
  getUnreadCount(): Promise<number>;
  markAsRead(id: string): Promise<NotificationType | null>;
  markAllAsRead(): Promise<{ success: boolean }>;
  create(notificationData: Partial<NotificationType>): Promise<NotificationType | null>;
}

export const Notification: NotificationEntity = {
  /**
   * List all notifications for current user
   */
  async list(options = {}) {
    try {
      const userId = await getCurrentUserProfileId();

      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId);

      // Filter unread
      if (options.unreadOnly) {
        query = query.eq('gelesen', false);
      }

      // Sorting
      query = query.order('created_at', { ascending: false });

      // Limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('List notifications failed:', error);
      return [];
    }
  },

  /**
   * Get unread count
   */
  async getUnreadCount() {
    try {
      const userId = await getCurrentUserProfileId();

      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('gelesen', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Get unread count failed:', error);
      return 0;
    }
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id) {
    try {
      const userId = await getCurrentUserProfileId();

      const { data, error } = await supabase
        .from('notifications')
        .update({
          gelesen: true,
          gelesen_am: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'Mark notification as read');
    }
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    try {
      const userId = await getCurrentUserProfileId();

      const { error } = await supabase
        .from('notifications')
        .update({
          gelesen: true,
          gelesen_am: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('gelesen', false);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      handleError(error, 'Mark all notifications as read');
    }
  },

  /**
   * Create notification (for system use)
   */
  async create(notificationData) {
    try {
      void notificationData;
      throw new Error('Create notification is not supported from the client');
    } catch (error) {
      handleError(error, 'Create notification');
    }
  }
};

// ============================================
// STORAGE (File Uploads)
// ============================================

interface StorageEntity {
  uploadFile(bucket: string, file: File, path?: string): Promise<UploadResult>;
  deleteFile(bucket: string, path: string): Promise<{ success: boolean }>;
  getFileUrl(bucket: string, path: string): string;
}

export const Storage: StorageEntity = {
  /**
   * Upload file to storage
   */
  async uploadFile(bucket, file, path) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Construct path: user_id/filename
      const filePath = path || `${user.id}/${file.name}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        path: data.path,
        url: publicUrl,
        key: filePath
      };
    } catch (error) {
      handleError(error, 'Upload file');
    }
  },

  /**
   * Delete file from storage
   */
  async deleteFile(bucket, path) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      handleError(error, 'Delete file');
    }
  },

  /**
   * Get file URL
   */
  getFileUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
};

// ============================================
// AUTH (Wrapper)
// ============================================

interface AuthEntity {
  getUser(): Promise<unknown>;
  signIn(email: string, password: string): Promise<unknown>;
  signUp(email: string, password: string, metadata?: Record<string, unknown>): Promise<unknown>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

export const Auth: AuthEntity = {
  /**
   * Get current user
   */
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Sign in with email/password
   */
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign up with email/password
   */
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Reset password
   */
  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
};

// ============================================
// EXPORT ALL
// ============================================

export default {
  UserProfile,
  Abrechnung,
  Foerderleistung,
  Antrag,
  Notification,
  Storage,
  Auth
};
