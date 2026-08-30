import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DataViz — Describe your data in English. Get the chart." },
      {
        name: "description",
        content:
          "DataViz turns plain-English questions into clean, shareable charts and graphs. No SQL, no code, no dashboard rabbit hole.",
      },
      {
        property: "og:title",
        content: "DataViz — Describe your data in English. Get the chart.",
      },
      {
        property: "og:description",
        content:
          "DataViz turns plain-English questions into clean, shareable charts and graphs. No SQL, no code, no dashboard rabbit hole.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@dataviz" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-accent/15">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <CtaBand />
      <Footer />
    </div>
  );
}

function useInView(threshold = 0.15) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "border-b border-line bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center rounded-md bg-accent">
            <span className="size-2 rounded-sm bg-paper" />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight">DataViz</span>
        </Link>
        <nav className="hidden items-center gap-9 text-sm text-soft sm:flex">
          <a href="#how" className="transition-colors hover:text-ink">
            How it works
          </a>
          <a href="#features" className="transition-colors hover:text-ink">
            Features
          </a>
          <Link to="/analyze" className="transition-colors hover:text-ink">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/analyze"
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
          >
            Get started
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-9 place-items-center rounded-lg text-ink transition-colors hover:bg-ink/5 sm:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="animate-rise border-t border-line bg-paper px-6 pb-6 pt-4 sm:hidden" style={{ animationDuration: "0.25s" }}>
          <nav className="flex flex-col gap-1">
            <a
              href="#how"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              How it works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              Features
            </a>
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


/* ====================================================================== */
/* Hero with rotating chart carousel                                      */
/* ====================================================================== */

const CHART_SLIDES = [
  {
    query: '"Monthly revenue by region for the last 12 months"',
    title: "Revenue by region",
    subtitle: "last 12 mo",
    insight: "EMEA up 23% QoQ",
    type: "bar" as const,
  },
  {
    query: '"Show user growth trend week over week"',
    title: "User growth",
    subtitle: "weekly trend",
    insight: "12% WoW growth",
    type: "line" as const,
  },
  {
    query: '"Breakdown of sales by product category"',
    title: "Sales by category",
    subtitle: "all time",
    insight: "Top 3 = 68% share",
    type: "donut" as const,
  },
  {
    query: '"Correlation between ad spend and conversions"',
    title: "Spend vs conversions",
    subtitle: "Q3 data",
    insight: "r² = 0.87",
    type: "scatter" as const,
  },
  {
    query: '"Compare quarterly performance across teams"',
    title: "Team performance",
    subtitle: "by quarter",
    insight: "Eng leads +18%",
    type: "area" as const,
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % CHART_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const slide = CHART_SLIDES[activeIndex];

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-6">
          <div
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-soft"
            style={{ animationDelay: "50ms" }}
          >
            <span className="size-1.5 rounded-full bg-accent" />
            100% free — no account needed
          </div>
          <h1
            className="animate-rise mt-6 max-w-[20ch] font-display text-5xl font-semibold leading-tight tracking-tight text-balance lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Describe your data in English. Get the chart.
          </h1>
          <p
            className="animate-rise mt-6 max-w-[48ch] text-pretty text-lg text-soft"
            style={{ animationDelay: "200ms" }}
          >
            Type what you want to see and DataViz turns it into a clear, shareable chart — no SQL,
            no code, no dashboard rabbit hole.
          </p>
          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              to="/analyze"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-accent/40 transition-colors hover:bg-accent/90"
            >
              Get started
            </Link>
            <a
              href="#how"
              className="rounded-md px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* ---- Rotating chart demo card ---- */}
        <div className="relative lg:col-span-6">
          <div
            className="animate-rise relative rounded-2xl bg-white ring-1 ring-black/5"
            style={{ animationDelay: "180ms" }}
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-soft">Live demo</span>
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-accent/60" />
              </span>
            </div>

            {/* Query bar — changes with slide */}
            <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm">
              <span className="shrink-0 font-display font-medium text-soft">You</span>
              <span
                key={activeIndex}
                className="truncate text-ink/80 animate-rise"
                style={{ animationDuration: "0.4s" }}
              >
                {slide.query}
              </span>
              <span className="animate-blink font-medium text-accent">|</span>
            </div>

            {/* Chart area */}
            <div className="mx-5 mt-5 pb-5">
              <div className="flex items-baseline justify-between">
                <span
                  key={`title-${activeIndex}`}
                  className="font-display text-sm font-medium animate-rise"
                  style={{ animationDuration: "0.4s" }}
                >
                  {slide.title}
                </span>
                <span className="text-xs text-soft">{slide.subtitle}</span>
              </div>

              {/* Chart visualization — cycles through types */}
              <div className="mt-4 h-40 relative overflow-hidden">
                <div
                  key={`chart-${activeIndex}`}
                  className="animate-rise h-full"
                  style={{ animationDuration: "0.6s" }}
                >
                  {slide.type === "bar" && <BarChart />}
                  {slide.type === "line" && <LineChart />}
                  {slide.type === "donut" && <DonutChart />}
                  {slide.type === "scatter" && <ScatterChart />}
                  {slide.type === "area" && <AreaChart />}
                </div>
              </div>

              {/* Slide indicators */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-soft">
                  <span className="size-2 rounded-sm bg-accent" />
                  Generated in 0.8s
                </div>
                <div className="flex gap-0.5">
                  {CHART_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="flex h-5 w-5 items-center justify-center"
                      aria-label={`View chart ${i + 1}`}
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-4 bg-accent" : "w-1.5 bg-line hover:bg-soft/40"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating insight badge */}
          <div
            className="animate-rise absolute -bottom-5 -left-4 hidden rounded-xl bg-white px-4 py-3 ring-1 ring-black/5 sm:block"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-accent/10">
                <span className="size-2 rounded-full bg-accent" />
              </span>
              <div>
                <div className="text-[11px] text-soft">Insight</div>
                <div
                  key={`insight-${activeIndex}`}
                  className="text-sm font-medium animate-rise"
                  style={{ animationDuration: "0.3s" }}
                >
                  {slide.insight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* SVG Chart components for the carousel — premium versions               */
/* ====================================================================== */

const COLORS = {
  blue: "#3b6fe0",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  slate: "#94a3b8",
};

function BarChart() {
  const data = [
    { label: "NA", v1: 68, v2: 42, },
    { label: "EMEA", v1: 85, v2: 55 },
    { label: "APAC", v1: 52, v2: 38 },
    { label: "LATAM", v1: 45, v2: 30 },
    { label: "MEA", v1: 72, v2: 48 },
    { label: "ANZ", v1: 92, v2: 60 },
  ];
  return (
    <svg className="h-full w-full" viewBox="0 0 300 160" fill="none">
      <defs>
        <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blue} />
          <stop offset="100%" stopColor={COLORS.indigo} />
        </linearGradient>
        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.6" />
          <stop offset="100%" stopColor={COLORS.blue} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Y-axis labels + grid lines */}
      {[
        { y: 20, label: "$30k" },
        { y: 55, label: "$20k" },
        { y: 90, label: "$10k" },
        { y: 125, label: "$0" },
      ].map((g) => (
        <g key={g.y}>
          <text x="2" y={g.y + 3} className="fill-[#9ca3af] text-[7px]">{g.label}</text>
          <line x1="32" y1={g.y} x2="296" y2={g.y} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="3 3" />
        </g>
      ))}
      {/* Bars */}
      {data.map((d, i) => {
        const groupX = 40 + i * 44;
        const h1 = (d.v1 / 100) * 105;
        const h2 = (d.v2 / 100) * 105;
        return (
          <g key={i} className="animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
            {/* Primary bar */}
            <rect
              x={groupX}
              y={125 - h1}
              width="16"
              height={h1}
              rx="3"
              fill="url(#barGrad1)"
            />
            {/* Glossy highlight */}
            <rect
              x={groupX}
              y={125 - h1}
              width="6"
              height={h1}
              rx="3"
              fill="white"
              fillOpacity="0.15"
            />
            {/* Secondary bar */}
            <rect
              x={groupX + 18}
              y={125 - h2}
              width="16"
              height={h2}
              rx="3"
              fill="url(#barGrad2)"
            />
            {/* Value on top of primary */}
            <text
              x={groupX + 8}
              y={125 - h1 - 4}
              textAnchor="middle"
              className="fill-[#6b7280] text-[6px] font-medium"
            >
              ${Math.round(d.v1 * 0.32)}k
            </text>
            {/* X-axis label */}
            <text
              x={groupX + 17}
              y={140}
              textAnchor="middle"
              className="fill-[#9ca3af] text-[7px]"
            >
              {d.label}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      <g className="animate-rise" style={{ animationDelay: "500ms" }}>
        <circle cx="225" cy="150" r="3" fill="url(#barGrad1)" />
        <text x="231" y="153" className="fill-[#6b7280] text-[7px]">This year</text>
        <circle cx="268" cy="150" r="3" fill={COLORS.cyan} fillOpacity="0.5" />
        <text x="274" y="153" className="fill-[#6b7280] text-[7px]">Last year</text>
      </g>
    </svg>
  );
}

function LineChart() {
  return (
    <svg className="h-full w-full" viewBox="0 0 300 160" fill="none">
      <defs>
        <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blue} stopOpacity="0.2" />
          <stop offset="60%" stopColor={COLORS.blue} stopOpacity="0.05" />
          <stop offset="100%" stopColor={COLORS.blue} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineAreaGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.emerald} stopOpacity="0.12" />
          <stop offset="100%" stopColor={COLORS.emerald} stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Y-axis */}
      {[
        { y: 15, l: "5k" }, { y: 50, l: "3k" }, { y: 85, l: "1k" }, { y: 120, l: "0" },
      ].map((g) => (
        <g key={g.y}>
          <text x="4" y={g.y + 3} className="fill-[#9ca3af] text-[7px]">{g.l}</text>
          <line x1="25" y1={g.y} x2="295" y2={g.y} stroke="#e5e7eb" strokeWidth="0.4" strokeDasharray="3 3" />
        </g>
      ))}

      {/* X-axis labels */}
      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m, i) => (
        <text key={m} x={30 + i * 42} y={138} textAnchor="middle" className="fill-[#9ca3af] text-[7px]">{m}</text>
      ))}

      {/* Line 2 (secondary — Users) */}
      <path
        d="M30,95 C55,88 72,82 114,75 C156,68 198,62 240,50 C262,44 282,48 290,55"
        fill="none"
        stroke={COLORS.emerald}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
        className="animate-draw"
        style={{ animationDelay: "200ms" }}
      />
      <path
        d="M30,95 C55,88 72,82 114,75 C156,68 198,62 240,50 C262,44 282,48 290,55 L290,125 L30,125Z"
        fill="url(#lineAreaGrad2)"
        className="animate-rise"
        style={{ animationDuration: "0.8s", animationDelay: "150ms" }}
      />

      {/* Line 1 (primary — Revenue) */}
      <path
        d="M30,100 C55,90 72,85 114,55 C156,30 198,28 240,22 C262,18 282,20 290,15"
        fill="none"
        stroke={COLORS.blue}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-draw"
        filter="url(#glow)"
      />
      <path
        d="M30,100 C55,90 72,85 114,55 C156,30 198,28 240,22 C262,18 282,20 290,15 L290,125 L30,125Z"
        fill="url(#lineAreaGrad)"
        className="animate-rise"
        style={{ animationDuration: "0.8s" }}
      />

      {/* Data points on primary line */}
      {[
        [30, 100], [72, 85], [114, 55], [156, 30], [198, 28], [240, 22], [290, 15],
      ].map(([cx, cy], i) => (
        <g key={i} className="animate-rise" style={{ animationDelay: `${300 + i * 60}ms` }}>
          <circle cx={cx} cy={cy} r="5" fill={COLORS.blue} fillOpacity="0.15" />
          <circle cx={cx} cy={cy} r="3" fill="white" stroke={COLORS.blue} strokeWidth="1.5" />
        </g>
      ))}

      {/* Tooltip on highest point */}
      <g className="animate-rise" style={{ animationDelay: "600ms" }}>
        <rect x="251" y="1" width="40" height="16" rx="4" fill={COLORS.blue} />
        <text x="271" y="12" textAnchor="middle" className="fill-white text-[7px] font-medium">4,832</text>
      </g>

      {/* Legend */}
      <g className="animate-rise" style={{ animationDelay: "500ms" }}>
        <line x1="200" y1="150" x2="212" y2="150" stroke={COLORS.blue} strokeWidth="2.5" strokeLinecap="round" />
        <text x="216" y="153" className="fill-[#6b7280] text-[7px]">Revenue</text>
        <line x1="250" y1="150" x2="262" y2="150" stroke={COLORS.emerald} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <text x="266" y="153" className="fill-[#6b7280] text-[7px]">Users</text>
      </g>
    </svg>
  );
}

function DonutChart() {
  const segments = [
    { pct: 35, color: COLORS.blue, label: "Electronics", value: "$49.7k" },
    { pct: 25, color: COLORS.violet, label: "Apparel", value: "$35.5k" },
    { pct: 20, color: COLORS.emerald, label: "Food", value: "$28.4k" },
    { pct: 12, color: COLORS.amber, label: "Home", value: "$17.0k" },
    { pct: 8, color: COLORS.rose, label: "Other", value: "$11.4k" },
  ];

  const radius = 52;
  const centerX = 70;
  const centerY = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="flex h-full items-center justify-center gap-6">
      <svg className="size-[130px] shrink-0" viewBox="0 0 140 140">
        <defs>
          <filter id="donutShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.08" />
          </filter>
        </defs>
        {/* Background track */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#f1f5f9" strokeWidth="22" />
        {/* Segments */}
        {segments.map((seg, i) => {
          const dashLen = (seg.pct / 100) * circumference;
          const dashGap = circumference - dashLen;
          const offset = -((cumulative / 100) * circumference);
          cumulative += seg.pct;

          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="20"
              strokeDasharray={`${dashLen} ${dashGap}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${centerX} ${centerY})`}
              filter="url(#donutShadow)"
              className="animate-rise"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          );
        })}
        {/* Center text */}
        <text x={centerX} y={centerY - 6} textAnchor="middle" className="fill-[#16161a] font-display text-[17px] font-bold">
          $142k
        </text>
        <text x={centerX} y={centerY + 9} textAnchor="middle" className="fill-[#9ca3af] text-[8px]">
          total revenue
        </text>
      </svg>

      {/* Legend with colored dots + values */}
      <div className="flex flex-col gap-1.5">
        {segments.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-xs animate-rise"
            style={{ animationDelay: `${200 + i * 60}ms` }}
          >
            <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[#6b7280] min-w-[60px]">{item.label}</span>
            <span className="font-medium text-[#16161a] tabular-nums text-[11px]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScatterChart() {
  const clusters = [
    { points: [[25, 108], [38, 96], [50, 100], [42, 112], [55, 92], [32, 104]], color: COLORS.blue, label: "Organic" },
    { points: [[80, 78], [95, 65], [110, 72], [100, 82], [115, 60], [90, 75]], color: COLORS.violet, label: "Paid" },
    { points: [[145, 50], [160, 42], [175, 48], [155, 55], [170, 38], [180, 45]], color: COLORS.emerald, label: "Social" },
    { points: [[210, 28], [225, 22], [240, 30], [220, 35], [250, 18], [235, 25]], color: COLORS.amber, label: "Email" },
  ];

  return (
    <svg className="h-full w-full" viewBox="0 0 300 160" fill="none">
      <defs>
        {Object.entries(COLORS).map(([key, color]) => (
          <radialGradient key={key} id={`scatter-${key}`}>
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </radialGradient>
        ))}
      </defs>

      {/* Axes */}
      <line x1="25" y1="125" x2="290" y2="125" stroke="#e5e7eb" strokeWidth="0.8" />
      <line x1="25" y1="10" x2="25" y2="125" stroke="#e5e7eb" strokeWidth="0.8" />

      {/* Y-axis labels */}
      {[{ y: 20, l: "High" }, { y: 70, l: "Med" }, { y: 120, l: "Low" }].map((g) => (
        <text key={g.y} x="4" y={g.y + 3} className="fill-[#9ca3af] text-[6px]">{g.l}</text>
      ))}
      {/* X-axis labels */}
      {["$0", "$2k", "$5k", "$10k", "$15k"].map((l, i) => (
        <text key={i} x={35 + i * 62} y={140} textAnchor="middle" className="fill-[#9ca3af] text-[6px]">{l}</text>
      ))}
      {/* Grid */}
      {[35, 70, 105].map((y) => (
        <line key={y} x1="25" y1={y} x2="290" y2={y} stroke="#e5e7eb" strokeWidth="0.3" strokeDasharray="3 3" />
      ))}

      {/* Trend line */}
      <line
        x1="30" y1="115" x2="260" y2="12"
        stroke={COLORS.blue}
        strokeWidth="1"
        strokeDasharray="5 4"
        opacity="0.25"
        className="animate-rise"
        style={{ animationDelay: "300ms" }}
      />

      {/* Scatter points by cluster */}
      {clusters.map((cluster, ci) =>
        cluster.points.map(([cx, cy], pi) => {
          const size = 3.5 + Math.random() * 3;
          return (
            <circle
              key={`${ci}-${pi}`}
              cx={cx}
              cy={cy}
              r={size}
              fill={cluster.color}
              fillOpacity={0.6}
              stroke={cluster.color}
              strokeWidth="0.5"
              strokeOpacity="0.3"
              className="animate-rise"
              style={{ animationDelay: `${(ci * 6 + pi) * 30}ms` }}
            />
          );
        })
      )}

      {/* Legend */}
      <g className="animate-rise" style={{ animationDelay: "500ms" }}>
        {clusters.map((c, i) => (
          <g key={i}>
            <circle cx={120 + i * 48} cy={155} r="2.5" fill={c.color} />
            <text x={125 + i * 48} y="157.5" className="fill-[#6b7280] text-[6.5px]">{c.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function AreaChart() {
  return (
    <svg className="h-full w-full" viewBox="0 0 300 160" fill="none">
      <defs>
        <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blue} stopOpacity="0.25" />
          <stop offset="100%" stopColor={COLORS.blue} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.violet} stopOpacity="0.2" />
          <stop offset="100%" stopColor={COLORS.violet} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="areaGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.emerald} stopOpacity="0.15" />
          <stop offset="100%" stopColor={COLORS.emerald} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Axis + grid */}
      {[{ y: 15, l: "400" }, { y: 45, l: "300" }, { y: 75, l: "200" }, { y: 105, l: "100" }, { y: 125, l: "0" }].map((g) => (
        <g key={g.y}>
          <text x="2" y={g.y + 3} className="fill-[#9ca3af] text-[6px]">{g.l}</text>
          <line x1="25" y1={g.y} x2="295" y2={g.y} stroke="#e5e7eb" strokeWidth="0.3" strokeDasharray="3 3" />
        </g>
      ))}
      {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
        <text key={q} x={58 + i * 68} y={140} textAnchor="middle" className="fill-[#9ca3af] text-[7px] font-medium">{q}</text>
      ))}

      {/* Area 3 — Marketing (bottom) */}
      <path
        d="M30,120 C60,118 100,115 160,105 C220,95 260,88 290,82 L290,125 L30,125Z"
        fill="url(#areaGrad3)"
        className="animate-rise"
        style={{ animationDuration: "0.7s", animationDelay: "200ms" }}
      />
      <path
        d="M30,120 C60,118 100,115 160,105 C220,95 260,88 290,82"
        fill="none"
        stroke={COLORS.emerald}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-draw"
        style={{ animationDelay: "300ms" }}
      />

      {/* Area 2 — Sales (middle) */}
      <path
        d="M30,110 C60,102 100,90 160,72 C220,55 260,52 290,48 L290,125 L30,125Z"
        fill="url(#areaGrad2)"
        className="animate-rise"
        style={{ animationDuration: "0.7s", animationDelay: "100ms" }}
      />
      <path
        d="M30,110 C60,102 100,90 160,72 C220,55 260,52 290,48"
        fill="none"
        stroke={COLORS.violet}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-draw"
        style={{ animationDelay: "200ms" }}
      />

      {/* Area 1 — Engineering (top) */}
      <path
        d="M30,95 C60,85 100,65 160,42 C220,22 260,18 290,15 L290,125 L30,125Z"
        fill="url(#areaGrad1)"
        className="animate-rise"
        style={{ animationDuration: "0.7s" }}
      />
      <path
        d="M30,95 C60,85 100,65 160,42 C220,22 260,18 290,15"
        fill="none"
        stroke={COLORS.blue}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-draw"
      />

      {/* Data point highlight */}
      <g className="animate-rise" style={{ animationDelay: "500ms" }}>
        <circle cx="290" cy="15" r="4" fill="white" stroke={COLORS.blue} strokeWidth="1.5" />
        <rect x="258" y="2" width="28" height="13" rx="3" fill={COLORS.blue} />
        <text x="272" y="11.5" textAnchor="middle" className="fill-white text-[6.5px] font-medium">412</text>
      </g>

      {/* Legend */}
      <g className="animate-rise" style={{ animationDelay: "600ms" }}>
        <line x1="160" y1="152" x2="172" y2="152" stroke={COLORS.blue} strokeWidth="2.5" strokeLinecap="round" />
        <text x="175" y="155" className="fill-[#6b7280] text-[7px]">Eng</text>
        <line x1="196" y1="152" x2="208" y2="152" stroke={COLORS.violet} strokeWidth="2" strokeLinecap="round" />
        <text x="211" y="155" className="fill-[#6b7280] text-[7px]">Sales</text>
        <line x1="237" y1="152" x2="249" y2="152" stroke={COLORS.emerald} strokeWidth="2" strokeLinecap="round" />
        <text x="252" y="155" className="fill-[#6b7280] text-[7px]">Marketing</text>
      </g>
    </svg>
  );
}

/* ====================================================================== */
/* How it works                                                           */
/* ====================================================================== */

function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section id="how" className="border-b border-line">
      <div ref={ref} className={`mx-auto max-w-6xl px-6 py-16 lg:py-20 ${inView ? "animate-rise" : "opacity-0"}`}>
        <div className="max-w-[40ch]">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">How it works</p>
          <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight tracking-tight text-balance">
            From sentence to chart in three steps
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-black/5 sm:grid-cols-3">
          <StepCard number="01" title="Ask in plain words">
            "Show signups by week, split by plan." No field names, no syntax to remember.
          </StepCard>
          <StepCard number="02" title="The AI reads your data">
            It maps your words to the right columns and picks the clearest way to show them.
          </StepCard>
          <StepCard number="03" title="A chart you can share">
            Clean, labelled, and export-ready in seconds. Refine it by just asking again.
          </StepCard>
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-paper p-6 sm:p-7">
      <span className="font-display text-2xl font-semibold text-accent">{number}</span>
      <h3 className="mt-4 font-display text-lg font-medium">{title}</h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-soft">{children}</p>
    </div>
  );
}

/* ====================================================================== */
/* Features                                                               */
/* ====================================================================== */

function Features() {
  const { ref, inView } = useInView();

  return (
    <section id="features" className="border-b border-line">
      <div ref={ref} className={`mx-auto max-w-6xl px-6 py-16 lg:py-20 ${inView ? "animate-rise" : "opacity-0"}`}>
        <div className="max-w-[48ch]">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Why it feels effortless</p>
          <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight tracking-tight text-balance">
            Built for people who think in questions, not queries
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-black/5 sm:grid-cols-3">
          <BenefitCard
            title="No query language"
            icon="square"
          >
            Ask the way you'd ask a colleague. We handle the translation to the right chart type
            and grouping.
          </BenefitCard>
          <BenefitCard
            title="Sensible by default"
            icon="square-dark"
          >
            Trends become lines, parts become bars, relationships become scatter. You always see the
            logic behind the pick.
          </BenefitCard>
          <BenefitCard
            title="Refine, don't rebuild"
            icon="circle"
          >
            "Make it a pie" or "group by quarter" — tweak any chart with a single follow-up line.
          </BenefitCard>
        </div>


      </div>
    </section>
  );
}

function BenefitCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: "square" | "square-dark" | "circle";
  children: React.ReactNode;
}) {
  const iconBg =
    icon === "square-dark" ? "bg-ink/8" : icon === "circle" ? "bg-accent/15" : "bg-accent/10";
  const iconColor = icon === "square-dark" ? "bg-ink/70" : "bg-accent";
  const iconShape = icon === "circle" ? "rounded-full" : "rounded-sm";

  return (
    <div className="bg-paper p-6 sm:p-7">
      <span className={`grid size-8 place-items-center rounded-lg ${iconBg}`}>
        <span className={`size-3 ${iconShape} ${iconColor}`} />
      </span>
      <h3 className="mt-4 font-display text-lg font-medium">{title}</h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-soft">{children}</p>
    </div>
  );
}

/* ====================================================================== */
/* CTA Band — no pricing, fully free                                      */
/* ====================================================================== */

function CtaBand() {
  const { ref, inView } = useInView();

  return (
    <section id="cta" className="border-b border-line">
      <div ref={ref} className={`mx-auto max-w-6xl px-6 py-16 lg:py-20 ${inView ? "animate-rise" : "opacity-0"}`}>
        <div className="rounded-2xl bg-accent/5 p-8 text-center ring-1 ring-accent/15 lg:p-12">
          <h2 className="mx-auto max-w-[24ch] font-display text-3xl font-semibold leading-tight tracking-tight text-balance">
            Stop asking for charts. Start answering.
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-pretty text-soft">
            Completely free, forever. Upload your data, ask a question, and get a chart in seconds.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/analyze"
              className="rounded-md bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
            >
              Get started
            </Link>
            <a
              href="#how"
              className="rounded-md px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              See how it works
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-soft">
            <span>100% free</span>
            <span className="size-1 rounded-full bg-line" />
            <span>No sign-up required</span>
            <span className="size-1 rounded-full bg-line" />
            <span>Unlimited analyses</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Footer                                                                  */
/* ====================================================================== */

function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-5 place-items-center rounded-md bg-ink">
            <span className="size-1.5 rounded-sm bg-paper" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">DataViz</span>
          <span className="ml-2 text-sm text-soft">English in, charts out.</span>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-soft sm:gap-7">
          <a href="https://venkateshraju.in" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            Portfolio
          </a>
          <a href="https://blog.venkateshraju.in" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            Blog
          </a>
          <a href="https://github.com/venkateshraju04/dataviz" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href="mailto:me@venkateshraju.in" className="transition-colors hover:text-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
