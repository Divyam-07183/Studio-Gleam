import { Cloud, Zap, Shield, BarChart3, Users, ArrowRight, ChevronRight, Check, Star } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Deployment",
    desc: "Ship your apps to production in seconds, not hours. Our CI/CD pipeline handles the heavy lifting.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption, SOC 2 compliance, and automatic security patches keep your data safe.",
    color: "text-black",
    bg: "bg-stone-100",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Monitor performance, usage, and uptime with dashboards that update every second.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Invite unlimited teammates, set permissions, and keep everyone aligned across projects.",
    color: "text-black",
    bg: "bg-stone-100",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    per: "/mo",
    desc: "Perfect for small teams and side projects",
    features: ["3 projects", "10 GB storage", "Basic analytics", "Email support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$89",
    per: "/mo",
    desc: "For scaling teams who need more power",
    features: ["Unlimited projects", "100 GB storage", "Advanced analytics", "Priority support", "Custom domains"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    desc: "For large organizations with complex needs",
    features: ["Everything in Growth", "Dedicated servers", "SLA guarantee", "Onboarding + training"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const navLinks = ["Product", "Pricing", "Docs", "Blog", "Company"];

export function CloudsoftDemo() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Cloud size={16} className="text-white" />
              </div>
              <span className="text-gray-900 text-base" style={{ fontWeight: 700 }}>Cloudsoft</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors" style={{ fontWeight: 500 }}>Login</a>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" style={{ fontWeight: 600 }}>
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-50 to-white pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs px-4 py-1.5 rounded-full mb-7" style={{ fontWeight: 600 }}>
            <Zap size={11} />
            Now with AI-powered auto-scaling — 10x faster deploys
          </div>
          <h1 className="text-gray-900 mb-5 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800 }}>
            Cloud infrastructure that<br />
            <span className="text-blue-600">just works.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Deploy, scale, and monitor your applications with confidence. Cloudsoft handles the complexity so your team can focus on building.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
              Start Free Trial <ArrowRight size={16} />
            </button>
            <button className="bg-stone-100 text-gray-700 px-8 py-3.5 rounded-xl hover:bg-stone-200 transition-colors" style={{ fontWeight: 500 }}>
              Book a Demo
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-5">No credit card required · 14-day free trial · Cancel anytime</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-14">
            {[["99.99%", "Uptime SLA"], ["12,000+", "Teams Trust Us"], ["< 50ms", "Global Latency"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-gray-900 text-xl mb-1" style={{ fontWeight: 800 }}>{val}</p>
                <p className="text-gray-400 text-xs">{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-5xl mx-auto mt-14 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-stone-200">
          <div className="bg-black px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-stone-400 text-xs">app.cloudsoft.io/dashboard</span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1668600372311-66950b110d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
            alt="Cloudsoft Dashboard"
            className="w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-gray-900 mb-3" style={{ fontWeight: 800, fontSize: "2rem" }}>
              Everything you need to ship faster
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Powerful tools built for modern engineering teams — from solo devs to enterprise orgs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="border border-stone-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon size={20} className={f.color} />
                </div>
                <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <a href="#" className="inline-flex items-center gap-1 text-blue-600 text-sm mt-4 hover:text-blue-700" style={{ fontWeight: 500 }}>
                  Learn more <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-blue-500 fill-blue-500" />
            ))}
          </div>
          <blockquote className="text-gray-900 text-lg leading-relaxed mb-6" style={{ fontWeight: 500 }}>
            "Cloudsoft cut our deployment time from 20 minutes to under 45 seconds. Our engineering team has never been this productive. It's the backbone of everything we ship."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1576267446287-7d60713e261d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80"
              alt="testimonial"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>Marcus Chen</p>
              <p className="text-gray-400 text-xs">VP Engineering, Nexora Inc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-gray-900 mb-3" style={{ fontWeight: 800, fontSize: "2rem" }}>Simple, transparent pricing</h2>
            <p className="text-gray-500 text-sm">Pay for what you use. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-7 flex flex-col ${
                  plan.highlight
                    ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200"
                    : "bg-white border-stone-200 hover:border-blue-200 hover:shadow-sm transition-all"
                }`}
              >
                <p className={`text-xs mb-2 tracking-widest uppercase ${plan.highlight ? "text-blue-200" : "text-gray-400"}`} style={{ fontWeight: 600 }}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`${plan.highlight ? "text-white" : "text-gray-900"}`} style={{ fontWeight: 800, fontSize: "2rem" }}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>{plan.per}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>{plan.desc}</p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-blue-500" : "bg-blue-50"}`}>
                        <Check size={10} className={plan.highlight ? "text-white" : "text-blue-600"} />
                      </div>
                      <span className={`text-sm ${plan.highlight ? "text-white" : "text-gray-600"}`}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm transition-colors ${
                    plan.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-black text-white hover:bg-stone-800"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-14 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Cloud size={14} className="text-white" />
            </div>
            <span className="text-white text-sm" style={{ fontWeight: 700 }}>Cloudsoft</span>
          </div>
          <p className="text-stone-500 text-xs text-center">© 2025 Cloudsoft Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Status"].map((link) => (
              <a key={link} href="#" className="text-stone-400 text-xs hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
