// Komplett lokaler Client - kein Backend nötig
// Nutzt LocalStorage für Datenpersistenz

const STORAGE_KEYS = {
  USER: 'nebenkosten_user',
  ABRECHNUNGEN: 'nebenkosten_abrechnungen',
  ANSPRUCHSPRUEFUNGEN: 'nebenkosten_anspruchspruefungen',
  FOERDERLEISTUNGEN: 'nebenkosten_foerderleistungen'
};

// Helper Funktionen
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Fehler beim Lesen:', e);
    return null;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Fehler beim Speichern:', e);
  }
};

// Initialisiere Standardbenutzer
const initUser = () => {
  let user = getFromStorage(STORAGE_KEYS.USER);
  if (!user) {
    user = {
      id: '1',
      email: 'nutzer@lokal.de',
      full_name: 'Lokaler Nutzer',
      created_at: new Date().toISOString()
    };
    saveToStorage(STORAGE_KEYS.USER, user);
  }
  return user;
};

// Initialisiere Beispieldaten
const initSampleData = () => {
  let abrechnungen = getFromStorage(STORAGE_KEYS.ABRECHNUNGEN);
  if (!abrechnungen || abrechnungen.length === 0) {
    abrechnungen = [
      {
        id: '1',
        titel: 'Nebenkostenabrechnung 2023',
        abrechnungszeitraum: '01.01.2023 - 31.12.2023',
        analyse_status: 'abgeschlossen',
        rueckforderung_potential: 450.75,
        created_date: new Date('2024-01-15').toISOString(),
        adresse: 'Musterstraße 123, 12345 Berlin',
        gesamtkosten: 2450.00,
        fehler_gefunden: 3
      },
      {
        id: '2',
        titel: 'Nebenkostenabrechnung 2022',
        abrechnungszeitraum: '01.01.2022 - 31.12.2022',
        analyse_status: 'abgeschlossen',
        rueckforderung_potential: 215.50,
        created_date: new Date('2023-02-10').toISOString(),
        adresse: 'Musterstraße 123, 12345 Berlin',
        gesamtkosten: 2280.00,
        fehler_gefunden: 2
      }
    ];
    saveToStorage(STORAGE_KEYS.ABRECHNUNGEN, abrechnungen);
  }
};

// Lokaler Client
export const localClient = {
  auth: {
    me: async () => {
      return initUser();
    },
    
    logout: async (redirectUrl) => {
      // Optional: Daten löschen beim Logout
      // localStorage.clear();
      window.location.href = redirectUrl || '/';
    },
    
    updateProfile: async (data) => {
      const user = initUser();
      const updatedUser = { ...user, ...data };
      saveToStorage(STORAGE_KEYS.USER, updatedUser);
      return updatedUser;
    }
  },
  
  entities: {
    Abrechnung: {
      list: async (order = '-created_date', limit = 100) => {
        initSampleData();
        let abrechnungen = getFromStorage(STORAGE_KEYS.ABRECHNUNGEN) || [];
        
        // Sortierung
        if (order === '-created_date') {
          abrechnungen.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        } else if (order === 'created_date') {
          abrechnungen.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        }
        
        return abrechnungen.slice(0, limit);
      },
      
      get: async (id) => {
        const abrechnungen = getFromStorage(STORAGE_KEYS.ABRECHNUNGEN) || [];
        return abrechnungen.find(a => a.id === id) || null;
      },
      
      create: async (data) => {
        const abrechnungen = getFromStorage(STORAGE_KEYS.ABRECHNUNGEN) || [];
        const newAbrechnung = {
          id: Date.now().toString(),
          ...data,
          created_date: new Date().toISOString(),
          analyse_status: data.analyse_status || 'wartend',
          rueckforderung_potential: data.rueckforderung_potential || 0
        };
        abrechnungen.push(newAbrechnung);
        saveToStorage(STORAGE_KEYS.ABRECHNUNGEN, abrechnungen);
        return newAbrechnung;
      },
      
      update: async (id, data) => {
        const abrechnungen = getFromStorage(STORAGE_KEYS.ABRECHNUNGEN) || [];
        const index = abrechnungen.findIndex(a => a.id === id);
        if (index !== -1) {
          abrechnungen[index] = { ...abrechnungen[index], ...data };
          saveToStorage(STORAGE_KEYS.ABRECHNUNGEN, abrechnungen);
          return abrechnungen[index];
        }
        return null;
      },
      
      delete: async (id) => {
        const abrechnungen = getFromStorage(STORAGE_KEYS.ABRECHNUNGEN) || [];
        const filtered = abrechnungen.filter(a => a.id !== id);
        saveToStorage(STORAGE_KEYS.ABRECHNUNGEN, filtered);
        return { success: true };
      }
    },
    
    Anspruchspruefung: {
      list: async (order, limit = 100) => {
        const pruefungen = getFromStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN) || [];
        return pruefungen.slice(0, limit);
      },
      
      get: async (id) => {
        const pruefungen = getFromStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN) || [];
        return pruefungen.find(p => p.id === id) || null;
      },
      
      create: async (data) => {
        const pruefungen = getFromStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN) || [];
        const newPruefung = {
          id: Date.now().toString(),
          ...data,
          created_date: new Date().toISOString()
        };
        pruefungen.push(newPruefung);
        saveToStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN, pruefungen);
        return newPruefung;
      },
      
      update: async (id, data) => {
        const pruefungen = getFromStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN) || [];
        const index = pruefungen.findIndex(p => p.id === id);
        if (index !== -1) {
          pruefungen[index] = { ...pruefungen[index], ...data };
          saveToStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN, pruefungen);
          return pruefungen[index];
        }
        return null;
      },
      
      delete: async (id) => {
        const pruefungen = getFromStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN) || [];
        const filtered = pruefungen.filter(p => p.id !== id);
        saveToStorage(STORAGE_KEYS.ANSPRUCHSPRUEFUNGEN, filtered);
        return { success: true };
      }
    },
    
    Foerderleistung: {
      list: async (order, limit = 100) => {
        const foerderungen = getFromStorage(STORAGE_KEYS.FOERDERLEISTUNGEN) || [];
        return foerderungen.slice(0, limit);
      },
      
      get: async (id) => {
        const foerderungen = getFromStorage(STORAGE_KEYS.FOERDERLEISTUNGEN) || [];
        return foerderungen.find(f => f.id === id) || null;
      },
      
      create: async (data) => {
        const foerderungen = getFromStorage(STORAGE_KEYS.FOERDERLEISTUNGEN) || [];
        const newFoerderung = {
          id: Date.now().toString(),
          ...data,
          created_date: new Date().toISOString()
        };
        foerderungen.push(newFoerderung);
        saveToStorage(STORAGE_KEYS.FOERDERLEISTUNGEN, foerderungen);
        return newFoerderung;
      },
      
      update: async (id, data) => {
        const foerderungen = getFromStorage(STORAGE_KEYS.FOERDERLEISTUNGEN) || [];
        const index = foerderungen.findIndex(f => f.id === id);
        if (index !== -1) {
          foerderungen[index] = { ...foerderungen[index], ...data };
          saveToStorage(STORAGE_KEYS.FOERDERLEISTUNGEN, foerderungen);
          return foerderungen[index];
        }
        return null;
      },
      
      delete: async (id) => {
        const foerderungen = getFromStorage(STORAGE_KEYS.FOERDERLEISTUNGEN) || [];
        const filtered = foerderungen.filter(f => f.id !== id);
        saveToStorage(STORAGE_KEYS.FOERDERLEISTUNGEN, filtered);
        return { success: true };
      }
    }
  }
};

// Integrations - DEPRECATED: Nutze stattdessen src/api/integrations.js
// Diese Mock-Implementierungen werden nicht mehr verwendet
localClient.integrations = {
  Core: {
    InvokeLLM: async (params) => {
      console.warn('⚠️ DEPRECATED: Use integrations.js InvokeLLM instead');
      return { result: 'DEPRECATED', content: 'Nutze integrations.js' };
    },
    
    SendEmail: async (params) => {
      console.log('SendEmail Mock:', params);
      return { success: true, message: 'E-Mail wurde simuliert (nicht wirklich versendet)' };
    },
    
    UploadFile: async ({ file }) => {
      console.log('UploadFile Mock:', file?.name);
      if (!file) {
        throw new Error('No file provided to UploadFile');
      }
      return { 
        file_url: URL.createObjectURL(file),
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size
      };
    },
    
    GenerateImage: async (params) => {
      console.log('GenerateImage Mock:', params);
      return { 
        url: 'https://via.placeholder.com/400x300.png?text=Mock+Image',
        id: Date.now().toString() 
      };
    },
    
    ExtractDataFromUploadedFile: async (fileId) => {
      console.log('ExtractDataFromUploadedFile Mock:', fileId);
      return {
        success: true,
        data: {
          text: 'Beispieltext aus simuliertem Dokument',
          abrechnungszeitraum: '2023',
          gesamtkosten: 2500.00
        }
      };
    },
    
    CreateFileSignedUrl: async (fileId) => {
      console.log('CreateFileSignedUrl Mock:', fileId);
      return { url: 'https://via.placeholder.com/400x300.png?text=Mock+File', expiresAt: Date.now() + 3600000 };
    },
    
    UploadPrivateFile: async (file) => {
      console.log('UploadPrivateFile Mock:', file?.name);
      return { 
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size,
        private: true
      };
    }
  }
};

// Beim Import initialisieren
initUser();
initSampleData();
