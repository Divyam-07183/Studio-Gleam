import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ExternalLink, Maximize2, ChevronDown, ChevronUp, Sparkles, X, Monitor, Smartphone } from "lucide-react";
import { NeonBoutiqueDemo } from "../demos/NeonBoutiqueDemo";
import { CloudsoftDemo } from "../demos/CloudsoftDemo";
import { SereneWellnessDemo } from "../demos/SereneWellnessDemo";

const filterTabs = ["All", "E-commerce", "SaaS", "Wellness"];

const projects = [
  {
    id: 1,
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Neon Boutique — Modern e-commerce",
    desc: "A mobile-first storefront redesign focused on conversion and checkout speed.",
    palette: ["#ffffff", "#38bdf8", "#0ea5e9", "#e0f2fe"],
    paletteLabel: "White & Sky Blue",
    stats: [
      { label: "+120% traffic", highlight: true },
      { label: "3x checkout rate", highlight: false },
    ],
    problem: "Legacy theme with slow mobile checkout and low average order value.",
    approach: "Streamlined product cards, 1-page checkout, and prioritized critical CSS to shave load time.",
    results: "120% increase in organic sessions, 3x faster checkouts, and a 22% rise in AOV within 90 days.",
    quote: '"StudioGleam transformed our mobile store — conversion improvements were immediate and measurable." — Olivia Ramirez, Head of Growth',
    demoKey: "neon",
  },
  {
    id: 2,
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1668600372311-66950b110d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "CloudSoft — SaaS conversion lift",
    desc: "Redesigned signup funnel and in-product onboarding for improved activation.",
    palette: ["#ffffff", "#2563eb", "#000000", "#d6cfc7"],
    paletteLabel: "White · Blue · Black · Beige",
    stats: [
      { label: "+48% trials", highlight: true },
      { label: "+30% MRR", highlight: false },
    ],
    problem: "High drop-off rates during signup and confusing first-run experience.",
    approach: "Simplified 3-step onboarding, progressive disclosure, and contextual tooltips.",
    results: "48% more trial signups and 30% increase in MRR within two quarters.",
    quote: '"The new onboarding flow completely transformed our activation rate." — Jake Morris, CEO',
    demoKey: "cloud",
  },
  {
    id: 3,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1558120985-abcafafcae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Serene Wellness — Appointment growth",
    desc: "Content strategy and booking flow rework to surface top services.",
    palette: ["#000000", "#171717", "#525252", "#a3a3a3"],
    paletteLabel: "Black & Gray",
    stats: [
      { label: "+72% bookings", highlight: true },
      { label: "4.8 client NPS", highlight: false },
    ],
    problem: "Cluttered homepage made it hard to find and book top wellness services.",
    approach: "Simplified navigation, featured service cards, and a streamlined booking widget.",
    results: "72% increase in bookings and a 4.8 client NPS score post-launch.",
    quote: '"Our clients love the new booking experience — it\'s clean, fast, and beautiful." — Sara Chen, Founder',
    demoKey: "serene",
  },
];

const demoComponents: Record<string, React.ReactNode> = {
  neon: <NeonBoutiqueDemo />,
  cloud: <CloudsoftDemo />,
  serene: <SereneWellnessDemo />,
};

const demoTitles: Record<string, string> = {
  neon: "Neon Boutique",
  cloud: "Cloudsoft",
  serene: "Serene Wellness",
};

export function Portfolio() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState(false);

  const filtered = projects.filter((p) => {
    const matchCat = activeFilter === "All" || p.category === activeFilter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openDemo = (key: string) => {
    setActiveDemo(key);
    setMobileView(false);
  };
  const closeDemo = () => setActiveDemo(null);

  return (
    <div className="flex flex-col">

      {/* ── Full-screen Demo Modal ── */}
      {activeDemo && (
        <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900">
          {/* Modal toolbar */}
          <div className="flex items-center justify-between bg-neutral-900 border-b border-neutral-800 px-4 py-2.5 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              {/* URL bar */}
              <div className="hidden sm:flex items-center bg-neutral-800 rounded-lg px-3 py-1.5 gap-2 min-w-48">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-neutral-400 text-xs truncate">
                  {activeDemo === "neon" && "neonboutique.com"}
                  {activeDemo === "cloud" && "cloudsoft.io"}
                  {activeDemo === "serene" && "serenewellness.co"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-xs" style={{ fontWeight: 600 }}>
              <Sparkles size={12} className="text-violet-400" />
              <span className="hidden sm:inline">{demoTitles[activeDemo]} — Live Preview</span>
              <span className="sm:hidden">{demoTitles[activeDemo]}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Viewport toggle */}
              <button
                onClick={() => setMobileView(false)}
                className={`p-1.5 rounded-md transition-colors ${!mobileView ? "bg-neutral-700 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setMobileView(true)}
                className={`p-1.5 rounded-md transition-colors ${mobileView ? "bg-neutral-700 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                <Smartphone size={14} />
              </button>
              <div className="w-px h-5 bg-neutral-700 mx-1" />
              <button
                onClick={closeDemo}
                className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Demo content */}
          <div className="flex-1 overflow-auto bg-neutral-800 flex items-start justify-center py-4">
            {mobileView ? (
              <div className="relative flex flex-col" style={{ width: 390, minHeight: "100%" }}>
                {/* Phone frame */}
                <div className="bg-neutral-900 rounded-t-3xl px-3 pt-3 pb-1 flex items-center justify-center">
                  <div className="w-24 h-1.5 bg-neutral-700 rounded-full" />
                </div>
                <div className="bg-white flex-1 overflow-auto shadow-2xl" style={{ maxHeight: "calc(100vh - 130px)", borderRadius: "0 0 24px 24px" }}>
                  {demoComponents[activeDemo]}
                </div>
              </div>
            ) : (
              <div
                className="bg-white shadow-2xl overflow-auto"
                style={{ width: "100%", maxWidth: 1200, minHeight: "100%", borderRadius: 8 }}
              >
                {demoComponents[activeDemo]}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile-only header ── */}
      <header className="md:hidden flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <span className="text-white text-sm">💎</span>
          </div>
          <span className="text-gray-900" style={{ fontWeight: 600 }}>StudioGleam</span>
        </div>
      </header>

      {/* ── Title ── */}
      <div className="px-5 md:px-0 pt-4 pb-4 md:pb-5">
        <h1 className="text-gray-900 mb-1.5" style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 700 }}>
          Portfolio & Case Studies
        </h1>
        <p className="text-gray-500 text-sm">
          Curated websites and outcomes — explore results and view live work.
        </p>
      </div>

      {/* ── Filter tabs + Search ── */}
      <div className="px-5 md:px-0 mb-5 md:flex md:items-center md:gap-4">
        <div className="flex gap-2 mb-3 md:mb-0">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeFilter === tab
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:border-violet-300 focus-within:bg-white transition-all md:flex-1">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, industries..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* ── Projects grid ── */}
      <div className="px-5 md:px-0 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden flex-shrink-0 group cursor-pointer" onClick={() => openDemo(project.demoKey)}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs px-4 py-2 rounded-full flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <Monitor size={13} /> Open Live Preview
                  </div>
                </div>
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-600 text-xs px-2.5 py-1 rounded-full">
                  {project.category}
                </span>

                {/* Colour palette dots */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  {project.palette.map((color, ci) => (
                    <div
                      key={ci}
                      className="w-4 h-4 rounded-full border-2 border-white/60 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  <span className="text-white/80 text-xs ml-1 drop-shadow" style={{ fontWeight: 500 }}>
                    {project.paletteLabel}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-gray-900 text-sm leading-snug" style={{ fontWeight: 600 }}>
                    {project.title}
                  </h3>
                  <button
                    onClick={() => openDemo(project.demoKey)}
                    className="text-gray-400 hover:text-violet-500 transition-colors flex-shrink-0 mt-0.5"
                    title="Open demo"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{project.desc}</p>

                {/* Stats */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.stats.map((stat, j) => (
                    <span
                      key={j}
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        stat.highlight
                          ? "bg-violet-100 text-violet-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </span>
                  ))}
                  <button
                    onClick={() => openDemo(project.demoKey)}
                    className="ml-auto text-violet-600 text-xs flex items-center gap-1 hover:text-violet-700 transition-colors"
                  >
                    View Live <ExternalLink size={11} />
                  </button>
                </div>

                {/* Expand / collapse */}
                <button
                  onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                  className="w-full mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expanded === project.id ? (
                    <>Less <ChevronUp size={13} /></>
                  ) : (
                    <>Case Study Details <ChevronDown size={13} /></>
                  )}
                </button>

                {/* Expanded content */}
                {expanded === project.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3">
                    {[
                      { label: "Problem", content: project.problem },
                      { label: "Approach", content: project.approach },
                      { label: "Results", content: project.results },
                    ].map(({ label, content }) => (
                      <div key={label}>
                        <p className="text-gray-700 text-xs mb-1" style={{ fontWeight: 600 }}>{label}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{content}</p>
                      </div>
                    ))}

                    <div className="bg-gray-50 rounded-xl p-3 mt-1">
                      <p className="text-gray-600 text-xs leading-relaxed italic">{project.quote}</p>
                    </div>

                    {/* Demo preview strip */}
                    <div
                      className="relative rounded-xl overflow-hidden h-28 cursor-pointer group"
                      onClick={() => openDemo(project.demoKey)}
                    >
                      <img src={project.image} alt="demo preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs px-4 py-2 rounded-full" style={{ fontWeight: 600 }}>
                          <Monitor size={12} /> Launch Demo Website
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/builder")}
                      className="w-full bg-violet-600 text-white text-sm py-2.5 rounded-xl hover:bg-violet-700 transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      Start a similar project
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Start Building CTA ── */}
      <div className="px-5 md:px-0 mb-8">
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-5 md:p-8 flex flex-col md:flex-row md:items-center md:gap-8 shadow-lg shadow-violet-200">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:gap-5 mb-4 md:mb-0 flex-1">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-3 md:mb-0 flex-shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-base mb-1" style={{ fontWeight: 700 }}>Ready to build yours?</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                Tell us about your project and we'll craft a tailored design solution for you.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/builder")}
            className="w-full md:w-auto bg-white text-violet-700 py-3 md:px-8 rounded-xl hover:bg-violet-50 transition-colors flex items-center justify-center gap-2 flex-shrink-0"
            style={{ fontWeight: 600 }}
          >
            <Sparkles size={15} />
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
}
