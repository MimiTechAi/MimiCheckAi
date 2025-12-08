/**
 * ChatMockup Component - Framer-Style AI Chat Interface
 *
 * A mockup showing an AI chat interface with document analysis
 * visualization and MimiCheck-specific AI responses.
 *
 * Requirements: 5.3
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  User,
  FileText,
  CheckCircle2,
  Sparkles,
  Send,
} from "lucide-react";
import { UIMockup } from "./UIMockup";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  isAnalyzing?: boolean;
  analysisResults?: {
    label: string;
    value: string;
    status: "success" | "info" | "warning";
  }[];
}

export interface ChatMockupProps {
  /** Custom messages to display (optional) */
  messages?: ChatMessage[];
  /** Additional CSS classes */
  className?: string;
}

// Default chat messages showcasing AI document analysis
const defaultMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "Ich habe meine Gehaltsabrechnung hochgeladen. Welche Förderungen stehen mir zu?",
    timestamp: "14:32",
  },
  {
    id: "2",
    role: "assistant",
    content: "Ich analysiere deine Dokumente...",
    timestamp: "14:32",
    isAnalyzing: true,
    analysisResults: [
      { label: "Einkommen erkannt", value: "2.450€ netto", status: "success" },
      { label: "Haushaltsgröße", value: "2 Personen", status: "info" },
      { label: "Wohnkosten", value: "850€ warm", status: "success" },
    ],
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Basierend auf deinen Daten hast du Anspruch auf Wohngeld! Ich kann den Antrag automatisch für dich ausfüllen.",
    timestamp: "14:33",
  },
];

/**
 * ChatMockup - AI chat interface mockup
 */
export default function ChatMockup({
  messages = defaultMessages,
  className = "",
}: ChatMockupProps) {
  const prefersReducedMotion = useReducedMotion();

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const analysisVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <UIMockup title="MimiCheck AI Assistent" className={className}>
      <div className="flex flex-col h-[380px]">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              custom={index}
              variants={prefersReducedMotion ? undefined : messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-violet-500/20"
                    : "bg-emerald-500/20"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-violet-400" />
                ) : (
                  <Bot className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-[85%] ${message.role === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block px-4 py-2.5 rounded-2xl ${
                    message.role === "user"
                      ? "bg-violet-500/20 text-white rounded-tr-sm"
                      : "bg-slate-800/60 text-slate-200 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                {/* Document Analysis Results */}
                {message.isAnalyzing && message.analysisResults && (
                  <div className="mt-3 space-y-2">
                    {/* Analysis Header */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Dokument-Analyse</span>
                      <motion.div
                        animate={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      </motion.div>
                    </div>

                    {/* Analysis Results */}
                    <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/30">
                      {message.analysisResults.map((result, i) => (
                        <motion.div
                          key={result.label}
                          custom={i}
                          variants={
                            prefersReducedMotion ? undefined : analysisVariants
                          }
                          initial="hidden"
                          animate="visible"
                          className="flex items-center justify-between py-1.5 border-b border-slate-700/20 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${
                                result.status === "success"
                                  ? "text-emerald-400"
                                  : result.status === "warning"
                                    ? "text-yellow-400"
                                    : "text-blue-400"
                              }`}
                            />
                            <span className="text-xs text-slate-400">
                              {result.label}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-white">
                            {result.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                {message.timestamp && (
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {message.timestamp}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-slate-700/30 bg-slate-900/50">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-xl border border-slate-700/30">
            <input
              type="text"
              placeholder="Frag den KI-Assistenten..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              disabled
            />
            <button
              className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
              aria-label="Nachricht senden"
              title="Nachricht senden"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </UIMockup>
  );
}

// Named export
export { ChatMockup };
