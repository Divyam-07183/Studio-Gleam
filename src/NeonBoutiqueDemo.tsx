import { ShoppingBag, Search, Heart, Star, ArrowRight, Instagram, Twitter, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Cloud Linen Dress",
    price: "$148",
    tag: "New Arrival",
    img: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: 2,
    name: "Breeze Silk Blouse",
    price: "$92",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1600721391708-e1a5bd8bb328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: 3,
    name: "Azure Wrap Skirt",
    price: "$76",
    tag: "Limited",
    img: "https://images.unsplash.com/photo-1667242050251-8a4eee25141c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
];

const categories = ["All", "Dresses", "Tops", "Bottoms", "Accessories"];
const navLinks = ["Shop", "Collections", "Lookbook", "About"];

export function NeonBoutiqueDemo() {
  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Announcement banner */}
      <div className="bg-sky-500 text-white text-center py-2 text-xs tracking-widest uppercase" style={{ letterSpacing: "0.15em" }}>
        Free shipping on orders over $150 — Use code SKYBLUE
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center">
                <span className="text-white text-xs">✦</span>
              </div>
              <span className="text-sky-600 tracking-widest uppercase text-sm" style={{ fontWeight: 700, letterSpacing: "0.2em" }}>
                Neon Boutique
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-gray-600 text-sm hover:text-sky-500 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search size={18} className="text-gray-400 hover:text-sky-500 cursor-pointer transition-colors" />
            <Heart size={18} className="text-gray-400 hover:text-sky-500 cursor-pointer transition-colors" />
            <div className="relative cursor-pointer">
              <ShoppingBag size={18} className="text-gray-600 hover:text-sky-500 transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-sky-500 text-white text-xs rounded-full flex items-center justify-center" style={{ fontSize: "10px" }}>2</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-sky-100 text-sky-600 text-xs px-3 py-1 rounded-full mb-5 tracking-widest uppercase" style={{ fontWeight: 600 }}>
              ✦ Summer 2025 Collection
            </span>
            <h1 className="text-gray-900 mb-5 leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800 }}>
              Wear the Sky.<br />
              <span className="text-sky-500">Feel the Light.</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Ethereal pieces crafted for the modern woman — where minimalism meets effortless elegance. Every stitch tells a story.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-sky-500 text-white px-7 py-3.5 rounded-full hover:bg-sky-600 transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
                Shop Now <ArrowRight size={16} />
              </button>
              <button className="border border-sky-200 text-sky-600 px-7 py-3.5 rounded-full hover:bg-sky-50 transition-colors" style={{ fontWeight: 500 }}>
                Lookbook
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              {[["2,400+", "Happy Clients"], ["100%", "Sustainable"], ["Free", "Returns"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-sky-600 text-sm" style={{ fontWeight: 700 }}>{val}</p>
                  <p className="text-gray-400 text-xs">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-sky-200 rounded-3xl rotate-3 opacity-30" />
            <img
              src="https://images.unsplash.com/photo-1535401991746-da3d9055713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80"
              alt="hero"
              className="relative rounded-3xl object-cover w-full h-80 md:h-[420px] shadow-xl shadow-sky-100"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <Star size={14} className="text-sky-500 fill-sky-500" />
              </div>
              <div>
                <p className="text-gray-900 text-xs" style={{ fontWeight: 600 }}>4.9 / 5 Rating</p>
                <p className="text-gray-400 text-xs">1,200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-y border-sky-100 bg-white py-4 px-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm transition-all ${
                i === 0
                  ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                  : "bg-sky-50 text-sky-600 hover:bg-sky-100"
              }`}
              style={{ fontWeight: 500 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-gray-900 mb-1" style={{ fontWeight: 700, fontSize: "1.6rem" }}>New Arrivals</h2>
              <p className="text-gray-400 text-sm">Fresh styles, just landed.</p>
            </div>
            <a href="#" className="text-sky-500 text-sm flex items-center gap-1 hover:text-sky-600" style={{ fontWeight: 500 }}>
              View All <ChevronRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 500 }}>
                    {p.tag}
                  </span>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-sky-500 transition-colors">
                    <Heart size={14} />
                  </button>
                  <button className="absolute bottom-3 left-3 right-3 bg-white text-sky-600 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" style={{ fontWeight: 600 }}>
                    Quick Add
                  </button>
                </div>
                <h3 className="text-gray-900 text-sm mb-0.5" style={{ fontWeight: 600 }}>{p.name}</h3>
                <p className="text-sky-500" style={{ fontWeight: 700 }}>{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="mx-6 mb-16 rounded-3xl bg-sky-500 overflow-hidden">
        <div className="max-w-6xl mx-auto px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-sky-100 text-sm mb-2 tracking-widest uppercase" style={{ fontWeight: 600 }}>Limited Time Offer</p>
            <h2 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "1.8rem" }}>Summer Edit: Up to 40% Off</h2>
            <p className="text-sky-100 text-sm leading-relaxed max-w-sm">
              Explore our curated seasonal picks and refresh your wardrobe with sky-fresh styles.
            </p>
          </div>
          <button className="bg-white text-sky-600 px-8 py-3.5 rounded-full hover:bg-sky-50 transition-colors whitespace-nowrap flex-shrink-0" style={{ fontWeight: 700 }}>
            Shop the Edit →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-50 border-t border-sky-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
              <span className="text-white text-xs">✦</span>
            </div>
            <span className="text-sky-600 text-sm tracking-widest uppercase" style={{ fontWeight: 700 }}>Neon Boutique</span>
          </div>
          <p className="text-gray-400 text-xs text-center">© 2025 Neon Boutique. All rights reserved. Crafted with ♡</p>
          <div className="flex items-center gap-4">
            <Instagram size={16} className="text-gray-400 hover:text-sky-500 cursor-pointer transition-colors" />
            <Twitter size={16} className="text-gray-400 hover:text-sky-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
