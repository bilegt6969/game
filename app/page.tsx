"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content — edit freely                                             */
/* ------------------------------------------------------------------ */
const OTHER_NAME = "Zoe";
const ZOE_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9q2e27TQfqHHiJaEd6w1U2V7oNqztYv2wNaMNuOM-XJEcsdye0uXl8M&s=10";
const FEET_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRutTgnE06h5ZEXN4sVwlfao5h_yYUk00wco-ZgHOIXlhy6f6K-SWa0NLM&s=10";
const d = (i: number) => ({ ["--i" as string]: i } as React.CSSProperties);

const VERSIONS: Record<string, string[]> = {
  Soft: [
    `Sending you those reels of ${OTHER_NAME} was thoughtless.`,
    "And I really hate that ugly girl.",
    "I can see why it hurt, and I'm deeply sorry it did.",
    "No excuses. You deserved much better from me.",
  ],
  Straight: [
    `I shouldn't have sent you reels of ${OTHER_NAME}.`,
    "And I really hate that ugly girl.",
    "It was careless, and it made you feel less than you are.",
    "That's on me. I'm sorry.",
  ],
  Short: [`I'm sorry about the ${OTHER_NAME} reels.`, "And I really hate that ugly girl.", "It hurt you. I get it now.", "It won't happen again."],
};

const APPRECIATIONS = [
  { title: "Ease", text: "You make ordinary conversations feel effortless." },
  { title: "Thoughtfulness", text: "You're thoughtful in quiet ways you probably don't notice." },
  { title: "Care", text: "You care about things properly, with passion. I admire that." },
  { title: "Warmth", text: "Talking to you is consistently the best part of my day. I've been so busy lately, and thank you so much for understanding that. You are so perfect." },
];

const FACTS = [
  "(I like how you do your makeup)",
  "(Your body is tea)",
  "(You are so positive)",
  "(You are funny)",
  "(I really like when u call me 'buulunhi')",
  "(I would eat you if it was not illegal)",
  "(I am a big fan of yours)",
  "(You are patient and wife material)",
  "(You a diva)",
  "(Your smile lights up my day)",
  "(You're smarter than you give yourself credit for)",
  "(I love your Studio voice)",
  "(You have great taste in music)",
  "(You're genuinely kind)",
  "(Your laugh is contagious)",
  "(You're beautiful inside and out)",
  "(You drive your car so well TBH!)",
];

const PROMISES = [
  "Never send reels of any other ugly girl. Only beautiful ones. Reels of yours.",
  "Think about how it will feel before I send something.",
  "Ask how you're doing, and actually listen.",
  "Notice what matters to you, and remember it.",
];

const REPLIES = [
  { emoji: "🥹", label: "Thank you", text: "Thanks for giving me the minute. It means a lot." },
  { emoji: "🫶", label: "It's okay", text: "I'm really glad. I'll show it, not just say it." },
  { emoji: "⏳", label: "I need time", text: "Of course. Take all the time you need. No pressure." },
];

const BITS = ["💗", "✨", "🌸", "☁️", "⭐"];

/* ------------------------------------------------------------------ */
/*  Hand-drawn bits                                                   */
/* ------------------------------------------------------------------ */
const Arrow = () => (
  <svg viewBox="0 0 48 64" width="30" height="40" aria-hidden="true" className="ls-arrow">
    <path d="M24 3 C 19 15, 29 25, 24 38 C 22 45, 24 52, 25 59" pathLength={1} />
    <path d="M12 47 C 18 51, 22 55, 25 60 C 29 54, 34 50, 41 46" pathLength={1} />
  </svg>
);
const Squiggle = () => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="ls-squig" aria-hidden="true">
    <path d="M2 7 C 20 1, 30 11, 50 6 S 80 2, 100 7 S 140 11, 160 5 S 190 4, 198 7" pathLength={1} />
  </svg>
);
const Heart = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`ls-doodle ${className}`} aria-hidden="true">
    <path d="M12 21 C 4 14, 2 9, 6 6 C 9 4, 11 6, 12 8 C 13 6, 15 4, 18 6 C 22 9, 20 14, 12 21 Z" pathLength={1} />
  </svg>
);
const Sparkle = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`ls-doodle ${className}`} aria-hidden="true">
    <path d="M12 2 C 12 8, 16 12, 22 12 C 16 12, 12 16, 12 22 C 12 16, 8 12, 2 12 C 8 12, 12 8, 12 2 Z" pathLength={1} />
  </svg>
);

const Next = ({ to, label = "Next" }: { to: string; label?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <button ref={ref} className="ls-next" aria-label={label}
      onClick={(e) => { e.stopPropagation(); document.getElementById(to)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
      <Arrow />
    </button>
  );
};

const Switch = ({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) => (
  <button role="switch" aria-checked={on} className={`ls-sw ${on ? "is-on" : ""}`} onClick={() => set(!on)}>
    <span className="ls-sw-track"><span className="ls-sw-knob" /></span>
    <span>{label}</span>
  </button>
);

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.opacity = "1"; return; }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight, c = r.top + r.height / 2;
      const dist = Math.abs(c - vh / 2) / (vh / 2);
      const t = Math.min(1, Math.max(0, 1 - (dist - 0.2) / 0.55));
      const e = t * t * (3 - 2 * t); // smoothstep: scrubbed with the scroll
      el.style.opacity = String(0.12 + 0.88 * e);
      el.style.transform = `translate3d(0, ${(1 - e) * 28 * (c > vh / 2 ? 1 : -1)}px, 0)`;
      el.style.filter = e > 0.98 ? "none" : `blur(${((1 - e) * 6).toFixed(1)}px)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={`ls-line ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function LittleSomething() {
  const rootRef = useRef<HTMLElement>(null);
  const uid = useRef(0);
  const [version, setVersion] = useState("Soft");
  const [sparkles, setSparkles] = useState(true);
  const [dark, setDark] = useState(false);
  const [big, setBig] = useState(false);
  const [appr, setAppr] = useState(0);
  const [ticked, setTicked] = useState<number[]>([]);
  const [big1, setBig1] = useState<number | null>(null);
  const [reply, setReply] = useState<number | null>(null);
  const [bits, setBits] = useState<{ id: number; x: number; y: number; e: string; dx: number; dy: number; r: number }[]>([]);
  const allTicked = ticked.length === PROMISES.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--p", (max > 0 ? window.scrollY / max : 0).toFixed(4));
      root.style.setProperty("--sy", String(Math.round(window.scrollY)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const burst = (x: number, y: number) => {
    const made = Array.from({ length: 6 }, () => ({
      id: ++uid.current, x, y, e: BITS[Math.floor(Math.random() * BITS.length)],
      dx: (Math.random() - 0.5) * 170, dy: -50 - Math.random() * 120, r: (Math.random() - 0.5) * 70,
    }));
    setBits((b) => [...b, ...made]);
    setTimeout(() => setBits((b) => b.filter((p) => !made.some((m) => m.id === p.id))), 1000);
  };

  const toggle = (i: number) => setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]));

  return (
    <main
      ref={rootRef}
      className={`ls ${allTicked ? "is-lit" : ""} ${dark ? "is-dark" : ""} ${big ? "is-big" : ""}`}
      onClick={(e) => sparkles && burst(e.clientX, e.clientY)}
    >
      <style>{css}</style>
      <div className="ls-glow" aria-hidden="true" />
      <div className="ls-bar" aria-hidden="true" />
      {bits.map((b) => (
        <span key={b.id} className="ls-bit" aria-hidden="true"
          style={{ left: b.x, top: b.y, ["--dx" as string]: `${b.dx}px`, ["--dy" as string]: `${b.dy}px`, ["--r" as string]: `${b.r}deg` }}>
          {b.e}
        </span>
      ))}

      {/* Hero */}
      <section className="ls-sec ls-hero">
        <Sparkle className="ls-d1 ls-par2" />
        <Heart className="ls-d2 ls-par3" />
        <p className="ls-note ls-par2">(I wrote this in english, in mongolian it sounded so cringe)</p>
        <h1 className="ls-xl ls-par" aria-label="I owe you an apology.">
          <span className="ls-w" style={d(0)}>I</span>{" "}
          <span className="ls-w" style={d(1)}>owe</span>{" "}
          <span className="ls-w" style={d(2)}>you</span>
          <br />
          <span className="ls-w" style={d(3)}>an</span>{" "}
          <span className="ls-w ls-uline" style={d(4)}>apology.<Squiggle /></span>
        </h1>
        <p className="ls-sub ls-enter" style={{ animationDelay: "0.5s" }}>
          I made this for you. Read it however you like.
        </p>
        <p className="ls-fact ls-enter" style={{ animationDelay: "0.6s" }}>{FACTS[0]}</p>
        <p className="ls-fact ls-enter" style={{ animationDelay: "0.7s" }}>{FACTS[1]}</p>

        <div className="ls-panel ls-enter" style={{ animationDelay: "0.8s" }}>
          <div className="ls-seg" role="radiogroup" aria-label="Version of the apology">
            {Object.keys(VERSIONS).map((v) => (
              <button key={v} role="radio" aria-checked={version === v} className={version === v ? "is-on" : ""}
                onClick={(e) => { e.stopPropagation(); setVersion(v); }}>
                {v}
              </button>
            ))}
          </div>
          <div className="ls-switches" onClick={(e) => e.stopPropagation()}>
            <Switch on={sparkles} set={setSparkles} label="Sparkles ✨" />
            <Switch on={dark} set={setDark} label="Dark 🌙" />
            <Switch on={big} set={setBig} label="Big text 🔍" />
          </div>
        </div>
        <Next to="sorry" label="Start reading" />
      </section>

      {/* Apology */}
      <section id="sorry" className="ls-sec ls-tall">
        {VERSIONS[version].map((line, i) => (
          <React.Fragment key={version + i}>
            <Reveal className="ls-xl ls-xl--md">
              {i === 0 ? (
                <div className="ls-zrow">
                  <span>{line}</span>
                  <figure className="ls-fig ls-fig--z">
                    <span className="ls-thumb ls-thumb--z">
                      <img src={ZOE_PHOTO} alt={OTHER_NAME} referrerPolicy="no-referrer" draggable={false} />
                    </span>
                    <figcaption className="ls-cap">{OTHER_NAME}</figcaption>
                  </figure>
                  <div className="ls-arrow-note">
                    <span className="ls-arrow-text">very ugly</span>
                    <svg viewBox="0 0 100 60" className="ls-point-arrow">
                      <path d="M 50 5 L 50 50" stroke="var(--rose)" strokeWidth="2.5" fill="none" />
                      <path d="M 50 50 L 42 42 M 50 50 L 58 42" stroke="var(--rose)" strokeWidth="2.5" fill="none" />
                    </svg>
                  </div>
                </div>
              ) : (
                line
              )}
            </Reveal>
            {i === 1 && <Reveal className="ls-fact ls-fact--right">{FACTS[2]}</Reveal>}
            {i === 2 && <Reveal className="ls-fact">{FACTS[3]}</Reveal>}
          </React.Fragment>
        ))}
        <Next to="appreciate" />
      </section>

      {/* Appreciation */}
      <section id="appreciate" className="ls-sec ls-split">
        <div>
          <p key={appr} className="ls-xl ls-xl--md ls-swap" aria-live="polite">{APPRECIATIONS[appr].text}</p>
          <button className="ls-more" onClick={(e) => { e.stopPropagation(); setAppr((appr + 1) % APPRECIATIONS.length); }}>
            Another one <Heart className="ls-mini" />
          </button>
          <p className="ls-fact ls-fact--small">{FACTS[4]}</p>
          <p className="ls-fact ls-fact--small">{FACTS[5]}</p>
        </div>
        <div className="ls-tabs" role="tablist" aria-label="Things I appreciate">
          {APPRECIATIONS.map((a, i) => (
            <button key={a.title} role="tab" aria-selected={appr === i} className={`ls-tab ${appr === i ? "is-on" : ""}`}
              onClick={(e) => { e.stopPropagation(); setAppr(i); }}>
              {a.title}
            </button>
          ))}
        </div>
        <Next to="promise" />
      </section>

      {/* Promises */}
      <section id="promise" className="ls-sec ls-split">
        <h2 className="ls-xl ls-xl--md">From now on, I will.</h2>
        <div>
          <ul className="ls-list">
            {PROMISES.map((p, i) => {
              const on = ticked.includes(i);
              return (
                <li key={p}>
                  <button className={`ls-row ${on ? "is-on" : ""}`} aria-pressed={on}
                    onClick={(e) => { e.stopPropagation(); toggle(i); }}>
                    <span className="ls-check" aria-hidden="true">
                      <svg viewBox="0 0 20 20" width="14" height="14">
                        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{p}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="ls-hint">{allTicked ? "Thank you 💗" : "Tap each one to agree"}</p>
          <p className="ls-fact ls-fact--small">{FACTS[6]}</p>
          <p className="ls-fact ls-fact--small">{FACTS[7]}</p>
        </div>
        <Next to="end" />
      </section>

      {/* Ending */}
      <section id="end" className="ls-sec ls-end">
        <Reveal className="ls-xl">
          You don't have to
          <br />
          say anything.
        </Reveal>
        <Reveal className="ls-sub">I just wanted you to know.</Reveal>
        <Reveal className="ls-replies">
          <div className="ls-reply-row" onClick={(e) => e.stopPropagation()}>
            {REPLIES.map((r, i) => (
              <button key={r.label} className={`ls-chip ${reply === i ? "is-on" : ""}`} onClick={(e) => { setReply(i); sparkles && burst(e.clientX, e.clientY); }}>
                <span aria-hidden="true">{r.emoji}</span> {r.label}
              </button>
            ))}
          </div>
          <p key={reply} className="ls-hint ls-swap" aria-live="polite">{reply === null ? "If you want to answer, tap one." : REPLIES[reply].text}</p>
        </Reveal>
        <Reveal className="ls-feet">
          <figure className="ls-fig">
            <button className={`ls-thumb ${big1 === 0 ? "is-big" : ""}`} aria-label="Enlarge photo"
              onClick={(e) => { e.stopPropagation(); setBig1(big1 === 0 ? null : 0); }}>
              <img src={FEET_PHOTO} alt="" referrerPolicy="no-referrer" draggable={false} />
            </button>
          </figure>
          <p className="ls-xl ls-xl--md">I am a very big fan of your feet.</p>
          <p className="ls-sub">I would like to purchase your pair of socks - Buur jinkneese.</p>
        </Reveal>
        <p className="ls-fact">{FACTS[8]}</p>
        <p className="ls-fact ls-fact--right">{FACTS[9]}</p>
        <p className="ls-fact">{FACTS[10]}</p>
        <p className="ls-fact ls-fact--right">{FACTS[11]}</p>
        <p className="ls-fact">{FACTS[12]}</p>
        <p className="ls-fact ls-fact--right">{FACTS[13]}</p>
        <p className="ls-fact">{FACTS[14]}</p>
        <p className="ls-fact ls-fact--right">{FACTS[15]}</p>
        <p className="ls-fact">{FACTS[16]}</p>
        <button className="ls-btn ls-btn--quiet" onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Back to the start
        </button>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                            */
/* ------------------------------------------------------------------ */
const css = `
.ls {
  --ink: #ffffff; --mist: #0a0a0a; --dusk: #6e6e73; --rose: #e7a8a0; --line: rgba(0,0,0,.12); --chip: #f1f1f3;
  --p: 0;
  --serif: ui-serif, "New York", "Iowan Old Style", Georgia, serif;
  --sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  --hand: "Bradley Hand", "Segoe Print", "Chalkboard SE", "Comic Sans MS", cursive;
  background: var(--ink); color: var(--mist); font-family: var(--sans);
  min-height: 100vh; position: relative; overflow-x: clip; transition: background .5s ease, color .5s ease;
  -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent;
}
.ls.is-dark { --ink: #12141b; --mist: #eceef4; --dusk: #9aa1b8; --line: rgba(236,238,244,.16); --chip: #1d2029; }
html { scroll-behavior: smooth; }

.ls-glow { position: fixed; left: 50%; top: 50%; width: 120vmax; height: 120vmax; pointer-events: none;
  transform: translate3d(-50%, calc(-50% + (0.5 - var(--p)) * 40vh), 0);
  background: radial-gradient(closest-side at 64% 38%, rgba(150,185,255,.16), rgba(150,185,255,0) 70%), radial-gradient(closest-side, rgba(231,168,160,.24), rgba(231,168,160,0) 70%);
  opacity: .55; transition: opacity 1.6s ease; will-change: transform; }
.ls.is-lit .ls-glow { opacity: 1; }
.ls-bar { position: fixed; inset: 0 0 auto 0; height: 2px; z-index: 5; transform-origin: left; transform: scaleX(var(--p)); background: var(--rose); }

.ls-sec { position: relative; min-height: 100svh; padding: clamp(24px, 6vw, 96px); display: flex; flex-direction: column;
  justify-content: center; gap: clamp(20px, 3vw, 36px); max-width: 1100px; margin: 0 auto; }
.ls-tall { min-height: auto; padding-block: 30vh 18vh; gap: 40vh; }
.ls-hero, .ls-end { align-items: flex-start; }

.ls-xl { font-family: var(--serif); font-weight: 500; margin: 0; letter-spacing: -0.025em; line-height: .96;
  font-size: clamp(44px, 9.5vw, 120px); text-wrap: balance; }
.ls-xl--md { font-size: clamp(32px, 6.2vw, 72px); line-height: 1; }
.is-big .ls-xl--md { font-size: clamp(40px, 8.4vw, 100px); }
.is-big .ls-sub, .is-big .ls-row { font-size: clamp(22px, 3.2vw, 30px); }
.ls-sub { font-size: clamp(18px, 2.4vw, 24px); line-height: 1.28; color: var(--dusk); margin: 0; max-width: 34ch; }
.ls-note { font-family: var(--hand); font-size: clamp(14px, 2vw, 18px); line-height: 1.3; color: var(--dusk); margin: 0 0 20px 0; max-width: 34ch; text-align: right; font-style: italic; }
.ls-fact { font-family: var(--hand); font-size: clamp(16px, 2.2vw, 20px); line-height: 1.4; color: var(--dusk); margin: 8px 0; max-width: 32ch; opacity: 0.85; }
.ls-fact--right { text-align: right; align-self: flex-end; }
.ls-fact--small { font-size: clamp(14px, 2vw, 18px); margin-top: 16px; }
.ls-hint, .ls-cap { font-family: var(--hand); font-size: clamp(18px, 2.4vw, 22px); color: var(--dusk); margin: 12px 0 0; min-height: 1.4em; }

.ls-line { opacity: .12; will-change: opacity, transform, filter; }
.ls-enter { opacity: 0; animation: ls-up 1.1s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes ls-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
.ls-swap { animation: ls-swap .6s cubic-bezier(.2,.7,.2,1); min-height: 3.4em; }
.ls-hint.ls-swap { min-height: 1.4em; }
@keyframes ls-swap { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

/* Hand-drawn strokes: draw in once visible */
.ls-arrow, .ls-squig, .ls-doodle { overflow: visible; }
.ls-squig path, .ls-doodle path { fill: none; stroke: var(--rose); stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 1; stroke-dashoffset: 1; animation: ls-draw 1.2s .9s ease forwards; }
.ls-arrow path { fill: none; stroke: var(--mist); stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
.ls-next.in .ls-arrow path { animation: ls-draw 1s cubic-bezier(.4,0,.2,1) forwards; }
.ls-next.in .ls-arrow path + path { animation-delay: .8s; }
.ls-uline .ls-squig path { animation-delay: 1.6s; }
.ls-squig path { stroke-width: 3; }
.ls-doodle path { stroke-width: 1.5; }
@keyframes ls-draw { to { stroke-dashoffset: 0; } }
.ls-uline { position: relative; display: inline-block; }
.ls-squig { position: absolute; left: 0; bottom: -0.08em; width: 100%; height: .16em; }
.ls-doodle { position: absolute; width: clamp(28px, 5vw, 48px); height: auto; }
.ls-d1 { top: 14%; right: 12%; transform: rotate(8deg); }
.ls-d2 { bottom: 24%; right: 22%; transform: rotate(-12deg); }
.ls-mini { position: static; width: 18px; display: inline-block; vertical-align: -3px; }

.ls-next { align-self: flex-start; background: none; border: 0; padding: 10px; margin: 0 0 -10px -10px; cursor: pointer; border-radius: 12px;
  animation: ls-bob 2.4s ease-in-out infinite; transition: transform .25s ease; }
.ls-next:hover { transform: translateY(4px) scale(1.1); }
@keyframes ls-bob { 50% { translate: 0 6px; } }

.ls-btn, .ls-more, .ls-chip, .ls-tab, .ls-seg button, .ls-sw { font-family: var(--sans); cursor: pointer; }
.ls-btn { font-weight: 600; font-size: 17px; color: var(--ink); background: var(--mist); border: 0; padding: 14px 28px; border-radius: 980px; transition: transform .25s ease, opacity .25s; }
.ls-btn:hover { opacity: .85; transform: scale(1.03); }
.ls-btn:active { transform: scale(.97); }
.ls-btn--quiet { background: transparent; color: var(--dusk); border: 1px solid var(--line); margin-top: 24px; }
.ls-more { font: 500 20px var(--hand); background: none; border: 0; color: var(--dusk); padding: 10px 0; margin-top: 12px; transition: color .25s, transform .25s; }
.ls-more:hover { color: var(--mist); transform: translateX(4px); }

/* Control panel: version + switches */
.ls-panel { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; padding: 20px; border-radius: 24px; border: 1px solid var(--line); background: var(--chip); }
.ls-seg { display: inline-flex; padding: 4px; border-radius: 980px; background: var(--ink); border: 1px solid var(--line); }
.ls-seg button { border: 0; background: none; color: var(--dusk); font-size: 15px; font-weight: 500; padding: 8px 18px; border-radius: 980px; transition: all .3s cubic-bezier(.2,.7,.2,1); }
.ls-seg button.is-on { background: var(--mist); color: var(--ink); }
.ls-switches { display: flex; flex-wrap: wrap; gap: 8px 20px; }
.ls-sw { display: inline-flex; align-items: center; gap: 10px; border: 0; background: none; color: var(--mist); font-size: 15px; padding: 6px 0; }
.ls-sw-track { width: 42px; height: 26px; border-radius: 99px; background: var(--line); position: relative; transition: background .3s; }
.ls-sw-knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--ink); box-shadow: 0 1px 4px rgba(0,0,0,.25); transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
.ls-sw.is-on .ls-sw-track { background: var(--rose); }
.ls-sw.is-on .ls-sw-knob { transform: translateX(16px); }

.ls-tabs { display: flex; flex-wrap: wrap; gap: 10px; }
.ls-tab { font-size: 16px; font-weight: 500; color: var(--dusk); background: transparent; border: 1px solid var(--line); border-radius: 980px; padding: 10px 20px; transition: all .25s ease; }
.ls-tab:hover { color: var(--mist); border-color: var(--dusk); }
.ls-tab.is-on { color: var(--ink); background: var(--mist); border-color: var(--mist); }

.ls-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; max-width: 640px; }
.ls-row { display: flex; align-items: center; gap: 18px; width: 100%; text-align: left; cursor: pointer; font: 400 clamp(18px, 2.6vw, 24px)/1.25 var(--sans);
  color: var(--dusk); background: none; border: 0; border-top: 1px solid var(--line); padding: 22px 0; transition: color .3s ease; }
.ls-list li:last-child .ls-row { border-bottom: 1px solid var(--line); }
.ls-row:hover, .ls-row.is-on { color: var(--mist); }
.ls-check { flex: none; width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--dusk); display: grid; place-items: center; color: #fff; transition: all .3s cubic-bezier(.2,.7,.2,1); }
.ls-check svg { opacity: 0; transform: scale(.5); transition: all .3s cubic-bezier(.2,.7,.2,1); }
.ls-row.is-on .ls-check { background: var(--rose); border-color: var(--rose); transform: rotate(-8deg) scale(1.08); }
.ls-row.is-on .ls-check svg { opacity: 1; transform: none; }

/* Small rounded square photos */
.ls-gallery { margin-top: -22vh; }
.ls-thumbs { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; }
.ls-thumb { width: clamp(88px, 22vw, 132px); aspect-ratio: 1; border-radius: 22px; overflow: hidden; padding: 0; border: 0; cursor: pointer;
  background: var(--chip); display: grid; place-items: center; color: var(--dusk); font-size: 28px;
  box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.1); transition: width .5s cubic-bezier(.3,1.3,.5,1), transform .3s ease; }
.ls-thumb:hover { transform: rotate(-3deg); }
.ls-thumb.is-big { width: min(100%, 300px); }
.ls-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

.ls-reply-row { display: flex; flex-wrap: wrap; gap: 10px; }
.ls-chip { font-size: 16px; font-weight: 500; color: var(--mist); background: var(--chip); border: 1px solid var(--line); border-radius: 980px; padding: 12px 20px; transition: transform .3s cubic-bezier(.3,1.5,.5,1), background .25s; }
.ls-chip:hover { transform: translateY(-3px) rotate(-2deg); }
.ls-chip.is-on { background: var(--mist); color: var(--ink); }

.ls-bit { position: fixed; z-index: 20; font-size: 22px; pointer-events: none; animation: ls-pop 1s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes ls-pop { from { opacity: 1; transform: translate(-50%, -50%) scale(.6); }
  to { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--r)) scale(1.2); } }

.ls { animation: ls-fade 1.2s ease both; }
@keyframes ls-fade { from { opacity: 0; } to { opacity: 1; } }
.ls-w { display: inline-block; opacity: 0; animation: ls-word 1.3s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(var(--i) * .1s + .2s); }
@keyframes ls-word { from { opacity: 0; transform: translateY(.45em); filter: blur(12px); } to { opacity: 1; transform: none; filter: none; } }
.ls-par { translate: 0 calc(var(--sy, 0) * -0.14 * 1px); }
.ls-par2 { translate: 0 calc(var(--sy, 0) * -0.32 * 1px); }
.ls-par3 { translate: 0 calc(var(--sy, 0) * -0.2 * 1px); }
.ls-thumbs { gap: 22px; }
.ls-fig { margin: 0; display: flex; flex-direction: column; gap: 12px; }
.ls-fig .ls-cap { margin: 0; max-width: 190px; font-size: 19px; line-height: 1.3; }
.ls-thumb.is-big { width: min(80vw, 280px); }
.ls-thumb img { transition: transform .8s cubic-bezier(.2,.7,.2,1); }
.ls-thumb:hover img { transform: scale(1.06); }
.ls-btn, .ls-chip, .ls-tab, .ls-sw-knob, .ls-more { transition-timing-function: cubic-bezier(.2,.7,.2,1); }
.ls-zrow { display: flex; align-items: center; justify-content: space-between; gap: clamp(16px, 4vw, 40px); position: relative; }
.ls-zrow > span { flex: 1; min-width: 0; text-wrap: balance; }
.ls-fig--z { flex: none; align-items: center; }
.ls-fig--z .ls-cap { text-align: center; max-width: none; }
.ls-thumb--z { width: clamp(72px, 16vw, 128px); cursor: default; }
.ls-thumb--z:hover { transform: rotate(3deg); }
.ls-arrow-note { position: absolute; top: -60px; right: clamp(50px, 10vw, 120px); display: flex; flex-direction: column; align-items: center; font-family: var(--hand); color: var(--rose); font-size: clamp(14px, 2vw, 18px); z-index: 10; }
.ls-point-arrow { width: 35px; height: 55px; }
.ls-arrow-text { margin-bottom: 2px; font-style: italic; }
.ls-feet { display: flex; flex-direction: column; gap: 20px; margin-top: 40px; max-width: 640px; }
.ls .ls-hint, .ls .ls-cap { line-height: 1.2; }
.ls button:focus-visible { outline: 2px solid var(--rose); outline-offset: 3px; }
@media (min-width: 900px) {
  .ls-split { display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; column-gap: 8vw; }
  .ls-split > .ls-next { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) {
  .ls, .ls *, .ls-glow { animation: none !important; transition: none !important; }
  .ls-enter, .ls-line { opacity: 1; transform: none; filter: none; }
  .ls-arrow path, .ls-squig path, .ls-doodle path { stroke-dashoffset: 0; }
  .ls-glow { transform: translate(-50%, -50%); }
}
`;
