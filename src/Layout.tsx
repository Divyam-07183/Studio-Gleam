import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, FolderOpen, Mail, UserCircle, ArrowRight } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("sg_has_visited");
    if (!hasVisited) {
      localStorage.setItem("sg_has_visited", "true");
      navigate("/profile", { replace: true });
    }
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/portfolio", icon: FolderOpen, label: "Portfolio" },
    { path: "/builder", icon: Mail, label: "Builder" },
    { path: "/profile", icon: UserCircle, label: "Profile" },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const showBottomNav = location.pathname !== "/checkout";

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Desktop Sidebar (lg+) ── */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-40 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-base">💎</span>
          </div>
          <div>
            <p className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>StudioGleam</p>
            <p className="text-gray-400 text-xs">Web Design Agency</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {navItems.map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all text-left w-full ${
                isActive(path)
                  ? "bg-violet-50 text-violet-600 border border-violet-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
              style={{ fontWeight: isActive(path) ? 600 : 400 }}
            >
              <Icon size={17} strokeWidth={isActive(path) ? 2.5 : 1.8} />
              {label}
            </button>
          ))}
        </nav>

        {/* Sidebar CTA */}
        <div className="px-4 pb-4">
          <button
            onClick={() => navigate("/builder")}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white text-sm py-2.5 rounded-xl hover:bg-violet-700 transition-colors shadow-sm"
            style={{ fontWeight: 600 }}
          >
            Start a Project <ArrowRight size={13} />
          </button>
        </div>

        {/* Sidebar footer */}
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">© 2025 StudioGleam</p>
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="flex flex-col min-h-screen flex-1 lg:ml-64">

        {/* ── Tablet Top Nav (md–lg) ── */}
        <header className="hidden md:flex lg:hidden sticky top-0 z-30 items-center gap-3 px-6 h-14 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mr-4 flex-shrink-0">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <span className="text-white text-xs">💎</span>
            </div>
            <span className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>StudioGleam</span>
          </div>
          <nav className="flex items-center gap-0.5 flex-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                  isActive(path)
                    ? "bg-violet-50 text-violet-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
                style={{ fontWeight: isActive(path) ? 600 : 400 }}
              >
                <Icon size={15} strokeWidth={isActive(path) ? 2.5 : 1.8} />
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => navigate("/builder")}
            className="flex items-center gap-1.5 bg-violet-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors flex-shrink-0"
            style={{ fontWeight: 500 }}
          >
            Start Project <ArrowRight size={13} />
          </button>
        </header>

        {/* ── Page content ── */}
        <div className="flex-1 flex flex-col items-center md:items-stretch">
          {/* Mobile: phone shell | Tablet/Desktop: full width */}
          <div className="w-full max-w-sm md:max-w-none bg-white md:bg-transparent shadow-xl md:shadow-none flex-1 flex flex-col">
            <div className="flex-1 pb-20 md:pb-10">
              <div className="md:max-w-4xl lg:max-w-6xl md:mx-auto md:px-6 lg:px-8 md:py-4 lg:py-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Bottom Nav ── */}
        {showBottomNav && (
          <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 z-50">
            <div className="flex items-center justify-around px-2 py-3">
              {navItems.map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                    isActive(path) ? "text-violet-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive(path) ? 2.5 : 1.8} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
