import React from "react";
import { ShieldCheck, ArrowRight, ShieldAlert, Sparkles, UserCheck } from "lucide-react";

function Hero() {
  const scrollToAnalyzer = () => {
    const analyzer = document.getElementById("analyzer");
    if (analyzer) {
      analyzer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        {/* Glow Spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        
        {/* Tech Grid Effect */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs sm:text-sm text-cyan-400 font-medium mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Real-time AI Verification Engine Active</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="block text-white">Detect Fake</span>
          <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Internship Offers Using AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          Don't fall victim to data harvesting, task-scams, or financial fraud. InternShield AI analyzes job offers, email templates, and communications in seconds to ensure your safety.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToAnalyzer}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Audit Offer Now <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              const features = document.getElementById("features");
              if (features) features.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/40 font-semibold text-base transition-all duration-200 cursor-pointer"
          >
            How it Works
          </button>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-900 pt-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">10k+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Offers Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">&lt; 3s</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Analysis Speed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Confidential & Secure</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
