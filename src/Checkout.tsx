import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronDown, ChevronUp, Check, AlertTriangle } from "lucide-react";

const orderItems = [
  { label: "Priority Launch", amount: "+$400" },
  { label: "Extra Revisions (5)", amount: "+$120" },
  { label: "Content Migration", amount: "+$250" },
  { label: "SEO Setup", amount: "+$180" },
];

const faqs = [
  {
    q: "How do I transfer my payment?",
    a: "Our team will reach out to you via email with the organisation's full bank account details and transfer instructions shortly after receiving your project brief.",
  },
  {
    q: "How long until the team contacts me?",
    a: "We aim to get in touch within a few minutes of receiving your information. Please check your inbox (and spam folder) for a message from StudioGleam.",
  },
  {
    q: "What is the refund policy?",
    a: "A full refund is available within 30 days if we don't meet the agreed milestones. All terms will be confirmed in writing before any work begins.",
  },
  {
    q: "Is my information secure?",
    a: "Absolutely. All data submitted through our builder is handled with strict confidentiality and is never shared with third parties.",
  },
  {
    q: "How do I request changes or report a bug on my webpage?",
    a: "You can contact us directly at our email address to request any changes to your webpage or to report a bug. Simply describe the issue or update you need and our team will get back to you promptly to resolve it.",
  },
];

export function Checkout() {
  const navigate = useNavigate();
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const subtotal = 3200;
  const addons = 400 + 120 + 250 + 180;
  const discount = promoApplied ? -640 : 0;
  const total = subtotal + addons + discount;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-5 md:px-6 lg:px-8 pt-5 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/builder")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <span className="text-white text-xs">💎</span>
            </div>
            <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>StudioGleam</span>
          </div>
          <span className="hidden md:block text-gray-900 text-sm" style={{ fontWeight: 600 }}>
            Checkout
          </span>
        </div>
        <span className="text-violet-600 text-sm">Step 3 of 3</span>
      </header>

      {/* ── Body ── */}
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-5 md:py-7 max-w-5xl mx-auto w-full">

        {/* ── Notice Banner ── */}
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mt-0.5">
            <AlertTriangle size={20} className="text-amber-500" />
          </div>
          <div>
            <p className="text-amber-800 mb-1" style={{ fontWeight: 700 }}>
              Payment Notice
            </p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Sorry for the inconvenience, but our payment window is not fully functional at this time.
              We have received your information and you will need to transfer your payment directly into
              the organisation's account externally. Our team will be in touch with you within a few minutes.
            </p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* ── LEFT: Order summary ── */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-4" style={{ fontWeight: 600 }}>Order Summary</h2>

              <div className="flex items-start justify-between pb-4 mb-4 border-b border-gray-100">
                <div>
                  <p className="text-gray-900" style={{ fontWeight: 600 }}>Pro Website Package</p>
                  <p className="text-gray-400 text-xs mt-1">Full site build · 8 pages · 2 months delivery</p>
                </div>
                <p className="text-gray-900" style={{ fontWeight: 700 }}>$3,200</p>
              </div>

              <div className="flex flex-col gap-2.5 pb-4 mb-4 border-b border-gray-100">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <span className="text-gray-700 text-sm">{item.amount}</span>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mb-4">
                <input
                  value={promoApplied ? "" : promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={promoApplied ? "Code applied ✓" : "Promo code"}
                  className={`flex-1 text-sm px-4 py-2.5 rounded-xl border outline-none transition-all ${
                    promoApplied
                      ? "bg-green-50 border-green-200 text-green-700 placeholder-green-400"
                      : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-violet-300 focus:bg-white"
                  }`}
                  disabled={promoApplied}
                />
                <button
                  onClick={() => {
                    if (promoApplied) {
                      setPromoApplied(false);
                    } else {
                      setPromoApplied(true);
                      setPromoInput("");
                    }
                  }}
                  className="bg-violet-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-violet-700 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {promoApplied ? "Remove" : "Apply"}
                </button>
              </div>

              {promoApplied && (
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-green-600 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={10} className="text-green-600" />
                    </span>
                    StudioG20 (Applied)
                  </span>
                  <span className="text-green-600" style={{ fontWeight: 600 }}>− $640</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-gray-700 text-sm">Total due</span>
                <span className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  ${total.toLocaleString()}
                </span>
              </div>

              {/* Transfer instructions reminder */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-3 bg-violet-50 rounded-xl p-4">
                <span className="text-xl">📨</span>
                <div>
                  <p className="text-violet-800 text-sm" style={{ fontWeight: 600 }}>What happens next?</p>
                  <p className="text-violet-600 text-xs mt-0.5 leading-relaxed">
                    Our team will email you with the account details needed to complete your transfer. No action is required from you right now — just keep an eye on your inbox.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ — mobile */}
            <div className="lg:hidden bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-4" style={{ fontWeight: 600 }}>Frequently Asked</h2>
              <div className="flex flex-col divide-y divide-gray-100">
                {faqs.map((faq, i) => (
                  <div key={i} className="py-3">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <p className="text-gray-800 text-sm pr-3" style={{ fontWeight: 500 }}>{faq.q}</p>
                      {expandedFaq === i
                        ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" />
                        : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />
                      }
                    </button>
                    {expandedFaq === i && (
                      <p className="text-gray-500 text-xs leading-relaxed mt-2">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: FAQ desktop ── */}
          <div className="hidden lg:block lg:w-96 mt-0 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-4" style={{ fontWeight: 600 }}>Frequently Asked</h2>
              <div className="flex flex-col divide-y divide-gray-100">
                {faqs.map((faq, i) => (
                  <div key={i} className="py-3">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <p className="text-gray-800 text-sm pr-3" style={{ fontWeight: 500 }}>{faq.q}</p>
                      {expandedFaq === i
                        ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" />
                        : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />
                      }
                    </button>
                    {expandedFaq === i && (
                      <p className="text-gray-500 text-xs leading-relaxed mt-2">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}