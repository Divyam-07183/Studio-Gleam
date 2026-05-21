import { ArrowRight, Clock, Star, Leaf, Wind, Moon, Heart, Instagram, ChevronRight, Phone } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Deep Tissue Massage",
    duration: "60 / 90 min",
    price: "From $95",
    desc: "Release chronic muscle tension and restore balance with our signature deep tissue technique.",
  },
  {
    icon: Wind,
    title: "Breathwork & Meditation",
    duration: "45 min",
    price: "From $65",
    desc: "Guided breathwork sessions to quiet the mind, reduce stress, and ground your nervous system.",
  },
  {
    icon: Moon,
    title: "Sound Bath Therapy",
    duration: "75 min",
    price: "From $85",
    desc: "Immersive healing sound frequencies played live to induce deep relaxation and clarity.",
  },
  {
    icon: Heart,
    title: "Holistic Skin Ritual",
    duration: "90 min",
    price: "From $120",
    desc: "A nourishing facial and body ritual using organic botanicals tailored to your skin's needs.",
  },
];

const testimonials = [
  {
    name: "Emily S.",
    stars: 5,
    text: "Serene Wellness is unlike anything I've experienced. I leave each session feeling truly transformed.",
    img: "https://images.unsplash.com/photo-1646909106850-8c426285ed2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
  },
  {
    name: "James R.",
    stars: 5,
    text: "The sound bath session silenced a week's worth of anxiety in 75 minutes. Absolutely remarkable.",
    img: "https://images.unsplash.com/photo-1774016591273-9bc347fc64b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
  },
];

const navLinks = ["Treatments", "About", "Journal", "Contact"];

export function SereneWellnessDemo() {
  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Top strip */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-2 px-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
          <Phone size={11} />
          +1 (555) 204-8810
        </div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase" style={{ letterSpacing: "0.15em" }}>
          Book your ritual today
        </p>
        <p className="text-neutral-400 text-xs">Mon – Sat  9am – 8pm</p>
      </div>

      {/* Navbar */}
      <nav className="bg-black border-b border-neutral-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-neutral-600 flex items-center justify-center">
                <Leaf size={13} className="text-neutral-300" />
              </div>
              <span className="text-white tracking-widest uppercase text-sm" style={{ fontWeight: 600, letterSpacing: "0.18em" }}>
                Serene
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <button className="border border-neutral-600 text-neutral-300 text-sm px-5 py-2 rounded-full hover:border-white hover:text-white transition-colors" style={{ fontWeight: 500 }}>
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558120985-abcafafcae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400&q=80"
            alt="hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <span className="inline-block border border-neutral-700 text-neutral-400 text-xs px-4 py-1.5 rounded-full mb-7 tracking-widest uppercase" style={{ letterSpacing: "0.12em" }}>
            Wellness Sanctuary · Est. 2018
          </span>
          <h1 className="text-white mb-6 leading-tight max-w-xl" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800 }}>
            Stillness is a<br />
            <span className="text-neutral-400">superpower.</span>
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed mb-10 max-w-md">
            Step into a space where silence heals, touch restores, and every breath is an invitation to come home to yourself.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-colors" style={{ fontWeight: 700 }}>
              Reserve Your Session <ArrowRight size={15} />
            </button>
            <button className="border border-neutral-700 text-neutral-300 px-8 py-3.5 rounded-full hover:border-neutral-500 hover:text-white transition-colors" style={{ fontWeight: 500 }}>
              Explore Treatments
            </button>
          </div>

          {/* Floating card */}
          <div className="absolute bottom-8 right-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 hidden md:flex items-center gap-3 shadow-2xl">
            <div className="flex -space-x-2">
              {["#6b7280", "#9ca3af", "#4b5563"].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div>
              <p className="text-white text-xs" style={{ fontWeight: 600 }}>1,800+ sessions this year</p>
              <p className="text-neutral-400 text-xs">4.9 ★ average rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-neutral-500 text-xs tracking-widest uppercase" style={{ letterSpacing: "0.15em" }}>Our Treatments</span>
              <h2 className="text-white mt-2" style={{ fontWeight: 700, fontSize: "1.8rem" }}>Rituals for every need</h2>
            </div>
            <a href="#" className="text-neutral-400 text-sm flex items-center gap-1 hover:text-white transition-colors" style={{ fontWeight: 500 }}>
              All Treatments <ChevronRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition-all bg-neutral-900/50 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl border border-neutral-700 flex items-center justify-center group-hover:border-neutral-500 transition-colors">
                    <s.icon size={18} className="text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-neutral-500 text-xs border border-neutral-800 px-2.5 py-1 rounded-full">
                    {s.duration}
                  </span>
                </div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300 text-sm" style={{ fontWeight: 600 }}>{s.price}</span>
                  <button className="text-neutral-400 text-xs flex items-center gap-1 hover:text-white transition-colors group-hover:text-white">
                    Book <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + text split */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1646909106850-8c426285ed2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80"
              alt="serene space"
              className="w-full h-80 md:h-[440px] object-cover rounded-2xl opacity-80"
            />
            <div className="absolute bottom-4 left-4 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-neutral-300 fill-neutral-300" />)}
              </div>
              <p className="text-white text-xs" style={{ fontWeight: 600 }}>Certified Wellness Practitioners</p>
              <p className="text-neutral-500 text-xs">7+ years avg. experience</p>
            </div>
          </div>
          <div>
            <span className="text-neutral-500 text-xs tracking-widest uppercase mb-4 block" style={{ letterSpacing: "0.15em" }}>Our Philosophy</span>
            <h2 className="text-white mb-5 leading-snug" style={{ fontWeight: 800, fontSize: "1.9rem" }}>
              Healing happens in<br />the quiet moments.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              We believe true wellness isn't a destination — it's a practice. Every treatment at Serene is designed to reconnect you with your body's innate capacity to heal.
            </p>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8">
              Our practitioners are trained in ancient and modern modalities, combining evidence-based techniques with timeless wisdom to create experiences that are uniquely yours.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[["8+", "Years in Practice"], ["3,200+", "Clients Served"], ["12", "Certified Therapists"], ["100%", "Organic Products"]].map(([val, lbl]) => (
                <div key={lbl} className="border border-neutral-800 rounded-xl p-4">
                  <p className="text-white mb-0.5" style={{ fontWeight: 800, fontSize: "1.3rem" }}>{val}</p>
                  <p className="text-neutral-500 text-xs">{lbl}</p>
                </div>
              ))}
            </div>
            <button className="bg-white text-black px-7 py-3 rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-colors" style={{ fontWeight: 700 }}>
              Meet Our Team <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-center mb-10" style={{ fontWeight: 700, fontSize: "1.5rem" }}>What our guests say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={13} className="text-neutral-300 fill-neutral-300" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover opacity-80" />
                  <p className="text-neutral-400 text-sm" style={{ fontWeight: 600 }}>{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full border border-neutral-700 flex items-center justify-center mx-auto mb-7">
            <Leaf size={22} className="text-neutral-400" />
          </div>
          <h2 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "2rem" }}>
            Begin your journey inward.
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed mb-9 max-w-md mx-auto">
            Reserve your session today and take the first step toward a more grounded, restored version of yourself.
          </p>
          <button className="bg-white text-black px-10 py-4 rounded-full text-base hover:bg-neutral-200 transition-colors" style={{ fontWeight: 700 }}>
            Book a Treatment
          </button>
          <p className="text-neutral-600 text-xs mt-5">No prepayment required · Free cancellation 24h in advance</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-neutral-700 flex items-center justify-center">
              <Leaf size={11} className="text-neutral-400" />
            </div>
            <span className="text-neutral-400 text-sm tracking-widest uppercase" style={{ fontWeight: 600 }}>Serene Wellness</span>
          </div>
          <p className="text-neutral-600 text-xs">© 2025 Serene Wellness. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Instagram size={15} className="text-neutral-600 hover:text-neutral-400 cursor-pointer transition-colors" />
            <a href="#" className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors">Privacy</a>
            <a href="#" className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
