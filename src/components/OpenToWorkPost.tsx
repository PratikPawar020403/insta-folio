import React, { useState, useRef } from 'react';
import { Briefcase, CheckCircle2, Mail, Copy, Check, Sparkles, Code, Globe, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpenToWorkPostProps {
  onDoubleTap?: () => void;
}

export const OpenToWorkPost: React.FC<OpenToWorkPostProps> = ({ onDoubleTap }) => {
  const [copied, setCopied] = useState(false);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const lastTapRef = useRef<number>(0);

  const myEmail = 'pratikpawar0222@gmail.com';

  const roles = [
    {
      title: 'Full-Stack Software Engineer',
      type: 'Full-time / High Priority',
      description: 'End-to-end web apps with React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud deployments.',
      icon: Code,
      badge: 'Most Preferred',
    },
    {
      title: 'Frontend / UI-UX Engineer',
      type: 'Full-time / Contract',
      description: 'Pixel-perfect, accessible, interactive web interfaces, design system implementations, and micro-interactions.',
      icon: Sparkles,
      badge: 'Design Systems',
    },
    {
      title: 'Backend & API Developer',
      type: 'Full-time / Contract',
      description: 'High-performance REST & GraphQL APIs, secure authentication, database optimization, and third-party integrations.',
      icon: ShieldCheck,
      badge: 'Scalability',
    },
    {
      title: 'Freelance & Startup MVPs',
      type: 'Consulting / Projects',
      description: 'Taking ideas from zero to production rapidly with clean architecture and modern developer tooling.',
      icon: Globe,
      badge: 'Fast Turnaround',
    },
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${myEmail}?subject=Portfolio%20Inquiry%20-%20Opportunity`;
  };

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (onDoubleTap) onDoubleTap();
    }
    lastTapRef.current = now;
  };

  const activeRole = roles[selectedRoleIndex];

  return (
    <div
      onClick={handleTap}
      className="relative w-full h-[280px] xs:h-[320px] sm:h-[370px] max-h-[44dvh] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none border border-neutral-800"
    >
      {/* Decorative background glow accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Status & Headline */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Open for Work</span>
          </div>

          <div className="text-[11px] text-neutral-400 font-mono">
            MSc IT & BSc CS
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
          What Kind of Work I'm Open To 🎯
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Actively exploring engineering roles & high-impact projects.
        </p>
      </div>

      {/* Center Interactive Role Selector Tabs */}
      <div className="relative z-10 my-2">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {roles.map((role, idx) => {
            const isSelected = idx === selectedRoleIndex;
            const Icon = role.icon;
            return (
              <button
                key={role.title}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoleIndex(idx);
                }}
                className={`flex items-start gap-2 p-2 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500/60 shadow-lg shadow-blue-500/10 scale-[1.02]'
                    : 'bg-neutral-800/40 border-neutral-700/50 hover:bg-neutral-800/70'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-neutral-300'
                  }`}
                >
                  <Icon size={14} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-white truncate">{role.title}</p>
                  <p className="text-[9px] text-neutral-400 truncate">{role.type}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detail Box */}
        <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/80 backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
              <CheckCircle2 size={13} />
              {activeRole.title}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
              {activeRole.badge}
            </span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            {activeRole.description}
          </p>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="relative z-10 pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Briefcase size={14} className="text-neutral-500" />
          <span className="hidden sm:inline">Remote & Worldwide</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors border border-neutral-700 active:scale-95"
            title="Copy Email Address"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Email</span>
              </>
            )}
          </button>

          {/* Direct Contact Button */}
          <button
            onClick={handleContactClick}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            <Mail size={13} />
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
