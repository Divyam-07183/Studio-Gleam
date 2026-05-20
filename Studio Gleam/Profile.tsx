import { useNavigate } from "react-router";
import {
  FileText,
  LayoutGrid,
  Puzzle,
  Clock,
  Mail,
  CheckCircle2,
  Circle,
  ChevronRight,
  Pencil,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useBuilder } from "../../context/BuilderContext";

const addonsMap: Record<string, string> = {
  seo: "SEO Booster",
  analytics: "Analytics Setup",
  copy: "Copywriting Pack",
  hosting: "Premium Hosting",
};

const timelinesMap: Record<string, { label: string; sub: string }> = {
  "2w": { label: "1-2 days", sub: "Express" },
  "4w": { label: "2-3 days", sub: "Standard" },
  "8w": { label: "4-5 days", sub: "Extended" },
};

const minBudget = 1500;
const maxBudget = 12000;

function wordCount(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function Profile() {
  const navigate = useNavigate();
  const {
    description,
    selectedPages,
    selectedAddons,
    selectedTimeline,
    budgetSlider,
    email,
  } = useBuilder();

  const wc = wordCount(description);
  const validEmail = email.trim() !== "" && isValidEmail(email);
  const estimatedBudget =
    Math.round(((budgetSlider / 100) * (maxBudget - minBudget) + minBudget) / 100) * 100;
  const timeline = timelinesMap[selectedTimeline] ?? timelinesMap["4w"];

  // ── Section completion logic ──────────────────────────────────────────────
  // Brief: 0 words = 0, 1-79 = partial, 80+ = done → contributes 0–35 pts
  const briefPts = Math.min((wc / 80) * 35, 35);
  // Pages: only home (default) = partial, 2+ = done → 0–20 pts
  const pagesPts = selectedPages.length >= 2 ? 20 : selectedPages.length === 1 ? 6 : 0;
  // Add-ons: 1+ selected → 15 pts (seo is default)
  const addonsPts = selectedAddons.length >= 1 ? 15 : 0;
  // Budget customised (slider moved away from 50) → 10 pts
  const budgetPts = budgetSlider !== 50 ? 10 : 3;
  // Email valid → 20 pts
  const emailPts = validEmail ? 20 : email.trim() !== "" ? 5 : 0;

  const totalPts = briefPts + pagesPts + addonsPts + budgetPts + emailPts;
  const overallPct = Math.round(Math.min(totalPts, 100));

  const briefComplete = wc >= 80;
  const pagesComplete = selectedPages.length >= 2;
  const addonsComplete = selectedAddons.length >= 1;
  const budgetComplete = budgetSlider !== 50;
  const emailComplete = validEmail;

  const completedCount = [briefComplete, pagesComplete, addonsComplete, budgetComplete, emailComplete].filter(Boolean).length;

  // Progress colour
  const barColor =
    overallPct >= 80
      ? "from-emerald-400 to-green-500"
      : overallPct >= 50
      ? "from-violet-500 to-purple-600"
      : overallPct >= 25
      ? "from-amber-400 to-orange-500"
      : "from-gray-300 to-gray-400";

  const statusLabel =
    overallPct >= 80
      ? "Almost ready to submit! 🎉"
      : overallPct >= 50
      ? "Good progress — keep going"
      : overallPct >= 20
      ? "Just getting started"
      : "Brief not started yet";

  const steps = [
    {
      id: "brief",
      icon: FileText,
      label: "Project Brief",
      sublabel: "Describe your website vision",
      complete: briefComplete,
      pct: Math.min(Math.round((wc / 80) * 100), 100),
      detail: wc === 0
        ? "No description written yet"
        : wc < 80
        ? `${wc} words written — ${80 - wc} more for full marks`
        : `${wc} words written — thorough description ✓`,
      value: wc > 0 ? `"${description.trim().slice(0, 52)}${description.length > 52 ? "…" : ""}"` : null,
    },
    {
      id: "pages",
      icon: LayoutGrid,
      label: "Pages & Features",
      sublabel: "Website pages selected",
      complete: pagesComplete,
      pct: Math.min(Math.round((selectedPages.length / 4) * 100), 100),
      detail: selectedPages.length === 0
        ? "No pages selected"
        : `${selectedPages.length} page${selectedPages.length > 1 ? "s" : ""} selected`,
      value: selectedPages.length > 0
        ? selectedPages.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")
        : null,
    },
    {
      id: "addons",
      icon: Puzzle,
      label: "Add-ons",
      sublabel: "Optional services selected",
      complete: addonsComplete,
      pct: selectedAddons.length > 0 ? 100 : 0,
      detail: selectedAddons.length === 0
        ? "No add-ons selected"
        : `${selectedAddons.length} add-on${selectedAddons.length > 1 ? "s" : ""} selected`,
      value: selectedAddons.length > 0
        ? selectedAddons.map((id) => addonsMap[id] ?? id).join(", ")
        : null,
    },
    {
      id: "budget",
      icon: Clock,
      label: "Timeline & Budget",
      sublabel: "Delivery speed and budget",
      complete: budgetComplete,
      pct: budgetComplete ? 100 : 30,
      detail: budgetComplete
        ? `$${estimatedBudget.toLocaleString()} budget · ${timeline.label} (${timeline.sub})`
        : `Default budget — customise the slider`,
      value: `${timeline.label} · $${estimatedBudget.toLocaleString()}`,
    },
    {
      id: "email",
      icon: Mail,
      label: "Contact Info",
      sublabel: "Your email address",
      complete: emailComplete,
      pct: validEmail ? 100 : email.trim() !== "" ? 40 : 0,
      detail: email.trim() === ""
        ? "Email not entered"
        : validEmail
        ? "Valid email address ✓"
        : "Email entered but invalid",
      value: validEmail ? email : null,
    },
  ];

  return (
    <div className="flex flex-col pb-8">

      {/* ── Mobile header ── */}
      <header className="md:hidden flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <span className="text-white text-xs">💎</span>
          </div>
          <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>StudioGleam</span>
        </div>
        <span className="text-violet-600 text-sm" style={{ fontWeight: 500 }}>Progress</span>
      </header>

      {/* ── Desktop page title ── */}
      <div className="hidden md:flex items-center justify-between pt-2 pb-4">
        <div>
          <h1 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.4rem" }}>Builder Progress</h1>
          <p className="text-gray-400 text-sm mt-0.5">Live tracker of your project brief</p>
        </div>
        <button
          onClick={() => navigate("/builder")}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors text-sm"
          style={{ fontWeight: 500 }}
        >
          <Pencil size={14} />
          Continue in Builder
        </button>
      </div>

      {/* ── Overall progress hero ─────────────────────────────────────────── */}
      <div className="mx-5 md:mx-0 mt-5 md:mt-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-lg">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1" style={{ fontWeight: 600 }}>
              Overall Completion
            </p>
            <div className="flex items-end gap-2">
              <span className="text-white" style={{ fontWeight: 800, fontSize: "2.4rem", lineHeight: 1 }}>
                {overallPct}
              </span>
              <span className="text-gray-400 mb-1" style={{ fontSize: "1.1rem" }}>%</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">{statusLabel}</p>
          </div>
          {/* Circular score ring */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#374151" strokeWidth="6" />
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - overallPct / 100)}`}
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>{completedCount}/5</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`}
            style={{ width: `${overallPct}%` }}
          />
        </div>

        {/* Section dots */}
        <div className="flex items-center gap-1.5 mt-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step.complete ? "bg-violet-400" : step.pct > 0 ? "bg-violet-700" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-2">
          {completedCount} of 5 sections complete
        </p>
      </div>

      {/* ── Section cards ────────────────────────────────────────────────── */}
      <div className="mt-5 flex flex-col gap-3 mx-5 md:mx-0">
        <p className="text-gray-400 text-xs uppercase tracking-widest" style={{ fontWeight: 600 }}>
          Section Breakdown
        </p>

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`bg-white border rounded-2xl p-4 transition-all ${
                step.complete
                  ? "border-violet-100 shadow-sm shadow-violet-50"
                  : "border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Status icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  step.complete
                    ? "bg-violet-100"
                    : step.pct > 0
                    ? "bg-amber-50"
                    : "bg-gray-50"
                }`}>
                  <Icon
                    size={16}
                    className={
                      step.complete ? "text-violet-600" : step.pct > 0 ? "text-amber-500" : "text-gray-400"
                    }
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Label row */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>
                      {step.label}
                    </p>
                    {step.complete ? (
                      <CheckCircle2 size={13} className="text-violet-500 flex-shrink-0" />
                    ) : step.pct > 0 ? (
                      <span className="px-1.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-600 text-xs rounded-full" style={{ fontWeight: 500 }}>
                        In progress
                      </span>
                    ) : (
                      <Circle size={13} className="text-gray-300 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">{step.detail}</p>

                  {/* Value preview */}
                  {step.value && (
                    <p className="text-gray-600 text-xs mt-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 truncate">
                      {step.value}
                    </p>
                  )}

                  {/* Mini progress bar */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          step.complete
                            ? "bg-gradient-to-r from-violet-400 to-violet-600"
                            : step.pct > 0
                            ? "bg-gradient-to-r from-amber-300 to-amber-500"
                            : "bg-gray-200"
                        }`}
                        style={{ width: `${step.pct}%` }}
                      />
                    </div>
                    <span className={`text-xs tabular-nums flex-shrink-0 ${
                      step.complete ? "text-violet-500" : "text-gray-400"
                    }`} style={{ fontWeight: 500 }}>
                      {step.pct}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Brief preview ──────────────────────────────────────────────────── */}
      {wc > 0 && (
        <div className="mx-5 md:mx-0 mt-4">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2" style={{ fontWeight: 600 }}>
            Brief Preview
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={13} className="text-violet-500" />
              <p className="text-gray-600 text-xs" style={{ fontWeight: 500 }}>
                {wc} words · {description.length} characters
              </p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <div className="mx-5 md:mx-0 mt-5 flex flex-col gap-2.5">
        <button
          onClick={() => navigate("/builder")}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-200"
          style={{ fontWeight: 600 }}
        >
          <Pencil size={15} />
          {wc > 0 ? "Continue Your Brief" : "Start Your Brief"}
          <ArrowRight size={15} />
        </button>

        {overallPct >= 70 && (
          <button
            onClick={() => navigate("/checkout")}
            className="w-full border border-violet-200 bg-violet-50 text-violet-700 py-3 rounded-xl hover:bg-violet-100 transition-all flex items-center justify-center gap-2"
            style={{ fontWeight: 500 }}
          >
            Proceed to Checkout
            <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
