import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Check, Lightbulb, AlertCircle, Mail } from "lucide-react";
import { useBuilder } from "../../context/BuilderContext";

const MAX_WORDS = 700;

const promptSuggestions = [
  "What's the main goal of your website?",
  "Who is your target audience?",
  "What pages do you need?",
  "Any design style or color preferences?",
  "Do you have existing branding?",
  "Any websites you admire?",
];

const pageOptions = [
  { id: "home", label: "Home", desc: "", priceNote: "" },
  { id: "about", label: "About", desc: "", priceNote: "" },
  { id: "portfolio", label: "Portfolio", desc: "", priceNote: "" },
  { id: "contact", label: "Contact", desc: "", priceNote: "" },
  { id: "blog", label: "Blog", desc: "CMS-powered posts and categories", priceNote: "" },
  { id: "shop", label: "Shop", desc: "Product pages, cart and checkout", priceNote: "" },
  { id: "saas", label: "SaaS Dashboard", desc: "Full dashboard UI with metrics & data tables", priceNote: "$4,000–$12,000" },
];

const addons = [
  { id: "seo", label: "SEO Booster", desc: "Technical SEO setup and sitemap", price: 300 },
  { id: "analytics", label: "Analytics Setup", desc: "Integrate tracking and dashboards", price: 200 },
  { id: "copy", label: "Copywriting Pack", desc: "Homepage + 3 key pages", price: 500 },
  { id: "hosting", label: "Premium Hosting", desc: "Managed hosting with CDN", price: 150 },
];

const timelines = [
  { id: "2w", label: "1-2 days", sub: "Express" },
  { id: "4w", label: "2-3 days", sub: "Standard" },
  { id: "8w", label: "4-5 days", sub: "Extended" },
];

const budgetRanges: Record<string, { min: number; max: number }> = {
  "2w": { min: 3000, max: 12000 },
  "4w": { min: 2500, max: 10000 },
  "8w": { min: 1500, max: 8000 },
};

const basePrice = 1500;

export function Builder() {
  const navigate = useNavigate();
  const {
    description, setDescription,
    selectedPages, setSelectedPages,
    selectedAddons, setSelectedAddons,
    selectedTimeline, setSelectedTimeline,
    budgetSlider, setBudgetSlider,
    email, setEmail,
  } = useBuilder();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [focused, setFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, pct));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setBudgetSlider(Math.round(getPercentFromPointer(e.clientX)));
  }, [getPercentFromPointer]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setBudgetSlider(Math.round(getPercentFromPointer(e.clientX)));
  }, [isDragging, getPercentFromPointer]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }, []);
  const handleSubmit = async () => {
    // Validate email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setIsSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xqewkvyq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          description: description,
          pages: selectedPages.join(", "),
          addons: addonLabels.join(", "),
          timeline: selectedTimeline,
          budget: estimatedBudget,
        }),
      });
      setSubmitted(true);
      navigate("/checkout");
    } catch (error) {
      console.error("Form error:", error);
      navigate("/checkout");
    }
    setIsSubmitting(false);
  };
  const wordCount = description.trim() === "" ? 0 : description.trim().split(/\s+/).length;
  const charCount = description.length;
  const wordsLeft = MAX_WORDS - wordCount;
  const isOverLimit = wordCount > MAX_WORDS;
  const isGoodLength = wordCount >= 80;

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const appendSuggestion = (suggestion: string) => {
    const trimmed = description.trimEnd();
    if (trimmed === "") setDescription(suggestion + " ");
    else setDescription(trimmed + " " + suggestion + " ");
  };

  const togglePage = (id: string) => {
    setSelectedPages(
      selectedPages.includes(id)
        ? selectedPages.filter((p) => p !== id)
        : [...selectedPages, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(
      selectedAddons.includes(id)
        ? selectedAddons.filter((a) => a !== id)
        : [...selectedAddons, id]
    );
  };

  const addonTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const totalPrice = basePrice + addonTotal;

  const minBudget = budgetRanges[selectedTimeline]?.min || 1500;
  const maxBudget = budgetRanges[selectedTimeline]?.max || 12000;
  const estimatedBudget =
    Math.round(((budgetSlider / 100) * (maxBudget - minBudget) + minBudget) / 100) * 100;

  const addonLabels = addons
    .filter((a) => selectedAddons.includes(a.id))
    .map((a) => a.label.split(" ")[0]);

  return (
    <div className="flex flex-col">

      {/* ─ Header ── */}
      <header className="flex items-center justify-between px-5 md:px-0 pt-5 md:pt-2 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          {/* Logo — mobile only */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <span className="text-white text-xs">✏️</span>
            </div>
            <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>StudioGleam</span>
          </div>
          {/* Page title — tablet/desktop only */}
          <span className="hidden md:block text-gray-900 text-sm" style={{ fontWeight: 600 }}>
            Project Builder
          </span>
        </div>
        <span className="text-violet-600 text-sm">Step 1 of 4</span>
      </header>

      {/* ── Two-column layout on lg+ ── */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

        {/* ══ LEFT COLUMN: Description ══ */}
        <div className="lg:sticky lg:top-6">

          {/* Section — Describe your website */}
          <div className="px-5 md:px-0 pt-5 pb-2">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-lg">✍️</span>
              </div>
              <div>
                <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  Describe your website
                </h2>
                <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                  Tell us everything — goals, audience, pages, style, and inspiration. The more detail you share, the better we can build it.
                </p>
              </div>
            </div>

            {/* Prompt suggestions */}
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb size={12} className="text-amber-500" />
                <span className="text-amber-600 text-xs" style={{ fontWeight: 500 }}>
                  Prompt suggestions — tap to add
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {promptSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => appendSuggestion(s)}
                    className="text-xs bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-1 rounded-full hover:bg-amber-100 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div
              className={`relative rounded-2xl border transition-all duration-200 ${
                isOverLimit
                  ? "border-red-300 bg-red-50"
                  : focused
                  ? "border-violet-300 bg-white shadow-md shadow-violet-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={`Start describing your vision here...\n\nFor example: "I'm building an e-commerce store for handcrafted jewelry targeting women aged 25–45. I want a minimal, elegant design with warm tones..."`}
                className={`w-full px-4 pt-4 pb-12 text-sm leading-relaxed outline-none bg-transparent resize-none min-h-64 lg:min-h-80 transition-colors ${
                  isOverLimit ? "text-red-700 placeholder-red-300" : "text-gray-700 placeholder-gray-400"
                }`}
                style={{ lineHeight: "1.75" }}
              />

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 flex items-center justify-between border-t border-gray-100 bg-white/80 backdrop-blur-sm rounded-b-2xl">
                <div className="flex items-center gap-3">
                  {isOverLimit ? (
                    <div className="flex items-center gap-1 text-red-500 text-xs">
                      <AlertCircle size={12} />
                      <span>{Math.abs(wordsLeft)} words over limit</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">{wordsLeft} words left</span>
                  )}
                  <span className="text-gray-300 text-xs">·</span>
                  <span className="text-gray-400 text-xs">{charCount} chars</span>
                </div>
                <div className="flex items-center gap-2">
                  {isGoodLength && !isOverLimit && (
                    <span className="text-green-500 text-xs flex items-center gap-1">
                      <Check size={11} /> Good length
                    </span>
                  )}
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOverLimit
                          ? "bg-red-400"
                          : wordCount >= 400
                          ? "bg-green-400"
                          : wordCount >= 80
                          ? "bg-violet-400"
                          : "bg-gray-300"
                      }`}
                      style={{ width: `${Math.min((wordCount / MAX_WORDS) * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs tabular-nums ${isOverLimit ? "text-red-500" : "text-gray-400"}`}>
                    {wordCount}/{MAX_WORDS}
                  </span>
                </div>
              </div>
            </div>

            {/* Quality tips */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { emoji: "🎯", label: "Purpose", hint: wordCount > 0 ? "✓" : "Add goal" },
                { emoji: "👥", label: "Audience", hint: wordCount > 30 ? "✓" : "Who visits?" },
                { emoji: "🎨", label: "Style", hint: wordCount > 60 ? "✓" : "Any refs?" },
              ].map(({ emoji, label, hint }) => (
                <div
                  key={label}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all ${
                    hint === "✓" ? "border-green-200 bg-green-50" : "border-gray-100 bg-white"
                  }`}
                >
                  <span className="text-base mb-0.5">{emoji}</span>
                  <span className="text-gray-700 text-xs" style={{ fontWeight: 500 }}>{label}</span>
                  <span className={`text-xs mt-0.5 ${hint === "✓" ? "text-green-500" : "text-gray-400"}`}>
                    {hint}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current brief bar */}
          <div className="mx-5 md:mx-0 my-4 bg-gray-900 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-3">
              <p className="text-gray-400 text-xs mb-0.5">Your brief</p>
              <p className="text-white text-sm truncate">
                {description.trim() === ""
                  ? "No description yet..."
                  : description.trim().slice(0, 55) + (description.length > 55 ? "…" : "")}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">Includes basic setup & 1 month support</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-violet-400 text-xs">Starting at</p>
              <p className="text-white" style={{ fontWeight: 700 }}>${totalPrice.toLocaleString()}</p>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-1.5 bg-violet-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-violet-700 transition-colors"
              >
                {isSubmitting ? "Sending..." : submitted ? "Sent! ✓" : "Proceed →"}
              </button>
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN: Config panels ══ */}
        <div className="flex flex-col gap-5 px-5 md:px-0 pb-2">

          {/* Pages & Features */}
          <div>
            <h2 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>Pages & Features</h2>
            <p className="text-gray-400 text-xs mb-3">Pick the pages and functionality you need</p>
            <div className="grid grid-cols-2 gap-2.5">
              {pageOptions.map((page) => {
                const selected = selectedPages.includes(page.id);
                return (
                  <button
                    key={page.id}
                    onClick={() => togglePage(page.id)}
                    className={`flex items-start gap-2 p-3 rounded-xl border text-left transition-all ${
                      selected
                        ? "border-violet-200 bg-violet-50"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    } ${page.desc ? "col-span-2" : ""}`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        selected ? "bg-violet-600 border-violet-600" : "border-gray-300"
                      }`}
                    >
                      {selected && <Check size={10} className="text-white" />}
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm" style={{ fontWeight: 500 }}>{page.label}</p>
                      {page.desc && <p className="text-gray-400 text-xs mt-0.5">{page.desc}</p>}
                      {page.priceNote && (
                        <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full border ${
                          selected
                            ? "bg-violet-100 border-violet-200 text-violet-700"
                            : "bg-blue-50 border-blue-100 text-blue-600"
                        }`} style={{ fontWeight: 500 }}>
                          {page.priceNote}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h2 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>Add-ons</h2>
            <p className="text-gray-400 text-xs mb-3">Enhance your site with optional services</p>
            <div className="flex flex-col gap-2">
              {addons.map((addon) => {
                const selected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      selected ? "border-violet-200 bg-violet-50" : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm" style={{ fontWeight: 500 }}>{addon.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{addon.desc}</p>
                    </div>
                    <span className="text-gray-400 text-xs mr-2">+${addon.price}</span>
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        selected ? "bg-violet-600 border-violet-600" : "border-gray-300"
                      }`}
                    >
                      {selected && <Check size={10} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>Timeline & Budget</h2>
            <p className="text-gray-400 text-xs mb-4">Choose delivery speed and projected budget</p>

            <div className="flex gap-2 mb-5">
              {timelines.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTimeline(t.id)}
                  className={`flex-1 py-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeline === t.id
                      ? "border-violet-300 bg-violet-50"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <p className="text-gray-900 text-xs" style={{ fontWeight: 600 }}>{t.label}</p>
                  <p className="text-gray-400 text-xs">{t.sub}</p>
                </button>
              ))}
            </div>

            <p className="text-gray-500 text-xs mb-3">Estimated budget</p>
            <div className="relative mb-2 py-3 -my-3">
              <div
                ref={trackRef}
                className="relative w-full h-2 bg-gray-100 rounded-full cursor-pointer select-none touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <div
                  className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full"
                  style={{ width: `${budgetSlider}%` }}
                />
                <div
                  className={`absolute top-1/2 w-5 h-5 bg-white border-2 border-violet-600 rounded-full shadow-md transition-shadow ${
                    isDragging ? "shadow-lg shadow-violet-300 scale-110" : ""
                  }`}
                  style={{
                    left: `calc(${budgetSlider / 100} * (100% - 20px))`,
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-3 mb-1">
              <span>${minBudget.toLocaleString()}</span>
              <span className="text-violet-600" style={{ fontWeight: 600 }}>
                ${estimatedBudget.toLocaleString()}
              </span>
              <span>${maxBudget.toLocaleString()}</span>
            </div>
            {/* Range hint per timeline */}
            <p className="text-gray-400 text-xs mt-2 text-center">
              {selectedTimeline === "2w" && "Express range: $3,000 – $12,000"}
              {selectedTimeline === "4w" && "Standard range: $2,500 – $10,000"}
              {selectedTimeline === "8w" && "Extended range: $1,500 – $8,000"}
            </p>
          </div>

          {/* ── Email capture ── */}
          <div className="mx-5 md:mx-0 mb-4">
            <label className="flex items-center gap-1.5 text-gray-700 text-xs mb-2" style={{ fontWeight: 600 }}>
              <Mail size={13} className="text-violet-500" />
              Your email address
              <span className="text-red-400 ml-0.5">*</span>
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-all ${
                emailError
                  ? "border-red-300 bg-red-50"
                  : email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-gray-50 focus-within:border-violet-300 focus-within:bg-white"
              }`}
            >
              <Mail size={14} className={emailError ? "text-red-400" : "text-gray-400"} />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <Check size={14} className="text-green-500 flex-shrink-0" />
              )}
            </div>
            {emailError && (
              <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                <AlertCircle size={11} /> {emailError}
              </p>
            )}
            <p className="text-gray-400 text-xs mt-1.5">
              We'll send your project summary and quote to this address.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-gray-500 text-xs">Summary</p>
                <p className="text-gray-600 text-xs mt-0.5">
                  {selectedPages.join(", ")} · {wordCount} word brief
                </p>
              </div>
              <p className="text-violet-600" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                ${totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["Brief", ...addonLabels].map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    i === 0
                      ? "bg-violet-100 text-violet-700 border border-violet-200"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 transition-colors"
              style={{ fontWeight: 600 }}
            >
              Continue to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}