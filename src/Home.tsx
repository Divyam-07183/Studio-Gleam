import { useNavigate } from "react-router";
import { ChevronRight, Zap, BarChart2, Layers, User, ArrowRight } from "lucide-react";

const services = [
  {
    emoji: "🛍️",
    title: "E-commerce",
    desc: "High-converting storefronts with optimised checkout and product pages.",
    color: "bg-amber-50 border-amber-100",
    textColor: "text-amber-700",
  },
  {
    emoji: "🚀",
    title: "SaaS Platforms",
    desc: "Onboarding flows and dashboards designed to activate and retain users.",
    color: "bg-violet-50 border-violet-100",
    textColor: "text-violet-700",
  },
  {
    emoji: "🌿",
    title: "Wellness & Health",
    desc: "Calm, trustworthy designs for wellness brands that build lasting loyalty.",
    color: "bg-green-50 border-green-100",
    textColor: "text-green-700",
  },
];

const features = [
  { icon: Zap, label: "Fast delivery", desc: "1–2 days turnaround" },
  { icon: BarChart2, label: "Results-focused", desc: "Built to convert" },
  { icon: Layers, label: "Full-stack design", desc: "UX to production" },
  { icon: User, label: "Personal experience", desc: "Dedicated to your vision" },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">

      {/* ── Mobile-only header ── */}
      <header className="md:hidden flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <span className="text-white text-sm">💎</span>
          </div>
          <span className="text-gray-900" style={{ fontWeight: 600 }}>StudioGleam</span>
        </div>
      </header>

      {/* ── Desktop page title ── */}
      <div className="hidden md:block pt-2 pb-1">
        <p className="text-gray-400 text-sm">Welcome back 👋</p>
      </div>

      {/* ── Hero ── */}
      <div className="px-5 md:px-0 pt-6 md:pt-4 pb-4 md:flex md:items-center md:gap-10 lg:gap-16">
        {/* Text */}
        <div className="flex-1">
          <h1
            className="text-gray-900 leading-tight mb-3"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 700 }}
          >
            Premium web design<br className="hidden md:block" /> that converts
          </h1>
          <p className="text-gray-500 leading-relaxed mb-6 max-w-lg" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
            <strong style={{ fontWeight: 900, color: "#7c3aed" }}>Beautiful interfaces, measurable results — delivered on time for startups and growing brands.</strong>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/builder")}
              className="bg-violet-600 text-white text-sm px-5 py-2.5 rounded-full hover:bg-violet-700 transition-all shadow-md shadow-violet-200 flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              Start a Project <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate("/portfolio")}
              className="text-violet-600 text-sm flex items-center gap-1 hover:gap-2 transition-all"
              style={{ fontWeight: 500 }}
            >
              See Work <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Decorative card — visible on all viewports */}
        <div className="hidden md:flex w-56 lg:w-72 h-44 lg:h-52 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 flex-col items-center justify-center shadow-xl flex-shrink-0 gap-3">
          <span className="text-5xl">💎</span>
          <div className="text-center">
            <p className="text-white text-sm" style={{ fontWeight: 700 }}>StudioGleam</p>
            <p className="text-white/60 text-xs">Premium web design</p>
          </div>
        </div>
      </div>

      {/* ── Mobile gem ── */}
      <div className="md:hidden px-5 pb-4 flex gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 flex items-center justify-center shadow-lg flex-shrink-0 ml-auto">
          <span className="text-3xl">💎</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-gray-100 mx-5 md:mx-0 my-1" />

      {/* ── Services grid ── */}
      <div className="px-5 md:px-0 pb-4">
        <h2 className="text-gray-800 mb-3 md:mb-4" style={{ fontWeight: 600, fontSize: "1rem" }}>
          What we build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {services.map(({ emoji, title, desc, color, textColor }) => (
            <div
              key={title}
              className={`flex flex-col gap-2 p-4 rounded-2xl border ${color} cursor-pointer hover:shadow-md transition-all`}
              onClick={() => navigate("/portfolio")}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{emoji}</span>
                <p className={`text-sm ${textColor}`} style={{ fontWeight: 600 }}>{title}</p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              <span className={`text-xs flex items-center gap-1 ${textColor}`} style={{ fontWeight: 500 }}>
                View case studies <ChevronRight size={11} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Feature highlights (tablet/desktop) ── */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 px-0 pb-4">
        {features.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-violet-600" />
            </div>
            <div>
              <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{label}</p>
              <p className="text-gray-400 text-xs">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Trusted banner ── */}
      <div className="mx-5 md:mx-0 mb-5 rounded-2xl bg-violet-50 border border-violet-100 p-4 flex items-center justify-between">
        <div>
          <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>Trusted by product teams</p>
          <p className="text-gray-500 text-xs mt-0.5">Strategic design partnership for Series A–C startups</p>
        </div>
        <button
          onClick={() => navigate("/portfolio")}
          className="text-violet-600 text-sm whitespace-nowrap hover:text-violet-700 transition-colors flex items-center gap-1"
          style={{ fontWeight: 500 }}
        >
          Learn More <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}