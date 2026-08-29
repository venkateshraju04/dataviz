import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

function Header() {
  return (
    <header className="border-b border-line">
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
        <Link
          to="/analyze"
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
        >
          Get started
        </Link>
      </div>
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
                <div className="flex gap-1.5">
                  {CHART_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "w-5 bg-accent" : "w-1.5 bg-line hover:bg-soft/40"
                      }`}
                      aria-label={`View chart ${i + 1}`}
                    />
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
/* SVG Chart components for the carousel                                  */
/* ====================================================================== */

function BarChart() {
  const bars = [
    { h: 42, o: 0.35 }, { h: 58, o: 0.45 }, { h: 50, o: 0.55 },
    { h: 72, o: 0.7 }, { h: 65, o: 0.8 }, { h: 92, o: 1 },
  ];
  return (
    <div className="flex h-full items-end gap-2.5">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-accent animate-growbar"
          style={{
            height: `${bar.h}%`,
            opacity: bar.o,
            animationDelay: `${i * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}

function LineChart() {
  return (
    <svg className="h-full w-full" viewBox="0 0 280 140" fill="none" preserveAspectRatio="none">
      {/* Grid lines */}
      {[0, 35, 70, 105, 140].map((y) => (
        <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="var(--line)" strokeWidth="0.5" />
      ))}
      {/* Area fill */}
      <path
        d="M0,120 L47,95 L94,100 L141,60 L188,45 L235,55 L280,20 L280,140 L0,140Z"
        fill="url(#lineGrad)"
        className="animate-rise"
        style={{ animationDuration: "0.8s" }}
      />
      {/* Line */}
      <polyline
        points="0,120 47,95 94,100 141,60 188,45 235,55 280,20"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-draw"
      />
      {/* Data points */}
      {[
        [0, 120], [47, 95], [94, 100], [141, 60], [188, 45], [235, 55], [280, 20],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="white"
          stroke="var(--accent)"
          strokeWidth="2"
          className="animate-rise"
          style={{ animationDelay: `${300 + i * 80}ms` }}
        />
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DonutChart() {
  // Segments: 35%, 25%, 20%, 12%, 8%
  const segments = [
    { pct: 35, color: "var(--accent)", opacity: 1 },
    { pct: 25, color: "var(--accent)", opacity: 0.7 },
    { pct: 20, color: "var(--accent)", opacity: 0.5 },
    { pct: 12, color: "var(--accent)", opacity: 0.35 },
    { pct: 8, color: "var(--accent)", opacity: 0.2 },
  ];

  const radius = 52;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="flex h-full items-center justify-center gap-8">
      <svg className="size-[130px] shrink-0" viewBox="0 0 140 140">
        {segments.map((seg, i) => {
          const dashLen = (seg.pct / 100) * circumference;
          const dashGap = circumference - dashLen;
          const offset = -((cumulative / 100) * circumference);
          cumulative += seg.pct;

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeOpacity={seg.opacity}
              strokeWidth="20"
              strokeDasharray={`${dashLen} ${dashGap}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              className="animate-rise"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-ink font-display text-[18px] font-semibold">
          $142k
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-soft text-[9px]">
          total
        </text>
      </svg>
      {/* Legend */}
      <div className="flex flex-col gap-2">
        {[
          { label: "Electronics", pct: "35%" },
          { label: "Apparel", pct: "25%" },
          { label: "Food", pct: "20%" },
          { label: "Home", pct: "12%" },
          { label: "Other", pct: "8%" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs animate-rise" style={{ animationDelay: `${200 + i * 60}ms` }}>
            <span
              className="size-2.5 rounded-sm bg-accent"
              style={{ opacity: [1, 0.7, 0.5, 0.35, 0.2][i] }}
            />
            <span className="text-soft">{item.label}</span>
            <span className="ml-auto font-medium text-ink tabular-nums">{item.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScatterChart() {
  const points = [
    [20, 110], [40, 95], [55, 88], [70, 75], [85, 82],
    [110, 60], [130, 55], [150, 48], [175, 38], [195, 42],
    [210, 30], [230, 25], [250, 18], [60, 100], [120, 65],
    [160, 52], [200, 35], [90, 70], [140, 58], [180, 40],
  ];
  return (
    <svg className="h-full w-full" viewBox="0 0 280 140" fill="none" preserveAspectRatio="none">
      {/* Grid */}
      {[0, 35, 70, 105, 140].map((y) => (
        <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="var(--line)" strokeWidth="0.5" />
      ))}
      {/* Trend line */}
      <line
        x1="10" y1="115" x2="260" y2="15"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.4"
        className="animate-rise"
        style={{ animationDelay: "200ms" }}
      />
      {/* Points */}
      {points.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="var(--accent)"
          opacity={0.3 + (i / points.length) * 0.7}
          className="animate-rise"
          style={{ animationDelay: `${80 + i * 40}ms` }}
        />
      ))}
    </svg>
  );
}

function AreaChart() {
  return (
    <svg className="h-full w-full" viewBox="0 0 280 140" fill="none" preserveAspectRatio="none">
      {/* Grid */}
      {[0, 35, 70, 105, 140].map((y) => (
        <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="var(--line)" strokeWidth="0.5" />
      ))}
      {/* Area 1 — Team A */}
      <path
        d="M0,130 L56,110 L112,95 L168,70 L224,55 L280,40 L280,140 L0,140Z"
        fill="var(--accent)"
        fillOpacity="0.15"
        className="animate-rise"
        style={{ animationDuration: "0.6s" }}
      />
      <polyline
        points="0,130 56,110 112,95 168,70 224,55 280,40"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-draw"
      />
      {/* Area 2 — Team B */}
      <path
        d="M0,135 L56,125 L112,120 L168,100 L224,85 L280,75 L280,140 L0,140Z"
        fill="var(--accent)"
        fillOpacity="0.08"
        className="animate-rise"
        style={{ animationDuration: "0.8s", animationDelay: "100ms" }}
      />
      <polyline
        points="0,135 56,125 112,120 168,100 224,85 280,75"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
        fill="none"
        className="animate-draw"
        style={{ animationDelay: "200ms" }}
      />
      {/* Legend */}
      <g className="animate-rise" style={{ animationDelay: "400ms" }}>
        <rect x="190" y="6" width="86" height="28" rx="6" fill="white" fillOpacity="0.9" stroke="var(--line)" strokeWidth="0.5" />
        <line x1="196" y1="16" x2="208" y2="16" stroke="var(--accent)" strokeWidth="2" />
        <text x="212" y="19" className="fill-ink text-[8px]">Team A</text>
        <line x1="196" y1="26" x2="208" y2="26" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.5" />
        <text x="212" y="29" className="fill-soft text-[8px]">Team B</text>
      </g>
    </svg>
  );
}

/* ====================================================================== */
/* How it works                                                           */
/* ====================================================================== */

function HowItWorks() {
  return (
    <section id="how" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
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
  return (
    <section id="features" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="max-w-[48ch]">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Why it feels effortless</p>
          <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight tracking-tight text-balance">
            Built for people who think in questions, not queries
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BenefitCard
            title="No query language"
            gradient="from-white to-accent/[0.04]"
            icon="square"
          >
            Ask the way you'd ask a colleague. We handle the translation to the right chart type
            and grouping.
          </BenefitCard>
          <BenefitCard
            title="Sensible by default"
            gradient="from-white to-ink/[0.03]"
            icon="square-dark"
          >
            Trends become lines, parts become bars, relationships become scatter. You always see the
            logic behind the pick.
          </BenefitCard>
          <BenefitCard
            title="Refine, don't rebuild"
            gradient="from-white to-accent/[0.06]"
            icon="circle"
          >
            "Make it a pie" or "group by quarter" — tweak any chart with a single follow-up line.
          </BenefitCard>
        </div>

        <div className="mt-6 rounded-2xl bg-ink p-7 text-paper ring-1 ring-black/5 lg:p-9">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">In practice</p>
              <p className="mt-3 max-w-[32ch] font-display text-xl font-medium leading-snug">
                "Our ops lead asked one question and had the churn chart in the next meeting."
              </p>
              <p className="mt-4 text-pretty text-sm text-paper/60">
                No analyst wait, no ticket, no waiting on a data team. Just an answer.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-paper/50">
                <span>Churn by month</span>
                <span>Q3 trend</span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2">
                {[
                  { h: "80%", o: 1 }, { h: "64%", o: 0.8 }, { h: "52%", o: 0.65 },
                  { h: "38%", o: 0.5 }, { h: "26%", o: 0.4 },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-accent animate-growbar"
                    style={{ height: bar.h, opacity: bar.o, animationDelay: `${400 + i * 80}ms` }}
                  />
                ))}
              </div>
              <div className="mt-3 text-xs text-paper/40">Falling quarter over quarter</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  title,
  gradient,
  icon,
  children,
}: {
  title: string;
  gradient: string;
  icon: "square" | "square-dark" | "circle";
  children: React.ReactNode;
}) {
  const iconBg =
    icon === "square-dark" ? "bg-ink/8" : icon === "circle" ? "bg-accent/15" : "bg-accent/10";
  const iconColor = icon === "square-dark" ? "bg-ink/70" : "bg-accent";
  const iconShape = icon === "circle" ? "rounded-full" : "rounded-sm";

  return (
    <div
      className={`rounded-2xl bg-gradient-to-b p-6 ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 ${gradient}`}
    >
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
  return (
    <section id="cta" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
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
        <div className="flex items-center gap-7 text-sm text-soft">
          <a href="#" className="transition-colors hover:text-ink">
            Docs
          </a>
          <a href="#" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href="#" className="transition-colors hover:text-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
