
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Check, User as UserIcon, Home, Euro, Shield, ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ConsentDialog from "@/components/ui/ConsentDialog";
import { useUserProfile } from "@/components/UserProfileContext";
import ProfileProgress from "@/components/profile/ProfileProgress";
import { track, AREA } from "@/components/core/telemetry";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DsgvoActions from "@/components/profile/DsgvoActions";

// Manuelle Validierungsfunktionen (statt zod)
const validateRequired = (value, fieldName) => {
    if (!value || value === '') {
        return `${fieldName} ist erforderlich`;
    }
    return null;
};

const validatePLZ = (value) => {
    if (!value) return null;
    if (!/^\d{5}$/.test(value)) {
        return 'PLZ muss 5 Ziffern enthalten';
    }
    return null;
};

const validateMinLength = (value, min, fieldName) => {
    if (!value) return null;
    if (value.length < min) {
        return `${fieldName} muss mindestens ${min} Zeichen haben`;
    }
    return null;
};

const validateNumber = (value, min, max, fieldName) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (isNaN(num)) {
        return `${fieldName} muss eine Zahl sein`;
    }
    if (min !== undefined && num < min) {
        return `${fieldName} muss mindestens ${min} sein`;
    }
    if (max !== undefined && num > max) {
        return `${fieldName} darf maximal ${max} sein`;
    }
    return null;
};

// Vollständigkeits-Berechnung
const computeProfileCompletion = (userData) => {
    const fields = [
        'vorname',
        'nachname',
        'geburtsdatum',
        'lebenssituation.wohnadresse.plz',
        'lebenssituation.wohnadresse.ort',
        'lebenssituation.familienstand',
        'lebenssituation.beschaeftigungsstatus',
        'lebenssituation.monatliches_nettoeinkommen',
        'lebenssituation.wohnart',
    ];

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    };

    let filledCount = 0;
    const missingFields = [];

    fields.forEach(field => {
        const value = getNestedValue(userData, field);
        if (value !== null && value !== undefined && value !== '') {
            filledCount++;
        } else {
            missingFields.push(field.split('.').pop());
        }
    });

    const score = Math.round((filledCount / fields.length) * 100);

    return {
        score,
        filledFields: filledCount,
        totalFields: fields.length,
        missingFields
    };
};

const FormSection = ({ title, icon: Icon, children }) => (
    <Card className="shadow-xl border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/20 border-b border-slate-200/60 dark:border-slate-700/60">
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">{children}</CardContent>
    </Card>
);

export default function Lebenslagen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState("persoenlich");
    const [showConsent, setShowConsent] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [completionData, setCompletionData] = useState(null);
    
    const { control, handleSubmit, reset, watch, formState: { errors }, setValue } = useForm({
        mode: 'onBlur'
    });
    
    const navigate = useNavigate();
    const { user: contextUser, updateUserProfile, profileVersion } = useUserProfile();

    const watchSchwerbehinderung = watch("lebenssituation.besondere_umstaende.schwerbehinderung");
    const watchPflegebeduerftig = watch("lebenssituation.besondere_umstaende.pflegebeduerftig");
    const watchWohnart = watch("lebenssituation.wohnart");

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const currentUser = contextUser || await User.me();
                const formData = {
                    vorname: currentUser.vorname || '',
                    nachname: currentUser.nachname || '',
                    geburtsdatum: currentUser.geburtsdatum || '',
                    ki_automation_level: currentUser.ki_automation_level || 'assistiert',
                    lebenssituation: currentUser.lebenssituation || {}
                };
                
                // Delay reset to avoid React rendering crash
                setTimeout(() => {
                    reset(formData);
                }, 0);

                const completion = computeProfileCompletion(currentUser);
                setCompletionData(completion);

                if (!currentUser.lebenssituation?.vollmachten_einverstaendnis?.datenschutz_zustimmung) {
                    setShowConsent(true);
                }
                
                track('profile.loaded', AREA.PROFILE, {
                    completionScore: completion.score
                });
            } catch (e) {
                console.error("Fehler beim Laden:", e);
                navigate(createPageUrl('Dashboard'));
            }
            setIsLoading(false);
        };
        
        loadUserData();
    }, [reset, navigate, contextUser, profileVersion]);
    
    const handleConsent = async () => {
        try {
            await updateUserProfile({
                lebenssituation: {
                    vollmachten_einverstaendnis: {
                        datenschutz_zustimmung: true
                    }
                }
            });
            setShowConsent(false);
            track('profile.consent.accepted', AREA.PROFILE);
        } catch (error) {
            console.error("Fehler beim Speichern der Zustimmung:", error);
        }
    };
    
    const validateFormData = (data) => {
        const errors = {};

        // Basis-Validierung
        const vornameError = validateRequired(data.vorname, 'Vorname') || validateMinLength(data.vorname, 2, 'Vorname');
        if (vornameError) errors.vorname = vornameError;

        const nachnameError = validateRequired(data.nachname, 'Nachname') || validateMinLength(data.nachname, 2, 'Nachname');
        if (nachnameError) errors.nachname = nachnameError;

        // PLZ Validierung
        if (data.lebenssituation?.wohnadresse?.plz) {
            const plzError = validatePLZ(data.lebenssituation.wohnadresse.plz);
            if (plzError) errors['lebenssituation.wohnadresse.plz'] = plzError;
        }

        // Abhängige Validierungen
        if (data.lebenssituation?.besondere_umstaende?.grad_der_behinderung && !data.lebenssituation?.besondere_umstaende?.schwerbehinderung) {
            errors['lebenssituation.besondere_umstaende.grad_der_behinderung'] = 'Nur bei Schwerbehinderung';
        }

        if (data.lebenssituation?.besondere_umstaende?.pflegegrad && !data.lebenssituation?.besondere_umstaende?.pflegebeduerftig) {
            errors['lebenssituation.besondere_umstaende.pflegegrad'] = 'Nur bei Pflegebedürftigkeit';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };
    
    const onSubmit = async (data) => {
        const validation = validateFormData(data);
        
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            track('profile.validation.failed', AREA.PROFILE, {
                errors: Object.keys(validation.errors)
            });
            return;
        }
        
        setValidationErrors({});
        setIsSaving(true);
        setSaveSuccess(false);
        
        try {
            const completion = computeProfileCompletion({ ...contextUser, ...data });
            
            await updateUserProfile({
                ...data,
                profile_completeness: completion.score
            });
            
            // Delay state updates to avoid React crash
            setTimeout(() => {
                setCompletionData(completion);
                setSaveSuccess(true);
                
                track('profile.saved', AREA.PROFILE, {
                    completionScore: completion.score
                });
                
                setTimeout(() => setSaveSuccess(false), 3000);
            }, 0);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
            track('profile.save.failed', AREA.PROFILE, {
                error: e.message
            });
        } finally {
            setTimeout(() => setIsSaving(false), 100);
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-slate-700 dark:text-slate-300">Lade Formulardaten...</p>
            </div>
        </div>
    );

    return (
        <>
            <ConsentDialog 
                isOpen={showConsent}
                onConfirm={handleConsent}
                onCancel={() => navigate(createPageUrl('Dashboard'))}
            />
            <div className={`${showConsent ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(createPageUrl("Dashboard"))}
                        className="shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white">Vollständiges Profil</h1>
                        <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 mt-2">
                            Für vollautomatisierte KI-Prozesse und Antragsstellung
                        </p>
                    </div>
                </div>

                {completionData && (
                    <div className="mb-8">
                        <ProfileProgress completionData={completionData} />
                    </div>
                )}

                {Object.keys(validationErrors).length > 0 && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Validierungsfehler:</strong>
                            <ul className="mt-2 space-y-1">
                                {Object.values(validationErrors).map((error, idx) => (
                                    <li key={idx}>• {error}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Profil wird automatisch gespeichert
                            </span>
                        </div>
                        <Button type="submit" disabled={isSaving || saveSuccess} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {saveSuccess && <Check className="mr-2 h-4 w-4" />}
                            {isSaving ? "Speichern..." : saveSuccess ? "Gespeichert!" : "Speichern"}
                        </Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                            <TabsTrigger value="persoenlich">Persönlich</TabsTrigger>
                            <TabsTrigger value="wohnen">Wohnen</TabsTrigger>
                            <TabsTrigger value="finanzen">Finanzen</TabsTrigger>
                            <TabsTrigger value="behoerden">Behörden</TabsTrigger>
                            <TabsTrigger value="dsgvo">Datenschutz</TabsTrigger>
                        </TabsList>

                        <TabsContent value="persoenlich" className="space-y-6 mt-8">
                            <FormSection title="Persönliche Grunddaten" icon={UserIcon}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Controller
                                        name="vorname"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Vorname *</Label>
                                                <Input {...field} placeholder="Max" />
                                                {validationErrors.vorname && <p className="text-red-500 text-sm mt-1">{validationErrors.vorname}</p>}
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="nachname"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Nachname *</Label>
                                                <Input {...field} placeholder="Mustermann" />
                                                {validationErrors.nachname && <p className="text-red-500 text-sm mt-1">{validationErrors.nachname}</p>}
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="geburtsdatum"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Geburtsdatum</Label>
                                                <Input type="date" {...field} />
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="lebenssituation.familienstand"
                                        control={control}
                                        defaultValue=""
                                        render={({ field: { onChange, value } }) => (
                                            <div>
                                                <Label>Familienstand</Label>
                                                <NativeSelect
                                                    value={value || ''}
                                                    onChange={(e) => onChange(e.target.value)}
                                                    placeholder="Bitte auswählen"
                                                    options={[
                                                        { value: "ledig", label: "Ledig" },
                                                        { value: "verheiratet", label: "Verheiratet" },
                                                        { value: "in_partnerschaft", label: "In Lebenspartnerschaft" },
                                                        { value: "verwitwet", label: "Verwitwet" },
                                                        { value: "geschieden", label: "Geschieden" }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.beschaeftigungsstatus"
                                        control={control}
                                        defaultValue=""
                                        render={({ field: { onChange, value } }) => (
                                            <div>
                                                <Label>Beschäftigungsstatus</Label>
                                                <NativeSelect
                                                    value={value || ''}
                                                    onChange={(e) => onChange(e.target.value)}
                                                    placeholder="Bitte auswählen"
                                                    options={[
                                                        { value: "angestellt", label: "Angestellt" },
                                                        { value: "arbeitslos", label: "Arbeitslos" },
                                                        { value: "selbststaendig", label: "Selbstständig" },
                                                        { value: "student", label: "Student" },
                                                        { value: "rentner", label: "Rentner" },
                                                        { value: "elternzeit", label: "Elternzeit" },
                                                        { value: "arbeitsunfaehig", label: "Arbeitsunfähig" }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="lebenssituation.haushaltsmitglieder_anzahl"
                                        control={control}
                                        defaultValue={0}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Anzahl Personen im Haushalt</Label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        const n = v === '' ? null : Math.max(0, parseInt(v, 10) || 0);
                                                        field.onChange(n);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.kinder_anzahl"
                                        control={control}
                                        defaultValue={0}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Anzahl Kinder</Label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        const n = v === '' ? null : Math.max(0, parseInt(v, 10) || 0);
                                                        field.onChange(n);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Besondere Umstände</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Controller
                                            name="lebenssituation.besondere_umstaende.alleinerziehend"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <Label>Alleinerziehend</Label>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.besondere_umstaende.schwerbehinderung"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <Label>Schwerbehinderung</Label>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.besondere_umstaende.pflegebeduerftig"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <Label>Pflegebedürftig</Label>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.besondere_umstaende.student"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <Label>Student</Label>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.besondere_umstaende.chronische_krankheit"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <Label>Chronische Krankheit</Label>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                {watchSchwerbehinderung && (
                                    <Controller
                                        name="lebenssituation.besondere_umstaende.grad_der_behinderung"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Grad der Behinderung (%)</Label>
                                                <Input 
                                                    type="number" 
                                                    min="20" 
                                                    max="100" 
                                                    {...field} 
                                                    onChange={e => field.onChange(parseInt(e.target.value) || null)}
                                                />
                                                {validationErrors['lebenssituation.besondere_umstaende.grad_der_behinderung'] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {validationErrors['lebenssituation.besondere_umstaende.grad_der_behinderung']}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                )}

                                {watchPflegebeduerftig && (
                                    <Controller
                                        name="lebenssituation.besondere_umstaende.pflegegrad"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Pflegegrad (1-5)</Label>
                                                <Input 
                                                    type="number" 
                                                    min="1" 
                                                    max="5" 
                                                    {...field} 
                                                    onChange={e => field.onChange(parseInt(e.target.value) || null)}
                                                />
                                                {validationErrors['lebenssituation.besondere_umstaende.pflegegrad'] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {validationErrors['lebenssituation.besondere_umstaende.pflegegrad']}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                )}
                            </FormSection>
                        </TabsContent>

                        <TabsContent value="wohnen" className="space-y-6 mt-8">
                            <FormSection title="Wohnsituation" icon={Home}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Controller
                                        name="lebenssituation.wohnadresse.strasse"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Straße</Label>
                                                <Input {...field} placeholder="Musterstraße" />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.wohnadresse.hausnummer"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Hausnummer</Label>
                                                <Input {...field} placeholder="12A" />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.wohnadresse.plz"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>PLZ *</Label>
                                                <Input {...field} placeholder="10115" maxLength={5} />
                                                {validationErrors['lebenssituation.wohnadresse.plz'] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {validationErrors['lebenssituation.wohnadresse.plz']}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="lebenssituation.wohnadresse.ort"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Ort *</Label>
                                                <Input {...field} placeholder="Berlin" />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.wohnadresse.bundesland"
                                        control={control}
                                        defaultValue=""
                                        render={({ field: { onChange, value } }) => (
                                            <div>
                                                <Label>Bundesland</Label>
                                                <NativeSelect
                                                    value={value || ''}
                                                    onChange={(e) => onChange(e.target.value)}
                                                    placeholder="Bitte auswählen"
                                                    options={[
                                                        { value: "BW", label: "Baden-Württemberg" },
                                                        { value: "BY", label: "Bayern" },
                                                        { value: "BE", label: "Berlin" },
                                                        { value: "BB", label: "Brandenburg" },
                                                        { value: "HB", label: "Bremen" },
                                                        { value: "HH", label: "Hamburg" },
                                                        { value: "HE", label: "Hessen" },
                                                        { value: "MV", label: "Mecklenburg-Vorpommern" },
                                                        { value: "NI", label: "Niedersachsen" },
                                                        { value: "NW", label: "Nordrhein-Westfalen" },
                                                        { value: "RP", label: "Rheinland-Pfalz" },
                                                        { value: "SL", label: "Saarland" },
                                                        { value: "SN", label: "Sachsen" },
                                                        { value: "ST", label: "Sachsen-Anhalt" },
                                                        { value: "SH", label: "Schleswig-Holstein" },
                                                        { value: "TH", label: "Thüringen" }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="lebenssituation.wohnart"
                                        control={control}
                                        defaultValue=""
                                        render={({ field: { onChange, value } }) => (
                                            <div>
                                                <Label>Wohnart *</Label>
                                                <NativeSelect
                                                    value={value || ''}
                                                    onChange={(e) => onChange(e.target.value)}
                                                    placeholder="Bitte auswählen"
                                                    options={[
                                                        { value: "miete", label: "Miete" },
                                                        { value: "eigentum", label: "Eigentum (abbezahlt)" },
                                                        { value: "wohneigentum_mit_kredit", label: "Eigentum mit Kredit" },
                                                        { value: "sozialwohnung", label: "Sozialwohnung" }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.wohnflaeche_qm"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Wohnfläche (m²)</Label>
                                                <Input 
                                                    type="number" 
                                                    {...field} 
                                                    onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    placeholder="75"
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                {(watchWohnart === 'miete' || watchWohnart === 'sozialwohnung') && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Controller
                                            name="lebenssituation.monatliche_miete_kalt"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Kaltmiete (€/Monat)</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                        placeholder="800.00"
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.monatliche_nebenkosten"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Nebenkosten (€/Monat)</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                        placeholder="150.00"
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.monatliche_heizkosten"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Heizkosten (€/Monat)</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                        placeholder="100.00"
                                                    />
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                            </FormSection>
                        </TabsContent>

                        <TabsContent value="finanzen" className="space-y-6 mt-8">
                            <FormSection title="Einkommen & Finanzen" icon={Euro}>
                                <Controller
                                    name="lebenssituation.monatliches_nettoeinkommen"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <Label>Gesamtes monatl. Nettoeinkommen (€) *</Label>
                                            <Input 
                                                type="number" 
                                                step="0.01" 
                                                {...field} 
                                                onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                placeholder="2500.00"
                                            />
                                        </div>
                                    )}
                                />

                                <div>
                                    <Label className="text-base font-semibold mb-3 block">Einkommensdetails (optional)</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Controller
                                            name="lebenssituation.einkommen_details.gehalt_angestellt"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Gehalt (angestellt)</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.einkommen_selbststaendig"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Einkommen (selbstständig)</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.rente"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Rente</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.arbeitslosengeld"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Arbeitslosengeld</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.kindergeld"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Kindergeld</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.elterngeld"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Elterngeld</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.unterhalt"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Unterhalt</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.einkommen_details.sonstige"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Sonstige Einkommen</Label>
                                                    <Input 
                                                        type="number" 
                                                        step="0.01"
                                                        {...field} 
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                <Controller
                                    name="lebenssituation.vermoegen"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <Label>Gesamtvermögen (€)</Label>
                                            <Input 
                                                type="number" 
                                                step="0.01"
                                                {...field} 
                                                onChange={e => field.onChange(parseFloat(e.target.value) || null)}
                                                placeholder="10000.00"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                Sparguthaben, Aktien, Immobilienwerte etc.
                                            </p>
                                        </div>
                                    )}
                                />

                                <div>
                                    <Label className="text-base font-semibold mb-3 block">Krankenversicherung</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Controller
                                            name="lebenssituation.krankenversicherung.art"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value } }) => (
                                                <div>
                                                    <Label>Art der Krankenversicherung</Label>
                                                    <NativeSelect
                                                        value={value || ''}
                                                        onChange={(e) => onChange(e.target.value)}
                                                        placeholder="Bitte auswählen"
                                                        options={[
                                                            { value: "gesetzlich", label: "Gesetzlich" },
                                                            { value: "privat", label: "Privat" },
                                                            { value: "keine", label: "Keine" }
                                                        ]}
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.krankenversicherung.kasse_name"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Label>Name der Krankenkasse</Label>
                                                    <Input {...field} placeholder="z.B. AOK, TK, Barmer" />
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </FormSection>
                        </TabsContent>

                        <TabsContent value="behoerden" className="space-y-6 mt-8">
                            <FormSection title="Behördendaten (für Auto-Anträge)" icon={Shield}>
                                <Alert>
                                    <Shield className="h-4 w-4" />
                                    <AlertDescription>
                                        Diese Daten sind optional und werden nur für automatische Antragsstellung benötigt. 
                                        Alle Daten werden verschlüsselt gespeichert.
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="lebenssituation.steuer_id"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Steuer-Identifikationsnummer</Label>
                                                <Input 
                                                    {...field} 
                                                    placeholder="12345678901"
                                                    maxLength={11}
                                                />
                                                <p className="text-xs text-slate-500 mt-1">11-stellig</p>
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="lebenssituation.sozialversicherungsnummer"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <Label>Sozialversicherungsnummer</Label>
                                                <Input 
                                                    {...field} 
                                                    placeholder="12345678A123"
                                                    maxLength={12}
                                                />
                                                <p className="text-xs text-slate-500 mt-1">12 Zeichen</p>
                                            </div>
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="lebenssituation.iban"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <Label>IBAN (für Auszahlungen)</Label>
                                            <Input 
                                                {...field} 
                                                placeholder="DE89370400440532013000"
                                                maxLength={34}
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                Erforderlich für direkte Auszahlungen von Fördergeldern
                                            </p>
                                        </div>
                                    )}
                                />

                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Vollmachten & Einverständnis</Label>
                                    <div className="space-y-3">
                                        <Controller
                                            name="lebenssituation.vollmachten_einverstaendnis.automatische_antragsstellung"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-start space-x-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                        className="mt-1"
                                                    />
                                                    <div>
                                                        <Label className="font-semibold">
                                                            Automatische Antragsstellung erlauben
                                                        </Label>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                                            Die KI darf in meinem Namen Anträge bei Behörden stellen
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="lebenssituation.vollmachten_einverstaendnis.behoerden_vollmacht"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-start space-x-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                                    <Checkbox
                                                        checked={field.value || false}
                                                        onCheckedChange={field.onChange}
                                                        className="mt-1"
                                                    />
                                                    <div>
                                                        <Label className="font-semibold">
                                                            Behörden-Vollmacht erteilen
                                                        </Label>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                                            Die Plattform darf Auskünfte bei Behörden einholen
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </FormSection>
                        </TabsContent>

                        <TabsContent value="dsgvo" className="space-y-6 mt-8">
                            <DsgvoActions />
                        </TabsContent>
                    </Tabs>
                </form>
            </div>
        </>
    );
}
