import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useUserProfile } from '@/components/UserProfileContext.jsx';
import { generateAIProfileContext } from '@/utils/aiProfileHelper';
import { User, Abrechnung } from '@/api/entities';
import { InvokeLLM, InvokeLLMStream } from '@/api/integrations';
import { createPageUrl } from '@/utils';
import { 
    Bot, 
    Send, 
    User as UserIcon,
    Zap,
    FileText,
    X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message, isBot, isStreaming }) => {
    // Sicherheits-Check: Stelle sicher dass message ein String ist
    const messageText = typeof message === 'string' ? message : 
                       typeof message === 'object' ? (message?.content || message?.text || JSON.stringify(message)) :
                       String(message || '');
    
    return (
        <div className={`flex gap-3 sm:gap-4 ${isBot ? '' : 'flex-row-reverse'} mb-5 sm:mb-6`}>
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg shrink-0 ${
                isBot 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600' 
                    : 'bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-400 dark:to-slate-500'
            }`}>
                {isBot ? (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                    <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-slate-800" />
                )}
            </div>
            
            <div className={`max-w-[85%] sm:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-md ${
                isBot 
                    ? 'bg-white/95 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-600/70 rounded-bl-md' 
                    : 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-md'
            }`}>
                {isBot ? (
                    !messageText.trim() && isStreaming ? (
                        <div className="text-slate-600 dark:text-slate-300">
                            <TypingDots />
                        </div>
                    ) : (
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                            <ReactMarkdown 
                                components={{
                                    p: ({children}) => <p className="mb-3 last:mb-0 leading-relaxed text-slate-800 dark:text-slate-200">{children}</p>,
                                    ul: ({children}) => <ul className="mb-3 ml-4 space-y-1 text-slate-800 dark:text-slate-200">{children}</ul>,
                                    li: ({children}) => <li className="text-slate-700 dark:text-slate-300">{children}</li>,
                                    strong: ({children}) => <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>,
                                    h3: ({children}) => <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 mt-4">{children}</h3>
                                }}
                            >
                                {messageText}
                            </ReactMarkdown>
                        </div>
                    )
                ) : (
                    <p className="text-white leading-relaxed whitespace-pre-wrap">{messageText}</p>
                )}
            </div>
        </div>
    );
};

const TypingDots = () => (
    <div className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-slate-400/80 animate-bounce [animation-delay:-0.2s]" />
        <span className="w-2 h-2 rounded-full bg-slate-400/80 animate-bounce [animation-delay:-0.1s]" />
        <span className="w-2 h-2 rounded-full bg-slate-400/80 animate-bounce" />
    </div>
);

export default function Assistent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const documentId = searchParams.get('documentId');

    const { user: profileUser } = useUserProfile();
    
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [dailyQuestions, setDailyQuestions] = useState(0);
    const [currentDocument, setCurrentDocument] = useState(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const stickToBottomRef = useRef(true);
    const activeAbortRef = useRef(null);
    const streamingControlRef = useRef({
        mode: null,
        firstChunk: '',
        firstChunkTimer: null,
        typewriterTimer: null,
        typewriterQueue: '',
        typewriterResolve: null
    });

    useEffect(() => {
        User.me().then(user => {
            setUser(user);
            setDailyQuestions(user.subscription_tier === 'free' ? 3 : 0);
        }).catch(console.error);

        // Lade Dokument wenn documentId vorhanden
        if (documentId) {
            Abrechnung.get(documentId).then(doc => {
                setCurrentDocument(doc);
                
                // Begrüßungsnachricht mit Dokument-Kontext
                const extractedData = doc?.extracted_data || {};
                const dokumenttyp = extractedData.dokumenttyp || 'Dokument';
                
                setMessages([{
                    text: `👋 Hallo! Ich habe Ihr **${dokumenttyp}** geladen und kann Ihnen jetzt spezifisch dazu helfen.

**Über dieses Dokument:**
${extractedData.zusammenfassung || 'Ich habe die Daten aus Ihrem Dokument analysiert.'}

**Ich kann Ihnen helfen bei:**
• Erklärung der einzelnen Posten
• Prüfung auf Fehler oder Ungereimtheiten
• Erstellung eines Widerspruchs
• Rechtliche Einschätzung

**Stellen Sie mir einfach eine Frage zu diesem Dokument!** 🚀`,
                    isBot: true
                }]);
            }).catch(err => {
                console.error('Fehler beim Laden des Dokuments:', err);
                setCurrentDocument(null);
                // Fallback Begrüßung
                setMessages([{
                    text: `👋 Hallo! Ich bin Ihr persönlicher Mietrechts-Assistent. 

Ich helfe Ihnen bei:
• **Nebenkostenabrechnung prüfen** - Finden Sie Fehler und Einsparpotentiale
• **Mietrecht verstehen** - Ihre Rechte und Pflichten als Mieter
• **Widersprüche formulieren** - Professionelle Musterbriefe
• **Staatliche Hilfen** - Welche Zuschüsse stehen Ihnen zu?

**Stellen Sie mir einfach eine Frage!** 🚀`,
                    isBot: true
                }]);
            });
        } else {
            // Normale Begrüßungsnachricht ohne Dokument
            setMessages([{
                text: `👋 Hallo! Ich bin Ihr persönlicher Mietrechts-Assistent. 

Ich helfe Ihnen bei:
• **Nebenkostenabrechnung prüfen** - Finden Sie Fehler und Einsparpotentiale
• **Mietrecht verstehen** - Ihre Rechte und Pflichten als Mieter
• **Widersprüche formulieren** - Professionelle Musterbriefe
• **Staatliche Hilfen** - Welche Zuschüsse stehen Ihnen zu?

**Stellen Sie mir einfach eine Frage!** 🚀`,
                isBot: true
            }]);
        }
    }, [documentId]);

    useEffect(() => {
        if (messages.length > 1) {
            // Defer scroll to after React has committed DOM changes
            setTimeout(() => {
                if (stickToBottomRef.current) {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            try {
                activeAbortRef.current?.abort?.();
            } catch {
                // ignore
            }
        };
    }, []);

    const updateStickToBottom = () => {
        const el = messagesContainerRef.current;
        if (!el) return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        stickToBottomRef.current = distanceFromBottom < 120;
    };

    const appendToMessage = (messageId, chunk) => {
        if (!chunk) return;
        setMessages(prev => prev.map(m => m.id === messageId ? { ...m, text: `${m.text || ''}${chunk}` } : m));
        if (stickToBottomRef.current) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            }, 0);
        }
    };

    const startTypewriter = (messageId, text) => {
        const control = streamingControlRef.current;
        control.typewriterQueue = text || '';
        if (control.typewriterTimer) clearInterval(control.typewriterTimer);

        let resolveDone;
        const donePromise = new Promise((resolve) => {
            resolveDone = resolve;
        });
        control.typewriterResolve = resolveDone;

        const stepBase = Math.max(2, Math.min(8, Math.floor((control.typewriterQueue.length || 40) / 120)));
        control.typewriterTimer = setInterval(() => {
            const q = streamingControlRef.current.typewriterQueue;
            if (!q) {
                clearInterval(streamingControlRef.current.typewriterTimer);
                streamingControlRef.current.typewriterTimer = null;
                const finish = streamingControlRef.current.typewriterResolve;
                streamingControlRef.current.typewriterResolve = null;
                finish?.();
                return;
            }
            const step = Math.max(2, stepBase);
            const next = q.slice(0, step);
            streamingControlRef.current.typewriterQueue = q.slice(step);
            appendToMessage(messageId, next);
        }, 16);

        return donePromise;
    };

    const stopGeneration = () => {
        try {
            activeAbortRef.current?.abort?.();
        } catch {
            // ignore
        }

        const c = streamingControlRef.current;
        if (c.firstChunkTimer) clearTimeout(c.firstChunkTimer);
        if (c.typewriterTimer) clearInterval(c.typewriterTimer);
        c.firstChunkTimer = null;
        c.typewriterTimer = null;
        c.typewriterQueue = '';
        const finish = c.typewriterResolve;
        c.typewriterResolve = null;
        finish?.();
    };

    const handleSubmit = async (question = inputText) => {
        if ((!question.trim() && !inputText.trim()) || isLoading) return;
        
        const userQuestion = question || inputText;
        const isFreeUser = user?.subscription_tier === 'free';
        
        if (isFreeUser && dailyQuestions >= 5) {
            alert('Sie haben das Tageslimit von 5 Fragen erreicht. Upgraden Sie auf Premium für unbegrenzte Fragen!');
            return;
        }

        activeAbortRef.current?.abort?.();
        const abortController = new AbortController();
        activeAbortRef.current = abortController;

        const userMsgId = `${Date.now()}-u-${Math.random().toString(16).slice(2)}`;
        const botMsgId = `${Date.now()}-a-${Math.random().toString(16).slice(2)}`;

        setMessages(prev => [...prev, { id: userMsgId, text: userQuestion, isBot: false }]);
        setInputText('');
        setIsLoading(true);

        setMessages(prev => [...prev, { id: botMsgId, text: '', isBot: true, isStreaming: true }]);

        try {
            // Baue Dokument-Kontext auf wenn vorhanden
            let dokumentKontext = '';
            if (currentDocument) {
                const extractedData = currentDocument.extracted_data || {};
                
                dokumentKontext = `

**AKTUELLES DOKUMENT DES NUTZERS:**
- Dokumenttyp: ${extractedData.dokumenttyp || 'Unbekannt'}
- Titel: ${currentDocument.title || currentDocument.filename || 'Unbekannt'}
- Datum: ${extractedData.datum || 'Unbekannt'}
- Zeitraum: ${extractedData.abrechnungszeitraum || 'Unbekannt'}
- Absender: ${extractedData.absender || extractedData.verwalter || 'Unbekannt'}
- Gesamtbetrag: ${extractedData.gesamtbetrag || extractedData.gesamtkosten || 'Unbekannt'}
- Zusammenfassung: ${extractedData.zusammenfassung || 'Keine Zusammenfassung verfügbar'}
- Wichtige Hinweise: ${(extractedData.wichtige_hinweise || []).join(', ') || 'Keine'}
- Handlungsbedarf: ${extractedData.handlungsbedarf ? 'JA' : 'NEIN'}
- Rückforderungspotential: ${currentDocument.rueckforderung_potential || 0}€
- Gefundene Fehler: ${currentDocument.fehler_anzahl || 0}

**EXTRAHIERTE DATEN:**
${JSON.stringify(extractedData, null, 2)}

**WICHTIG:** Beziehe dich in deiner Antwort KONKRET auf die Daten aus diesem Dokument!
`;
            }

            const profileContext = generateAIProfileContext(profileUser);
            
            const response = await InvokeLLM({
                prompt: `Du bist ein Experte für deutsches Mietrecht und Nebenkostenabrechnungen. 
                
**Nutzerfrage:** "${userQuestion}"

**Kontext:** Der Nutzer hat ein ${user?.subscription_tier || 'free'} Abonnement.

**NUTZERPROFIL (aus MimiCheck):**
${profileContext}
${dokumentKontext}

**Antwort-Stil:**
- Freundlich und verständlich
- Konkrete, umsetzbare Tipps  
- Bei rechtlichen Fragen: Verweis auf Rechtsanwalt für finale Beratung
- Strukturiert mit Aufzählungen oder Schritten
- Deutsch verwenden
 - Wenn Profildaten fehlen: Frage gezielt nur nach den fehlenden Feldern
${currentDocument ? '- WICHTIG: Beziehe dich konkret auf die Daten aus dem Dokument des Nutzers!' : ''}

Antworte hilfreich und kompetent auf die Frage.`
            });

            // Extract text from response (handles both object and string)
            const responseText = typeof response === 'string' ? response : (response?.content || response?.text || String(response));
            setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: responseText, isStreaming: false } : m));
            
            if (isFreeUser) {
                setDailyQuestions(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => prev.map(m => m.id === botMsgId ? {
                ...m,
                text: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Frage. Bitte versuchen Sie es erneut.',
                isStreaming: false
            } : m));
        }
        
        setIsLoading(false);
    };

    const handleSubmitStream = async () => {
        if ((!inputText.trim()) || isLoading) return;
        const question = inputText;

        activeAbortRef.current?.abort?.();
        const abortController = new AbortController();
        activeAbortRef.current = abortController;

        const userMsgId = `${Date.now()}-u-${Math.random().toString(16).slice(2)}`;
        const botMsgId = `${Date.now()}-a-${Math.random().toString(16).slice(2)}`;

        setMessages(prev => [...prev, { id: userMsgId, text: question, isBot: false }]);
        setInputText('');
        setIsLoading(true);
        setMessages(prev => [...prev, { id: botMsgId, text: '', isBot: true, isStreaming: true }]);

        const isFreeUser = user?.subscription_tier === 'free';
        if (isFreeUser && dailyQuestions >= 5) {
            setIsLoading(false);
            setMessages(prev => prev.map(m => m.id === botMsgId ? {
                ...m,
                text: 'Sie haben das Tageslimit von 5 Fragen erreicht. Upgraden Sie auf Premium für unbegrenzte Fragen!',
                isStreaming: false
            } : m));
            return;
        }

        let dokumentKontext = '';
        if (currentDocument) {
            const extractedData = currentDocument.extracted_data || {};
            dokumentKontext = `

**AKTUELLES DOKUMENT DES NUTZERS:**
- Dokumenttyp: ${extractedData.dokumenttyp || 'Unbekannt'}
- Titel: ${currentDocument.title || currentDocument.filename || 'Unbekannt'}
- Datum: ${extractedData.datum || 'Unbekannt'}
- Zeitraum: ${extractedData.abrechnungszeitraum || 'Unbekannt'}
- Absender: ${extractedData.absender || extractedData.verwalter || 'Unbekannt'}
- Gesamtbetrag: ${extractedData.gesamtbetrag || extractedData.gesamtkosten || 'Unbekannt'}
- Zusammenfassung: ${extractedData.zusammenfassung || 'Keine Zusammenfassung verfügbar'}
- Wichtige Hinweise: ${(extractedData.wichtige_hinweise || []).join(', ') || 'Keine'}
- Handlungsbedarf: ${extractedData.handlungsbedarf ? 'JA' : 'NEIN'}
- Rückforderungspotential: ${currentDocument.rueckforderung_potential || 0}€
- Gefundene Fehler: ${currentDocument.fehler_anzahl || 0}

**EXTRAHIERTE DATEN:**
${JSON.stringify(extractedData, null, 2)}

**WICHTIG:** Beziehe dich in deiner Antwort KONKRET auf die Daten aus diesem Dokument!
`;
        }

        const profileContext = generateAIProfileContext(profileUser);

        const prompt = `Du bist ein Experte für deutsches Mietrecht und Nebenkostenabrechnungen. 
                
**Nutzerfrage:** "${question}"

**Kontext:** Der Nutzer hat ein ${user?.subscription_tier || 'free'} Abonnement.

**NUTZERPROFIL (aus MimiCheck):**
${profileContext}
${dokumentKontext}

**Antwort-Stil:**
- Freundlich und verständlich
- Konkrete, umsetzbare Tipps  
- Bei rechtlichen Fragen: Verweis auf Rechtsanwalt für finale Beratung
- Strukturiert mit Aufzählungen oder Schritten
- Deutsch verwenden
 - Wenn Profildaten fehlen: Frage gezielt nur nach den fehlenden Feldern
${currentDocument ? '- WICHTIG: Beziehe dich konkret auf die Daten aus dem Dokument des Nutzers!' : ''}

Antworte hilfreich und kompetent auf die Frage.`;

        const control = streamingControlRef.current;
        control.mode = null;
        control.firstChunk = '';
        if (control.firstChunkTimer) clearTimeout(control.firstChunkTimer);
        if (control.typewriterTimer) clearInterval(control.typewriterTimer);
        control.firstChunkTimer = null;
        control.typewriterTimer = null;
        control.typewriterQueue = '';
        const prevResolve = control.typewriterResolve;
        control.typewriterResolve = null;
        prevResolve?.();

        try {
            await InvokeLLMStream({
                prompt,
                messages: [{ role: 'user', content: prompt }],
                signal: abortController.signal,
                onToken: (chunk) => {
                    const c = streamingControlRef.current;

                    if (c.mode === 'stream') {
                        appendToMessage(botMsgId, chunk);
                        return;
                    }

                    if (c.mode === 'typewriter') {
                        c.typewriterQueue = `${c.typewriterQueue || ''}${chunk || ''}`;
                        return;
                    }

                    if (c.mode === 'pending') {
                        if (c.firstChunkTimer) clearTimeout(c.firstChunkTimer);
                        c.firstChunkTimer = null;
                        c.mode = 'stream';
                        appendToMessage(botMsgId, c.firstChunk);
                        c.firstChunk = '';
                        appendToMessage(botMsgId, chunk);
                        return;
                    }

                    c.mode = 'pending';
                    c.firstChunk = chunk;
                    c.firstChunkTimer = setTimeout(() => {
                        const cur = streamingControlRef.current;
                        if (cur.mode !== 'pending') return;
                        cur.mode = 'typewriter';
                        startTypewriter(botMsgId, cur.firstChunk);
                        cur.firstChunk = '';
                    }, 140);
                }
            });

            if (streamingControlRef.current.mode === 'pending') {
                if (streamingControlRef.current.firstChunkTimer) clearTimeout(streamingControlRef.current.firstChunkTimer);
                streamingControlRef.current.firstChunkTimer = null;
                streamingControlRef.current.mode = 'typewriter';
                const done = startTypewriter(botMsgId, streamingControlRef.current.firstChunk);
                streamingControlRef.current.firstChunk = '';
                await done;
            }

            if (streamingControlRef.current.mode === 'typewriter') {
                await new Promise((resolve) => {
                    if (!streamingControlRef.current.typewriterTimer) return resolve();
                    const existing = streamingControlRef.current.typewriterResolve;
                    if (existing) {
                        const wrapped = () => {
                            try {
                                existing();
                            } finally {
                                resolve();
                            }
                        };
                        streamingControlRef.current.typewriterResolve = wrapped;
                    } else {
                        streamingControlRef.current.typewriterResolve = resolve;
                    }
                });
            }

            if (isFreeUser) {
                setDailyQuestions(prev => prev + 1);
            }
        } catch (error) {
            if (error?.name === 'AbortError') {
                setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, isStreaming: false } : m));
                setIsLoading(false);
                return;
            }

            try {
                const fallback = await InvokeLLM({ prompt });
                const responseText = typeof fallback === 'string' ? fallback : (fallback?.content || fallback?.text || String(fallback));
                setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: responseText, isStreaming: false } : m));
                if (isFreeUser) {
                    setDailyQuestions(prev => prev + 1);
                }
            } catch (fallbackError) {
                console.error('Error:', error, fallbackError);
                setMessages(prev => prev.map(m => m.id === botMsgId ? {
                    ...m,
                    text: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Frage. Bitte versuchen Sie es erneut.',
                    isStreaming: false
                } : m));
            }
        } finally {
            setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, isStreaming: false } : m));
            setIsLoading(false);
        }
    };

    const remainingQuestions = user?.subscription_tier === 'free' ? Math.max(0, 5 - dailyQuestions) : '∞';

    return (
        <div className="min-h-full max-w-4xl mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:px-0">
            {/* Header */}
            <Card className="border-none shadow-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
                        KI-Rechtsassistent
                    </CardTitle>
                    <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Ihr persönlicher Experte für Mietrecht, Nebenkostenabrechnungen und staatliche Förderungen
                    </p>
                    
                    {/* Dokument-Kontext Anzeige */}
                    {currentDocument && (
                        <div className="mt-6 max-w-2xl mx-auto">
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                                                Dokument geladen
                                            </p>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                                {currentDocument.extracted_data?.dokumenttyp || 'Dokument'} - {currentDocument.title || currentDocument.filename}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setCurrentDocument(null);
                                            setSearchParams({});
                                            setMessages([{
                                                text: `👋 Hallo! Ich bin Ihr persönlicher Mietrechts-Assistent. 

Ich helfe Ihnen bei:
• **Nebenkostenabrechnung prüfen** - Finden Sie Fehler und Einsparpotentiale
• **Mietrecht verstehen** - Ihre Rechte und Pflichten als Mieter
• **Widersprüche formulieren** - Professionelle Musterbriefe
• **Staatliche Hilfen** - Welche Zuschüsse stehen Ihnen zu?

**Stellen Sie mir einfach eine Frage!** 🚀`,
                                                isBot: true
                                            }]);
                                        }}
                                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Usage Counter */}
                    <div className="flex justify-center mt-6">
                        <Badge className={`px-6 py-2 text-base ${
                            user?.subscription_tier === 'free' 
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
                        }`}>
                            {user?.subscription_tier === 'free' ? (
                                <>📊 Noch {remainingQuestions} Fragen heute</>
                            ) : (
                                <>⭐ Unbegrenzte Premium-Fragen</>
                            )}
                        </Badge>
                    </div>

                    {/* Upgrade Prompt for Free Users */}
                    {user?.subscription_tier === 'free' && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/60 dark:border-purple-800/60 max-w-lg mx-auto">
                            <div className="flex items-center gap-2 mb-2 justify-center">
                                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <h4 className="font-bold text-purple-800 dark:text-purple-200">Premium Features</h4>
                            </div>
                            <p className="text-sm text-purple-700 dark:text-purple-300 mb-3 text-center">
                                Unbegrenzte Fragen + Widerspruchs-Generator + Musterbriefe
                            </p>
                            <Button 
                                onClick={() => navigate(createPageUrl('Pricing'))}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm py-2 rounded-xl"
                            >
                                Ab €14.99 upgraden
                            </Button>
                        </div>
                    )}
                </CardHeader>
            </Card>

            {/* Chat Interface - Full Width */}
            <Card className="shadow-xl border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex-1 min-h-0">
                <CardContent className="p-0 flex flex-col min-h-0">
                    {/* Messages */}
                    <div
                        ref={messagesContainerRef}
                        onScroll={updateStickToBottom}
                        className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 pt-5 sm:pt-6 pb-4 space-y-2"
                    >
                        {messages.map((message, index) => (
                            <MessageBubble 
                                key={message?.id || index} 
                                message={message.text} 
                                isBot={message.isBot} 
                                isStreaming={message.isStreaming}
                            />
                        ))}
                        
                        {/* Loading indicator */}
                        {isLoading && !messages.some(m => m.isStreaming) && (
                            <div className="flex gap-3 sm:gap-4 mb-6">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl rounded-bl-md shadow-md">
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                        <TypingDots />
                                        <span>Denke nach...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl px-4 sm:px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                        <div className="flex gap-3 items-end">
                            <Textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmitStream();
                                    }
                                }}
                                placeholder="Stellen Sie mir eine Frage zu Mietrecht oder Nebenkosten..."
                                disabled={isLoading}
                                rows={1}
                                className="min-h-[48px] max-h-40 resize-none text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 rounded-xl"
                            />

                            {isLoading ? (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        stopGeneration();
                                    }}
                                    className="h-12 w-12 p-0 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 rounded-xl"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            ) : (
                                <Button 
                                    type="button"
                                    onClick={handleSubmitStream}
                                    disabled={!inputText.trim()}
                                    className="h-12 w-12 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            )}
                        </div>

                        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Enter zum Senden, Shift+Enter für neue Zeile
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}