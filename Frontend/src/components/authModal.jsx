import { useState, useEffect } from "react";

function AuthModal({ isOpen, onClose, initialMode = "signin" }) {
  const [mode, setMode] = useState(initialMode); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-surface-container border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              MVF Account Pass
            </span>
            <h2 className="font-display text-2xl font-bold text-primary">
              {mode === "signin" ? "Sign In to MVF" : "Create Account"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-3">
            <span className="material-symbols-outlined text-5xl text-emerald-400 animate-bounce">
              check_circle
            </span>
            <h3 className="font-display text-xl font-semibold text-white">
              {mode === "signin" ? "Welcome Back!" : "Account Created!"}
            </h3>
            <p className="text-xs text-on-surface-variant">
              Redirecting to your cinematic intelligence portal...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-low text-white text-sm rounded-lg px-4 py-3 border border-white/10 focus:border-white focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="cinematographer@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low text-white text-sm rounded-lg px-4 py-3 border border-white/10 focus:border-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low text-white text-sm rounded-lg px-4 py-3 border border-white/10 focus:border-white focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-body font-semibold text-sm hover:scale-[1.01] active:scale-95 transition-all shadow-[0_0_15px_rgba(59,130,246,0.35)] cursor-pointer mt-2"
            >
              {mode === "signin" ? "Sign In" : "Register Pass"}
            </button>

            {/* Toggle Mode Footer */}
            <div className="pt-4 border-t border-white/10 text-center text-xs text-on-surface-variant">
              {mode === "signin" ? (
                <p>
                  Don't have an MVF Pass?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-white font-semibold underline hover:opacity-80"
                  >
                    Register Now
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-white font-semibold underline hover:opacity-80"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
