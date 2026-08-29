import { createFileRoute, Link } from "@tanstack/react-router";

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
          Start free
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-6">
          <div
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-soft"
            style={{ animationDelay: "50ms" }}
          >
            <span className="size-1.5 rounded-full bg-accent" />
            Plain-English data, no queries
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
              Try it free
            </Link>
            <a
              href="#how"
              className="rounded-md px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div
            className="animate-rise relative rounded-2xl bg-white ring-1 ring-black/5"
            style={{ animationDelay: "180ms" }}
          >
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-soft">Live demo</span>
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-accent/60" />
              </span>
            </div>

            <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm">
              <span className="shrink-0 font-display font-medium text-soft">You</span>
              <span className="truncate text-ink/80">"Monthly revenue by region for the last 12 months"</span>
              <span className="animate-blink font-medium text-accent">|</span>
            </div>

            <div className="mx-5 mt-5 pb-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm font-medium">Revenue by region</span>
                <span className="text-xs text-soft">last 12 mo</span>
              </div>
              <div className="mt-4 flex h-40 items-end gap-2.5">
                <Bar height="42%" delay="350ms" opacity="25" />
                <Bar height="55%" delay="420ms" opacity="35" />
                <Bar height="48%" delay="490ms" opacity="45" />
                <Bar height="68%" delay="560ms" opacity="60" />
                <Bar height="62%" delay="630ms" opacity="75" />
                <Bar height="88%" delay="700ms" opacity="100" />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-soft">
                <span className="size-2 rounded-sm bg-accent" />
                Generated in 0.8s — tap any bar to drill in
              </div>
            </div>
          </div>

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
                <div className="text-sm font-medium">EMEA up 23% QoQ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bar({ height, delay, opacity }: { height: string; delay: string; opacity: string }) {
  return (
    <div
      className="animate-growbar flex-1 rounded-t-sm bg-accent"
      style={{ height, animationDelay: delay, opacity: Number(opacity) / 100 }}
    />
  );
}

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
                <Bar height="80%" delay="400ms" opacity="100" />
                <Bar height="64%" delay="480ms" opacity="80" />
                <Bar height="52%" delay="560ms" opacity="65" />
                <Bar height="38%" delay="640ms" opacity="50" />
                <Bar height="26%" delay="720ms" opacity="40" />
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

function CtaBand() {
  return (
    <section id="pricing" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="rounded-2xl bg-accent/5 p-8 text-center ring-1 ring-accent/15 lg:p-12">
          <h2 className="mx-auto max-w-[24ch] font-display text-3xl font-semibold leading-tight tracking-tight text-balance">
            Stop asking for charts. Start answering.
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-pretty text-soft">
            Free to try with your own data. Upgrade when your team starts asking follow-ups all day.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/analyze"
              className="rounded-md bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
            >
              Start free
            </Link>
            <a
              href="#how"
              className="rounded-md px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              See how it works
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-soft">
            <span>No credit card</span>
            <span className="size-1 rounded-full bg-line" />
            <span>Bring your own data</span>
            <span className="size-1 rounded-full bg-line" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            Security
          </a>
          <a href="#" className="transition-colors hover:text-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
