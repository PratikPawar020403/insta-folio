import { useEffect, useRef, useState, useCallback } from 'react';

interface VoiceIntroOverlayProps {
  onComplete: () => void;
}

// Global declaration for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

const FIL = /^(um+|uh+|umm+|hmm+|like|ummm+)[….,]*$/i;
const LANGS = ['hi-IN', 'en-IN'];

function lev(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d: number[][] = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return d[m][n];
}

function isMatch(t: string): boolean {
  const c = (t || '').toLowerCase().replace(/[^a-z\u0900-\u097f]/g, '');
  if (!c) return false;
  
  // 1. Open Sesame variations
  if (/opensesame|opensesami|sesame/.test(c)) return true;

  // 2. Khul / Khool / Khol / Khup / Kul roots (in English or Devanagari)
  const hasKhul = /(khul|khool|khol|kool|kul|cool|khup|khoop|खुल|खोल|कुल|खूल)/.test(c);
  
  // 3. Sim / Sem / Seem roots
  const hasSim = /(sim|sem|sym|seem|shim|sin|seen|सिम|सीम|सेम|सिंम|सिन|शिम)/.test(c);
  
  // If both "khul" and "sim" roots are detected anywhere in the phrase
  if (hasKhul && hasSim) return true;

  // 4. Fuzzy Levenshtein match for phonetic variations
  if (/[a-z]/.test(c)) {
    const r = c.replace(/^(ok|okay|hey|please|bro|bhai)/, '');
    if (r.length >= 7 && (lev(r, 'khuljasimsim') <= 5 || lev(r, 'khuljasim') <= 3 || lev(r, 'khupjasimsim') <= 4)) {
      return true;
    }
  }

  // 5. Devanagari direct match
  if (/(खुल|खोल).*(सिम|सीम)/.test(c)) return true;

  return false;
}

export function VoiceIntroOverlay({ onComplete }: VoiceIntroOverlayProps) {
  const [state, setState] = useState<'loading' | 'typing' | 'idle' | 'listening' | 'opening' | 'leaving'>('loading');
  const [pct, setPct] = useState('00');
  const [caption, setCaption] = useState('waking up…');
  const [isListening, setIsListening] = useState(false);

  const cvRef = useRef<HTMLDivElement | null>(null);
  const entryRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const recRef = useRef<any>(null);
  const busyRef = useRef(false);
  const hitRef = useRef(false);
  const heardRef = useRef(false);
  const startAtRef = useRef(0);
  const triesRef = useRef(0);
  const isLeavingRef = useRef(false);
  const isListeningRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const passRef = useRef<(() => void) | null>(null);

  const later = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }, []);

  const stopRec = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);
    const r = recRef.current;
    recRef.current = null;
    try {
      if (r) r.abort();
    } catch {
      // ignore
    }
  }, []);

  const chunk = (words: string[]) => {
    const L: string[][] = [];
    let cur: string[] = [];
    let n = 0;
    words.forEach((w) => {
      if (cur.length && n + 1 + w.length > 9) {
        L.push(cur);
        cur = [];
        n = 0;
      }
      cur.push(w);
      n += (n ? 1 : 0) + w.length;
    });
    if (cur.length) L.push(cur);
    return L;
  };

  const fit = useCallback((lines: string[]) => {
    const cv = cvRef.current;
    if (!cv) return;
    const w = window.innerWidth - 48;
    const h = window.innerHeight * 0.46;
    let m = 4;
    lines.forEach((l) => {
      m = Math.max(m, l.length);
    });
    const fs = Math.max(30, Math.min(190, w / (m * 0.52), h / (lines.length * 0.9)));
    cv.style.setProperty('--fs', `${fs}px`);
  }, []);

  const renderText = useCallback((str: string, noCaret = false) => {
    const cv = cvRef.current;
    if (!cv) return;
    const words = str.trim().split(/\s+/).filter(Boolean);
    const lines = chunk(words);
    cv.textContent = '';
    lines.forEach((l, i) => {
      const ln = document.createElement('span');
      ln.className = 'e-ln';
      l.forEach((w) => {
        const s = document.createElement('span');
        s.className = 'e-w' + (FIL.test(w) ? ' fil' : '');
        s.textContent = w;
        ln.appendChild(s);
      });
      if (i === lines.length - 1 && !noCaret) {
        const c = document.createElement('i');
        c.className = 'e-caret';
        ln.appendChild(c);
      }
      cv.appendChild(ln);
    });
    fit(lines.map((l) => l.join(' ')));
  }, [fit]);

  // The Reel/Story Swipe-Up opening transition
  const swipeUp = useCallback(() => {
    if (isLeavingRef.current) return;
    isLeavingRef.current = true;
    stopRec();
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setState('opening');
    setCaption('Opening… ↑');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Slight pause to feel the spring lift before launching up
    setTimeout(() => {
      setState('leaving');
      document.documentElement.classList.remove('intro');

      setTimeout(() => {
        onComplete();
        window.scrollTo(0, 0);
      }, reduce ? 50 : 850);
    }, reduce ? 10 : 80);
  }, [stopRec, onComplete]);

  // Display the clean, clickable "khul ja sim sim"
  const showReadyText = useCallback(() => {
    const cv = cvRef.current;
    if (!cv) return;
    cv.textContent = '';

    const btn = document.createElement('button');
    btn.className = 'e-ghost e-ready-btn';
    btn.id = 'e-ghost';
    btn.setAttribute('aria-label', 'khul ja sim sim: tap to open portfolio');
    btn.innerHTML = '<span class="e-ln">khul ja</span><span class="e-ln">sim sim<i class="e-caret"></i></span>';
    btn.onclick = (e) => {
      e.stopPropagation();
      swipeUp();
    };

    cv.appendChild(btn);
    fit(['khul ja', 'sim sim']);
    setState('idle');
    busyRef.current = false;
    setCaption('tap "Khul Ja Sim Sim" or tap to speak "Khul Ja Sim Sim."');
  }, [fit, swipeUp]);

  // Automatic loading sequence: types "khul ja sim sim" word-by-word
  const startIntroTyping = useCallback(() => {
    setState('typing');
    setCaption('transcribing live…');
    const raw = 'khul ja sim sim';
    let i = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      showReadyText();
      return;
    }

    const step = () => {
      i++;
      renderText(raw.slice(0, i));
      if (i < raw.length) {
        later(step, 38 + Math.random() * 28);
      } else {
        // Once typed, seamlessly transition to the interactive ready button
        later(showReadyText, 180);
      }
    };
    step();
  }, [renderText, showReadyText, later]);

  const back = useCallback((msg: string) => {
    isListeningRef.current = false;
    busyRef.current = false;
    setIsListening(false);
    setState('idle');
    showReadyText();
    setCaption(msg);
  }, [showReadyText]);

  const fail = useCallback((msg: string) => {
    stopRec();
    back(msg);
  }, [stopRec, back]);

  // Voice speech recognition
  const pass = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    recRef.current = r;
    r.lang = LANGS[triesRef.current % LANGS.length];
    r.interimResults = true;
    r.maxAlternatives = 5;
    r.continuous = false;

    r.onspeechstart = () => {
      if (recRef.current === r) setCaption('hearing you…');
    };

    r.onresult = (e: any) => {
      if (recRef.current !== r) return;
      let shown = '';
      heardRef.current = true;
      for (let i = 0; i < e.results.length; i++) {
        for (let j = 0; j < e.results[i].length; j++) {
          const tx = e.results[i][j].transcript;
          if (j === 0) shown = tx;
          if (isMatch(tx)) hitRef.current = true;
        }
      }
      if (shown) renderText(shown);
      if (hitRef.current) {
        stopRec();
        setCaption('Opening… ↑');
        showReadyText();
        later(swipeUp, 150);
      }
    };

    r.onerror = (e: any) => {
      if (recRef.current !== r) return;
      const er = e.error;
      if (er === 'no-speech' || er === 'aborted') return;
      if (er === 'not-allowed' || er === 'service-not-allowed') {
        return fail('Mic permission needed. Allow it in your browser, or tap the words.');
      }
      if (er === 'audio-capture') return fail('No microphone found. Tap the words instead.');
      if (er === 'network') return fail('Voice needs an internet connection. Tap the words instead.');
      fail('Voice isn’t working right now. Tap the words instead.');
    };

    r.onend = () => {
      if (recRef.current !== r || hitRef.current || !isListeningRef.current) return;
      if (Date.now() - startAtRef.current < 14000) {
        triesRef.current++;
        later(() => {
          if (!hitRef.current && isListeningRef.current) {
            try {
              passRef.current?.();
            } catch {
              fail('Voice isn’t working right now. Tap the words instead.');
            }
          }
        }, 150);
      } else {
        stopRec();
        back(heardRef.current ? 'Almost! Say: Khul Ja Sim Sim.' : 'tap "Khul Ja Sim Sim" or tap to speak "Khul Ja Sim Sim."');
      }
    };

    r.start();
  }, [renderText, showReadyText, swipeUp, later, stopRec, back, fail]);

  useEffect(() => {
    passRef.current = pass;
  }, [pass]);

  const handleMicClick = () => {
    if (state === 'listening' || isListeningRef.current) {
      isListeningRef.current = false;
      stopRec();
      back('tap "Khul Ja Sim Sim" or tap to speak "Khul Ja Sim Sim."');
      return;
    }
    if (busyRef.current) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setCaption('Voice input needs Chrome or Edge. Tap "Khul Ja Sim Sim" instead.');
      return;
    }

    hitRef.current = false;
    heardRef.current = false;
    triesRef.current = 0;
    startAtRef.current = Date.now();
    busyRef.current = true;
    isListeningRef.current = true;
    setIsListening(true);
    setState('listening');

    const cv = cvRef.current;
    if (cv) {
      cv.textContent = '';
      const c = document.createElement('i');
      c.className = 'e-caret';
      cv.appendChild(c);
      cv.style.setProperty('--fs', '120px');
    }
    setCaption('Say: Khul Ja Sim Sim');

    try {
      pass();
    } catch {
      fail('Voice isn’t working right now. Tap the words instead.');
    }
  };

  // Touch gesture support on mobile: swipe up to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (deltaY > 45) {
      swipeUp();
    }
    touchStartY.current = null;
  };

  // Clicking on canvas: if already idle or typing, directly open!
  const handleCanvasClick = () => {
    if (state === 'idle' || state === 'typing') {
      swipeUp();
    }
  };

  // Initial loader count-up and font loading check
  useEffect(() => {
    document.documentElement.classList.add('intro');
    const cv = cvRef.current;
    if (cv) cv.style.setProperty('--fs', '120px');

    let animDone = false;
    let fontDone = false;

    const go = () => {
      if (animDone && fontDone) {
        startIntroTyping();
      }
    };

    try {
      Promise.race([
        document.fonts.load('800 100px "Bricolage Grotesque"'),
        new Promise((resolve) => setTimeout(resolve, 3500)),
      ]).then(
        () => {
          fontDone = true;
          go();
        },
        () => {
          fontDone = true;
          go();
        }
      );
    } catch {
      fontDone = true;
      go();
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 150 : 850;
    const t0 = performance.now();

    let frameId: number;
    const animateCount = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const n = Math.round((p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2) * 100);
      setPct((n < 10 ? '0' : '') + n);
      if (p < 1) {
        frameId = requestAnimationFrame(animateCount);
      } else {
        animDone = true;
        go();
      }
    };
    frameId = requestAnimationFrame(animateCount);

    const handleResize = () => {
      fit(['khul ja', 'sim sim']);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      stopRec();
      timersRef.current.forEach(clearTimeout);
      document.documentElement.classList.remove('intro');
    };
  }, [startIntroTyping, fit, stopRec]);

  return (
    <div
      id="entry"
      ref={entryRef}
      data-s={state}
      role="dialog"
      aria-label="Welcome"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div className="e-top">
        <span className="gajraj-one-regular normal-case text-base sm:text-lg tracking-wide text-neutral-900 dark:text-neutral-100">
          प्रतिक पवार
        </span>
        <span id="e-pct" aria-hidden="true" className="font-mono text-sm tracking-wider font-bold">
          {pct}
        </span>
      </div>

      {/* Center Stage Canvas */}
      <div className="e-stage" onClick={handleCanvasClick}>
        <div className="e-canvas" id="e-canvas" ref={cvRef}>
          <i className="e-caret" />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="e-foot">
        <div className="e-cap" id="e-cap" role="status" aria-live="polite">
          {caption}
        </div>
        <button
          className="e-mic"
          id="e-mic"
          onClick={handleMicClick}
          aria-label="Say khul ja sim sim"
          aria-pressed={isListening}
        >
          <span className="dot">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0014 0M12 18v3" />
            </svg>
          </span>
          <span id="e-micTxt" className="font-medium tracking-wide">
            {isListening ? 'listening…' : 'tap to speak'}
          </span>
        </button>
      </div>
    </div>
  );
}
