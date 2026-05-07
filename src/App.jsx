import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, CalendarDays, Camera, CheckCircle2, ChevronRight,
  Globe2, Handshake, HeartPulse, MapPin, Moon, Network,
  PlayCircle, RadioTower, ShieldCheck, Sparkles, Sun, Trophy,
  Users, WalletCards,
} from "lucide-react";
import "./index.css";

const ACC = "#F5891F";

/* ── theme ── */
function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem("mrplv-theme") !== "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("mrplv-theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(!dark)}
      className="flex items-center justify-center w-9 h-9 rounded-xl border transition"
      style={{ borderColor: "var(--border)", background: "var(--card-bg)", color: "var(--text)" }}
      title={dark ? "Light Mode" : "Dark Mode"}>
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/* ── helpers ── */
const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease: "easeOut" } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: .08 } } };

function SLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest"
      style={{ borderColor: `${ACC}30`, background: `${ACC}10`, color: "var(--acc)" }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--acc)" }} />
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: "var(--border)", background: "var(--card-bg)", color: "var(--text-muted)" }}>
      {children}
    </span>
  );
}

/* ── data ── */
const consumerTabs = [
  {
    key: "play",
    label: "Play",
    headline: "Open play, quick games, and high-energy court time.",
    text: "Step onto the court at Rainbow & Sahara for daily pickleball action built for beginners, competitors, locals, tourists, and everyone ready to move.",
    cta: "Book Court Time",
    image: "https://images.pexels.com/photos/9985031/pexels-photo-9985031.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "corporate",
    label: "Corporate",
    headline: "Turn team-building into something people actually talk about.",
    text: "Bring your company, convention group, sales team, leadership retreat, or client event into a fast, social, broadcast-ready pickleball experience.",
    cta: "Plan Corporate Event",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "leagues",
    label: "Leagues",
    headline: "Join the ladder. Build your ranking. Chase the finals.",
    text: "Local play feeds leagues, regional qualifiers, national tournaments, and the future Las Vegas Mr. Pickleball Finals.",
    cta: "Join League Waitlist",
    image: "https://images.pexels.com/photos/9984897/pexels-photo-9984897.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "events",
    label: "Events",
    headline: "Birthdays, brand activations, watch parties, and private court takeovers.",
    text: "From weekend fun to sponsor-backed experiences, the branch is built for groups that want energy, music, content, and unforgettable play.",
    cta: "Request Event Package",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "watch",
    label: "Watch",
    headline: "Your match can become the moment everyone sees.",
    text: "The Mr. Pickleball Network turns local matches, corporate challenges, and tournament play into streamable, replayable, sponsor-ready content.",
    cta: "Explore Network",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80",
  },
];

const fiveInOne = [
  { title: "Convention",  Icon: Building2,    text: "Corporate team-building tournaments, executive networking matches, hospitality add-ons, and broadcast-ready participation experiences." },
  { title: "Tradeshow",   Icon: Handshake,    text: "Vendor-branded courts, product demonstrations, sponsored matches, and experiential booth extensions that keep attendees engaged." },
  { title: "Expo",        Icon: Sparkles,     text: "Consumer-facing play zones, influencer sessions, sponsor activations, merchandise, wellness products, and retail engagement." },
  { title: "Fair",        Icon: Users,        text: "Community-facing activations, mobile tournament formats, family participation, and regional visibility for local partners." },
  { title: "Symposium",   Icon: CalendarDays, text: "Wellness breaks, leadership labs, health panels, inclusion programming, and purpose-driven corporate participation sessions." },
];

const revenue = [
  "Corporate team-building packages",
  "R.I.S.E. resident participation subscriptions",
  "Sponsored courts and branded tournaments",
  "Media ads, product placement, and replay inventory",
  "Local, regional, national, and Las Vegas Finals events",
  "Branch and franchise license fees",
];

const phaseMarkets = [
  "Tulsa / OKC","Seattle","Portland","Los Angeles",
  "Las Vegas","Phoenix","Dallas / Houston","New York City",
];

/* ── forms ── */
function InvestorForm() {
  const [submitted, setSubmitted] = useState(false);
  const inp = "h-12 w-full rounded-2xl border px-4 outline-none transition text-sm";
  const sel = "h-12 w-full rounded-2xl border px-4 outline-none transition text-sm";
  const st = { borderColor: "var(--border)", background: "var(--page-bg)", color: "var(--text)", colorScheme: "dark" };
  return submitted ? (
    <div className="rounded-2xl border p-8 text-center" style={{ borderColor: `${ACC}30`, background: `${ACC}10` }}>
      <CheckCircle2 className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--acc)" }} />
      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>Request Received</h3>
      <p style={{ color: "var(--text-muted)" }}>Our team will follow up within 48 hours.</p>
    </div>
  ) : (
    <form onSubmit={async e => {
      e.preventDefault();
      try {
        const res = await fetch("https://formspree.io/f/mqenelab", { method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" } });
        if (res.ok) setSubmitted(true); else alert("Submission error — please try again.");
      } catch { alert("Network error."); }
    }} className="space-y-4">
      <input type="hidden" name="_subject" value="Mr. Pickleball LV — Deal Room Access Request" />
      <input className={inp} style={st} type="text" name="name" placeholder="Full Name" required />
      <input className={inp} style={st} type="text" name="firm" placeholder="Firm / Organization" />
      <input className={inp} style={st} type="email" name="email" placeholder="Email Address" required />
      <select className={sel} style={st} name="investor_type">
        <option value="">Investor Type / Interest</option>
        {["Family Office","Private Equity / Growth Equity","Private Credit / Lender","Infrastructure / Real Assets","ESG / Impact Capital","Municipal / Public-Private Partner","Corporate / Strategic Partner"].map(o => <option key={o}>{o}</option>)}
      </select>
      <textarea name="interest" placeholder="Briefly describe your interest" rows={3}
        className="w-full rounded-2xl border px-4 py-3 outline-none resize-none transition text-sm" style={st} />
      <label className="flex items-start gap-3 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
        <input type="checkbox" required className="mt-1" />
        <span>I understand this is a restricted-access deal room and materials may be confidential and subject to NDA review.</span>
      </label>
      <button type="submit" className="w-full rounded-2xl h-12 font-black transition hover:opacity-90"
        style={{ background: "var(--acc)", color: "#07101c" }}>
        Request Investor Access <ChevronRight className="inline ml-1 h-4 w-4" />
      </button>
    </form>
  );
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const inp = "w-full rounded-2xl border px-4 py-3 outline-none transition text-sm";
  const st = { borderColor: "var(--border)", background: "var(--page-bg)", color: "var(--text)", colorScheme: "dark" };
  return submitted ? (
    <div className="rounded-2xl border p-6 text-center" style={{ borderColor: `${ACC}30`, background: `${ACC}10` }}>
      <CheckCircle2 className="h-10 w-10 mx-auto mb-3" style={{ color: "var(--acc)" }} />
      <p className="font-bold" style={{ color: "var(--text)" }}>Inquiry received — we'll follow up shortly.</p>
    </div>
  ) : (
    <form onSubmit={async e => {
      e.preventDefault();
      try {
        const res = await fetch("https://formspree.io/f/mqenelab", { method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" } });
        if (res.ok) setSubmitted(true); else alert("Submission error.");
      } catch { alert("Network error."); }
    }} className="grid gap-4">
      <input type="hidden" name="_subject" value="Mr. Pickleball LV — Corporate Booking Inquiry" />
      <div className="grid gap-4 md:grid-cols-2">
        <input className={inp} style={st} type="text" name="company" placeholder="Company Name" required />
        <input className={inp} style={st} type="text" name="contact" placeholder="Contact Name" required />
        <input className={inp} style={st} type="email" name="email" placeholder="Email" required />
        <input className={inp} style={st} type="text" name="team_size" placeholder="Team Size" />
      </div>
      <textarea name="event_details" placeholder="Tell us about your event" rows={3}
        className="w-full rounded-2xl border px-4 py-3 outline-none resize-none transition text-sm" style={st} />
      <button type="submit" className="rounded-2xl h-12 font-black transition hover:opacity-90"
        style={{ background: "var(--acc)", color: "#07101c" }}>
        Submit Inquiry <ChevronRight className="inline ml-1 h-4 w-4" />
      </button>
    </form>
  );
}

/* ── main ── */
export default function App() {
  const [dark, setDark] = useTheme();
  const [selectedMarket, setSelectedMarket] = useState("Las Vegas");
  const [activeTab, setActiveTab] = useState("play");
  const activeConsumerTab = consumerTabs.find(t => t.key === activeTab) || consumerTabs[0];

  const selectedNote = useMemo(() => {
    if (selectedMarket === "Las Vegas")
      return "Las Vegas serves as the validation hub: convention demand, corporate team-building, media capture, sponsor inventory, and the annual Mr. Pickleball Finals.";
    return `${selectedMarket} becomes a branch deployment market seeded through R.I.S.E. campus integration, corporate participation, and the national tournament pathway.`;
  }, [selectedMarket]);

  return (
    <div data-theme={dark ? "dark" : "light"} style={{ minHeight: "100vh", background: "var(--page-bg)", color: "var(--text)", fontFamily: "'Inter', sans-serif" }}>

      {/* BG glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, ${ACC}22 0%, transparent 70%)` }} />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/mrp-logo.png" alt="Mr. Pickleball Indoor" className="h-14 object-contain"
              onError={e => e.target.style.display = "none"} />
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: "var(--text-muted)" }}>
            <a href="#play"       className="hover:opacity-80 transition">Play</a>
            <a href="#five-in-1"  className="hover:opacity-80 transition">Platform</a>
            <a href="#expansion"  className="hover:opacity-80 transition">Regions</a>
            <a href="#contact"    className="hover:opacity-80 transition">Visit</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle dark={dark} setDark={setDark} />
            <a href="#investor-access"
              className="hidden md:flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-black transition hover:opacity-90"
              style={{ background: "var(--acc)", color: "#07101c" }}>
              Branch Platform <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── CONSUMER HERO ── */}
        <section id="play" className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-8">
            <motion.div initial="hidden" animate="show" variants={stagger}
              className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">

              <motion.div variants={fadeUp}>
                <div className="mb-5 flex flex-wrap gap-2">
                  <Pill>Las Vegas Pickleball</Pill>
                  <Pill>Open Play</Pill>
                  <Pill>Corporate Events</Pill>
                  <Pill>Leagues + Tournaments</Pill>
                </div>
                <h1 className="max-w-4xl text-6xl font-black tracking-tight md:text-8xl"
                  style={{ color: "var(--text)" }}>
                  Play loud. Move fast. Own the court.
                </h1>
                <p className="mt-6 max-w-2xl text-xl leading-8" style={{ color: "var(--text-muted)" }}>
                  Welcome to Mr. Pickleball Las Vegas — the high-energy court experience at Rainbow &amp; Sahara built for players, parties, companies, creators, and the next generation of pickleball culture.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 font-black text-sm transition hover:opacity-90"
                    style={{ background: "var(--acc)", color: "#07101c" }}>
                    Book / Visit Today <ChevronRight className="h-4 w-4" />
                  </a>
                  <a href="#consumer-tabs"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border px-7 py-4 font-semibold text-sm transition hover:opacity-80"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                    Explore Experiences
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                <div className="h-72 overflow-hidden rounded-[2rem] border md:h-96"
                  style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                  <img
                    src="https://images.pexels.com/photos/9985031/pexels-photo-9985031.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Pickleball player hitting ball"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-10 h-72 overflow-hidden rounded-[2rem] border md:h-96"
                  style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80"
                    alt="Pickleball court action"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* CONSUMER TABS */}
          <section id="consumer-tabs" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
            <div className="rounded-[2.5rem] border p-4 shadow-2xl backdrop-blur md:p-6"
              style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>

              {/* Tab bar */}
              <div className="flex gap-2 overflow-x-auto pb-3">
                {consumerTabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="shrink-0 rounded-2xl px-5 py-3 text-sm font-semibold transition"
                    style={activeTab === tab.key
                      ? { background: "var(--acc)", color: "#07101c" }
                      : { background: "var(--page-bg)", color: "var(--text-muted)" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="grid gap-6 pt-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                <div className="rounded-[2rem] p-7 md:p-9" style={{ background: "var(--page-bg)" }}>
                  <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ background: `${ACC}15`, color: "var(--acc)" }}>
                    {activeConsumerTab.label} Experience
                  </div>
                  <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={{ color: "var(--text)" }}>
                    {activeConsumerTab.headline}
                  </h2>
                  <p className="mt-5 text-lg leading-8" style={{ color: "var(--text-muted)" }}>
                    {activeConsumerTab.text}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-black text-sm transition hover:opacity-90"
                      style={{ background: "var(--acc)", color: "#07101c" }}>
                      {activeConsumerTab.cta}
                    </a>
                    <a href="tel:17752398383"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-4 font-semibold text-sm transition hover:opacity-80"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                      Call 775-239-8383
                    </a>
                  </div>
                </div>

                <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border"
                  style={{ borderColor: "var(--border)" }}>
                  <img
                    src={activeConsumerTab.image}
                    alt={`${activeConsumerTab.label} pickleball experience`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
                    {["Open 6am–10pm", "Rainbow + Sahara", "Vegas Energy"].map(item => (
                      <div key={item}
                        className="rounded-2xl border border-white/15 bg-black/45 p-4 text-sm font-semibold text-white backdrop-blur">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* ── PLATFORM HERO ── */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-32 lg:pt-20">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fade} className="mb-6 flex flex-wrap gap-2">
                <Pill>Participation Infrastructure</Pill>
                <Pill>Corporate Team Building</Pill>
                <Pill>5-in-1 Event Model</Pill>
              </motion.div>
              <motion.h1 variants={fade} className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl"
                style={{ color: "var(--text)" }}>
                Las Vegas becomes the origin point for a national pickleball platform.
              </motion.h1>
              <motion.p variants={fade} className="mt-6 max-w-2xl text-lg leading-8"
                style={{ color: "var(--text-muted)" }}>
                The Rainbow &amp; Sahara branch turns pickleball into a physical and digital real estate fixture inside the R.I.S.E. ecosystem — connecting convention activity, corporate experiences, community wellness, media, sponsorships, and branch expansion.
              </motion.p>
              <motion.div variants={fade} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#investor-access"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-black text-sm transition hover:opacity-90"
                  style={{ background: "var(--acc)", color: "#07101c" }}>
                  Request Branch Brief <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#five-in-1"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-4 font-semibold text-sm transition hover:opacity-80"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  <PlayCircle className="h-4 w-4" /> View Platform
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}>
              <div id="courts" className="rounded-[2rem] border overflow-hidden shadow-2xl"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                <div className="border-b p-6" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-3 text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    <MapPin className="h-4 w-4" /> Flagship Branch Location
                  </div>
                  <h2 className="text-3xl font-black mb-3" style={{ color: "var(--text)" }}>Rainbow &amp; Sahara</h2>
                  <p className="text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                    Designed as the Las Vegas proof hub for corporate participation, R.I.S.E. wellness programming, media capture, and national tournament development.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
                  {[
                    [Camera,      "Streamed Matches",    "Live, replay, restream"],
                    [Globe2,      "140+ Languages",      "Global accessibility"],
                    [HeartPulse,  "R.I.S.E. Wellness",  "Residents + community"],
                    [WalletCards, "Financeable Revenue", "Subscriptions + contracts"],
                  ].map(([Icon, title, sub]) => (
                    <div key={title} className="p-5" style={{ background: "var(--page-bg)" }}>
                      <Icon className="mb-3 h-5 w-5" style={{ color: "var(--acc)" }} />
                      <div className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{title}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["5-in-1", "Convention, Tradeshow, Expo, Fair, Symposium"],
              ["8",      "Phase 1 branch deployment markets"],
              ["140+",   "Languages and dialects through network layer"],
              ["50",     "State branch/franchise expansion pathway"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                <div className="text-3xl font-black mb-1" style={{ color: "var(--acc)" }}>{v}</div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-IN-1 */}
        <section id="five-in-1" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SLabel>The 5-in-1 Event Model</SLabel>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-4xl font-black mb-5" style={{ color: "var(--text)" }}>Built for the Las Vegas event economy.</h2>
              <p className="text-lg leading-8" style={{ color: "var(--text-muted)" }}>
                The branch extends traditional pickleball into the five major event channels that drive corporate and visitor activity: conventions, tradeshows, expos, fairs, and symposiums.
              </p>
            </div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} variants={stagger}
              className="grid gap-4 md:grid-cols-2">
              {fiveInOne.map(({ title, Icon, text }) => (
                <motion.div key={title} variants={fade}>
                  <div className="h-full rounded-2xl border p-6 transition"
                    style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${ACC}50`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                    <Icon className="h-6 w-6 mb-4" style={{ color: "var(--acc)" }} />
                    <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>{title}</h3>
                    <p className="text-sm leading-6" style={{ color: "var(--text-muted)" }}>{text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* R.I.S.E. + NETWORK */}
        <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--page-bg2)" }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[2rem] border p-8" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
              <HeartPulse className="h-8 w-8 mb-6" style={{ color: "var(--acc)" }} />
              <h2 className="text-3xl font-black mb-4" style={{ color: "var(--text)" }}>R.I.S.E. Campus Integration</h2>
              <p className="leading-7 mb-7" style={{ color: "var(--text-muted)" }}>
                Pickleball becomes a physical wellness fixture within R.I.S.E. campus footprints — supporting exercise, mental health, social reintegration, resident engagement, and measurable community outcomes.
              </p>
              <div className="space-y-3">
                {["Daily resident participation blocks","Corporate volunteer and CSR events","Community tournaments and leadership roles","Monthly participation subscription framework"].map(x => (
                  <div key={x} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--acc)" }} /> {x}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border p-8" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
              <RadioTower className="h-8 w-8 mb-6" style={{ color: "var(--acc)" }} />
              <h2 className="text-3xl font-black mb-4" style={{ color: "var(--text)" }}>Mr. Pickleball Network</h2>
              <p className="leading-7 mb-7" style={{ color: "var(--text-muted)" }}>
                Local matches, corporate experiences, and tournament play can be streamed, recorded, restreamed, and monetized through product placement, ad spots, sponsored content, and global language translation.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Employee remote viewing","Sponsor ad inventory","Product placement","Las Vegas Finals pathway"].map(x => (
                  <div key={x} className="rounded-2xl border p-4 text-sm"
                    style={{ borderColor: "var(--border)", background: "var(--page-bg)", color: "var(--text-muted)" }}>{x}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVENUE */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SLabel>Revenue Architecture</SLabel>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black mb-5" style={{ color: "var(--text)" }}>Impact-driven activity becomes financeable cashflow.</h2>
              <p className="text-lg leading-8 mb-8" style={{ color: "var(--text-muted)" }}>
                The Las Vegas branch is built to demonstrate predictable revenue from physical participation, digital media, corporate experiences, sponsorships, and branch/franchise licensing.
              </p>
              <div className="rounded-[2rem] border p-6" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                <div className="flex items-center gap-3 text-sm font-bold mb-3" style={{ color: "var(--text)" }}>
                  <ShieldCheck className="h-5 w-5" style={{ color: "var(--acc)" }} /> Financing Layer
                </div>
                <p className="text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                  Site development and construction build-out may be anchored by surety bond instruments, subsequent credit facility revolver, and Lavish Enterprises, Inc. stock offering participation to further support development financing.
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {revenue.map((item, idx) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * .05 }}
                  className="flex items-center justify-between rounded-2xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                  <span style={{ color: "var(--text)" }}>{item}</span>
                  <ChevronRight className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPANSION */}
        <section id="expansion" className="border-y" style={{ borderColor: "var(--border)", background: "var(--page-bg2)" }}>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <SLabel>Branch Expansion</SLabel>
                <h2 className="text-4xl font-black mb-5" style={{ color: "var(--text)" }}>Las Vegas validates. R.I.S.E. bridges. Branch markets scale.</h2>
                <p className="text-lg leading-8 mb-8" style={{ color: "var(--text-muted)" }}>
                  The Enterprise License is structured as a national branch model with MSA and SOW deployments for each region/community campus footprint. Every branch benefits from corporate demand, R.I.S.E. resident engagement, network media, and tournament progression.
                </p>
                <div className="rounded-[2rem] border p-6" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Selected Market</h3>
                  <p className="text-sm leading-6" style={{ color: "var(--text-muted)" }}>{selectedNote}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {phaseMarkets.map(market => (
                  <button key={market} onClick={() => setSelectedMarket(market)}
                    className="rounded-2xl border p-5 text-left transition hover:opacity-90"
                    style={selectedMarket === market
                      ? { borderColor: "var(--acc)", background: "var(--acc)", color: "#07101c" }
                      : { borderColor: "var(--border)", background: "var(--card-bg)", color: "var(--text)" }}>
                    <div className="text-xs mb-2 opacity-60">Phase 1 Market</div>
                    <div className="text-xl font-black">{market}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] border p-8 md:p-12"
            style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
              <div>
                <SLabel>Branch Location Brief</SLabel>
                <h2 className="text-4xl font-black mb-5 md:text-5xl" style={{ color: "var(--text)" }}>Not a court. A platform.</h2>
                <p className="max-w-2xl text-lg leading-8" style={{ color: "var(--text-muted)" }}>
                  The Las Vegas Mr. Pickleball branch is the first proof point for a physical/digital real estate fixture inside R.I.S.E. — designed for wellness, corporate engagement, media monetization, and national branch expansion.
                </p>
              </div>
              <div className="space-y-3">
                <a href="#investor-access"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl h-14 font-black transition hover:opacity-90"
                  style={{ background: "var(--acc)", color: "#07101c" }}>
                  Schedule Branch Review <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#contact"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl h-14 border font-semibold transition hover:opacity-80"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  Download Enterprise License Summary
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INVESTOR ACCESS */}
        <section id="investor-access" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
            <div className="p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <SLabel>Restricted Access</SLabel>
                  <h2 className="text-3xl font-black mb-4 md:text-4xl" style={{ color: "var(--text)" }}>Investor Access / Deal Room</h2>
                  <p className="text-sm leading-6 mb-6" style={{ color: "var(--text-muted)" }}>
                    Qualified investors, strategic partners, lenders, and municipal stakeholders may request gated access to the Mr. Pickleball × R.I.S.E. enterprise license materials, SOW framework, capital stack, underwriting memo, and deployment exhibits.
                  </p>
                  <div className="space-y-3">
                    {["Enterprise License + MSA Framework","Phase 1 SOW Deployment Exhibits","Capital Stack + Surety Bond / Credit Facility Model","R.I.S.E. Campus Integration Materials","Network Channel + Sponsorship Revenue Architecture"].map(item => (
                      <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--acc)" }} /> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--page-bg)" }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>Request Deal Room Access</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Submit your information. Access is subject to approval and may require NDA execution.</p>
                  <InvestorForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT + MAP + BOOKING */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border p-8" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
            <h2 className="text-2xl font-black mb-6" style={{ color: "var(--text)" }}>Visit the Las Vegas Branch</h2>
            <div className="grid gap-6 md:grid-cols-3 text-sm mb-8">
              <div>
                <div className="font-bold mb-2" style={{ color: "var(--text)" }}>Address</div>
                <div style={{ color: "var(--text-muted)" }}>2000 South Rainbow Blvd.<br />Las Vegas, NV 89146</div>
                <a href="https://www.google.com/maps/search/?api=1&query=2000+South+Rainbow+Blvd+Las+Vegas+NV+89146"
                  target="_blank" rel="noreferrer"
                  className="inline-block mt-3 text-xs hover:underline" style={{ color: "var(--acc)" }}>
                  Get Directions →
                </a>
              </div>
              <div>
                <div className="font-bold mb-2" style={{ color: "var(--text)" }}>Phone</div>
                <a href="tel:17752398383" className="hover:underline" style={{ color: "var(--acc)" }}>775-239-8383</a>
              </div>
              <div>
                <div className="font-bold mb-2" style={{ color: "var(--text)" }}>Operating Hours</div>
                <div className="leading-6" style={{ color: "var(--text-muted)" }}>Monday – Sunday<br />6:00 am – 10:00 pm</div>
              </div>
            </div>

            <iframe
              title="Mr Pickleball Las Vegas Map"
              src="https://www.google.com/maps?q=2000+South+Rainbow+Blvd+Las+Vegas+NV+89146&output=embed"
              className="w-full h-64 rounded-2xl border mb-10"
              style={{ borderColor: "var(--border)" }}
              loading="lazy"
            />

            <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--page-bg)" }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>Corporate Booking Inquiry</h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Schedule a team-building session, branded activation, or executive experience.</p>
              <BookingForm />
            </div>
          </div>
        </section>

      </div>

      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-dim)" }}>
          Mr. Pickleball Las Vegas Branch • R.I.S.E. Participation Infrastructure • TPG / WWTC / Lavish Integration
        </p>
      </footer>
    </div>
  );
}
