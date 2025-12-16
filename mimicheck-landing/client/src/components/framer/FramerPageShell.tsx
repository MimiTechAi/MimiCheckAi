import { ReactNode } from "react";
import FramerFooter from "./FramerFooter";
import FramerNavbar from "./FramerNavbar";
import GlobalBackground from "./GlobalBackground";

import "@/styles/framer-theme.css";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FramerPageShell({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-[#050505] text-[var(--framer-text-primary)] relative">
      <GlobalBackground />
      <FramerNavbar />

      <main className="pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--framer-text-primary)]">
                {title}
              </h1>
              {description ? (
                <p className="mt-3 text-base sm:text-lg text-[var(--framer-text-secondary)]">
                  {description}
                </p>
              ) : null}
            </header>

            <div className="rounded-2xl border border-[var(--framer-border)] bg-[var(--framer-bg-card)]/80 backdrop-blur-sm shadow-[var(--framer-shadow-md)] p-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>

      <FramerFooter />
    </div>
  );
}
