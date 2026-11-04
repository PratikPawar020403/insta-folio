import React, { useState } from 'react';
import { ArrowLeft, SquarePen, Sparkles, Globe } from 'lucide-react';
import { InstagramDirectIcon } from './InstagramDirectIcon';

interface MessagesPageProps {
  onBack: () => void;
}

// 1. Authentic Gmail M Logo (Google 4-color M)
const GmailLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path
      d="M2.5 18V7.5L12 14.5l9.5-7V18c0 1.1-.9 2-2 2h-15c-1.1 0-2-.9-2-2z"
      fill="#4285F4"
      opacity="0.08"
    />
    <path
      d="M2.5 7.5V18c0 1.1.9 2 2 2H7V10.8L2.5 7.5z"
      fill="#4285F4"
    />
    <path
      d="M17 20h2.5c1.1 0 2-.9 2-2V7.5L17 10.8V20z"
      fill="#34A853"
    />
    <path
      d="M17 10.8L12 14.5 7 10.8V20H5c-1.1 0-2-.9-2-2V6c0-1.5 1.7-2.3 2.9-1.4L12 9.2l6.1-4.6C19.3 3.7 21 4.5 21 6v12c0 1.1-.9 2-2 2h-2v-9.2z"
      fill="#EA4335"
    />
    <path
      d="M2.5 6c0-1.5 1.7-2.3 2.9-1.4L7 6v4.8L2.5 7.5V6z"
      fill="#FBBC05"
    />
    <path
      d="M17 10.8V6l1.1-.8C19.3 3.7 21 4.5 21 6v1.5l-4 3.3z"
      fill="#C5221F"
    />
  </svg>
);

// 2. Authentic WhatsApp Logo (White handset in speech bubble on green)
const WhatsAppLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.11 19.09L7.83 18.92L4.7 19.74L5.53 16.69L5.34 16.39C4.56 15.15 4.14 13.55 4.14 11.91C4.14 7.37 7.84 3.67 12.05 3.67ZM8.63 7.35C8.44 7.35 8.24 7.36 8.08 7.72C7.91 8.08 7.45 8.52 7.45 9.42C7.45 10.32 8.11 11.18 8.21 11.31C8.31 11.45 9.5 13.27 11.32 14.05C12.84 14.7 13.15 14.57 13.48 14.54C13.82 14.51 14.57 14.09 14.73 13.65C14.89 13.2 14.89 12.82 14.84 12.74C14.79 12.66 14.65 12.61 14.45 12.51C14.25 12.41 13.27 11.93 13.08 11.86C12.9 11.79 12.76 11.76 12.63 11.96C12.49 12.16 12.1 12.65 11.99 12.79C11.87 12.92 11.75 12.94 11.55 12.84C11.35 12.74 10.72 12.53 9.97 11.86C9.39 11.34 9 10.7 8.88 10.5C8.76 10.3 8.87 10.19 8.97 10.09C9.06 10 9.17 9.87 9.27 9.75C9.37 9.63 9.41 9.54 9.47 9.41C9.54 9.29 9.5 9.18 9.45 9.08C9.4 8.98 8.96 7.9 8.78 7.45C8.6 7.02 8.42 7.08 8.29 7.07L8.63 7.35Z"/>
  </svg>
);

// 3. Authentic LinkedIn Logo (White "in" on official blue)
const LinkedInLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
    <circle cx="4.98" cy="4.98" r="2.48" />
    <rect x="2.5" y="9.5" width="4.96" height="12" rx="0.5" />
    <path d="M11.5 9.5h4.7v1.64h.07c.65-1.24 2.25-2.54 4.63-2.54 4.95 0 5.86 3.26 5.86 7.5V21.5h-4.9v-6.93c0-1.65-.03-3.78-2.3-3.78-2.31 0-2.66 1.8-2.66 3.66V21.5h-4.9V9.5z" />
  </svg>
);

export const MessagesPage: React.FC<MessagesPageProps> = ({ onBack }) => {
  const [messageText, setMessageText] = useState('');

  // 1. Tapping Gmail: compose window to email with message body
  const handleOpenGmail = () => {
    const subject = encodeURIComponent('Portfolio Inquiry - Let\'s Connect');
    const body = encodeURIComponent(
      messageText.trim()
        ? messageText.trim()
        : 'Hi Pratik, I came across your portfolio and would like to get in touch!'
    );
    window.location.href = `mailto:pratikpawar0222@gmail.com?subject=${subject}&body=${body}`;
  };

  // 2. Tapping WhatsApp: chat to number with message pre-filled
  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      messageText.trim()
        ? messageText.trim()
        : 'Hi Pratik, I came across your portfolio and would like to connect!'
    );
    window.open(`https://wa.me/918928260115?text=${text}`, '_blank');
  };

  // 3. Tapping LinkedIn: opens profile
  const handleOpenLinkedIn = () => {
    window.open('https://www.linkedin.com/in/pratik-s-pawar-780443358/', '_blank');
  };

  // 4. Tapping GitHub: opens GitHub
  const handleOpenGitHub = () => {
    window.open('https://github.com/PratikPawar020403', '_blank');
  };

  // 5. Tapping Other Portfolio: opens netlify site
  const handleOpenOtherPortfolio = () => {
    window.open('https://psp-02-portfolio.netlify.app/', '_blank');
  };

  const quickChips = [
    '👋 Hi Pratik, open for a chat?',
    '💼 We have an open role for you',
    '🚀 Freelance web development project',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col animate-in fade-in duration-200">
      {/* 1. Instagram DM Sticky Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 h-14 flex items-center justify-between px-4 transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-full text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft size={24} className="stroke-[2.2]" />
          </button>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <h1 className="font-bold text-lg text-neutral-900 dark:text-white tracking-tight">
              Messages
            </h1>
            <span className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black" />
          </div>
        </div>

        <button
          onClick={() => setMessageText('')}
          className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-200"
          title="New conversation"
          aria-label="New conversation"
        >
          <SquarePen size={22} className="stroke-[1.75]" />
        </button>
      </header>

      {/* 2. Primary / General Header Sub-bar */}
      <div className="px-4 pt-3 pb-1 border-b border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs">
        <span className="font-bold text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white pb-2 px-1">
          Primary
        </span>
        <span className="text-neutral-400 dark:text-neutral-500 font-medium pb-2 px-1 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300">
          General
        </span>
        <span className="text-neutral-400 dark:text-neutral-500 font-medium pb-2 px-1 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300">
          Requests (0)
        </span>
      </div>

      {/* 3. Messages List Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Direct Channels
        </div>

        {/* The 3 Rows in strict order: Gmail, WhatsApp, LinkedIn */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-900">
          {/* ROW 1: Gmail */}
          <div
            onClick={handleOpenGmail}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 cursor-pointer transition-colors active:bg-neutral-100 dark:active:bg-neutral-800 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Round profile picture: Gmail M on white circle */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform p-2.5">
                <GmailLogo />
              </div>

              {/* Text info: Bold app name + grey email */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                  Gmail
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                  pratikpawar0222@gmail.com
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                  Tap to compose email • Online
                </p>
              </div>
            </div>

            {/* Blue dot on right: Same blue on all three */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0095F6] flex-shrink-0 ml-3" />
          </div>

          {/* ROW 2: WhatsApp */}
          <div
            onClick={handleOpenWhatsApp}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 cursor-pointer transition-colors active:bg-neutral-100 dark:active:bg-neutral-800 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Round profile picture: WhatsApp logo on green */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform p-2.5">
                <WhatsAppLogo />
              </div>

              {/* Text info: Bold app name + grey WhatsApp number */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                  WhatsApp & Phone
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                  +91-8928260115
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                  Tap to start chat • Quick replies
                </p>
              </div>
            </div>

            {/* Blue dot on right */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0095F6] flex-shrink-0 ml-3" />
          </div>

          {/* ROW 3: LinkedIn */}
          <div
            onClick={handleOpenLinkedIn}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 cursor-pointer transition-colors active:bg-neutral-100 dark:active:bg-neutral-800 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Round profile picture: LinkedIn "in" on blue */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0A66C2] flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform p-2.5">
                <LinkedInLogo />
              </div>

              {/* Text info: Bold app name + grey LinkedIn handle */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                  LinkedIn
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                  linkedin.com/in/pratik-s-pawar-780443358/
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                  Tap to open profile • Connect & InMail
                </p>
              </div>
            </div>

            {/* Blue dot on right */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0095F6] flex-shrink-0 ml-3" />
          </div>

          {/* ROW 4: GitHub */}
          <div
            onClick={handleOpenGitHub}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 cursor-pointer transition-colors active:bg-neutral-100 dark:active:bg-neutral-800 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform p-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                  GitHub
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                  github.com/PratikPawar020403
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                  Codebases, repositories & commits
                </p>
              </div>
            </div>

            <div className="w-2.5 h-2.5 rounded-full bg-[#0095F6] flex-shrink-0 ml-3" />
          </div>

          {/* ROW 5: Other Portfolio Website */}
          <div
            onClick={handleOpenOtherPortfolio}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 cursor-pointer transition-colors active:bg-neutral-100 dark:active:bg-neutral-800 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform p-3">
                <Globe size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                  External Portfolio
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                  psp-02-portfolio.netlify.app
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                  Tap to visit live website
                </p>
              </div>
            </div>

            <div className="w-2.5 h-2.5 rounded-full bg-[#0095F6] flex-shrink-0 ml-3" />
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 pt-6 pb-2">
          <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
            Quick Prompts
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setMessageText(chip)}
                className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Optional Message Box at bottom (passes text to Gmail & WhatsApp) */}
      <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-3 shadow-lg">
        {messageText && (
          <div className="mb-2 px-1 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles size={11} />
              Message ready • Tap Gmail or WhatsApp above to send
            </span>
            <button
              onClick={() => setMessageText('')}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              Clear
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-2xl px-3.5 py-2 border border-neutral-200 dark:border-neutral-800 focus-within:border-neutral-400 dark:focus-within:border-neutral-600 transition-colors">
          <textarea
            rows={1}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Message... (optional)"
            className="flex-1 bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none resize-none max-h-24 py-1"
          />

          {messageText ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleOpenWhatsApp}
                className="p-1.5 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-sm"
                title="Send via WhatsApp"
              >
                <InstagramDirectIcon size={14} strokeWidth={2.2} />
              </button>
              <button
                onClick={handleOpenGmail}
                className="p-1.5 rounded-full bg-blue-600 text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-sm"
                title="Send via Gmail"
              >
                <InstagramDirectIcon size={14} strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <span className="text-neutral-400 dark:text-neutral-600 text-xs select-none">
              Optional
            </span>
          )}
        </div>

        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center mt-2">
          Your message is automatically attached when you tap Gmail or WhatsApp.
        </p>
      </div>
    </div>
  );
};
