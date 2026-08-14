import React from "react";
import { Globe, ShieldCheck, Mail, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";

const FEATURES_DATA = [
  {
    icon: <Mail className="w-6 h-6 text-cyan-400" />,
    title: "Domain Integrity Check",
    description: "Verifies the recruiter's email domain against commercial registers, flagging generic addresses like Gmail, Outlook, or lookalike typosquatting domains."
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
    title: "Communication Audit",
    description: "Assesses communication mediums, highlighting red flags when interviews and document shares occur via Telegram, WhatsApp, or standard messaging apps."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
    title: "Financial Scam Alerts",
    description: "Instantly reports text that suggests buying equipment through specific portals, paying deposits, or receiving check-deposit advancements."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    title: "Linguistic Fraud Scans",
    description: "Uses AI parsing to look for signs of high-urgency threats, vague responsibilities, and phrasing standard to employment scams."
  }
];

function Features() {
  return (
    <section id="features" className="py-20 bg-slate-950 relative border-t border-slate-900">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
            Security Vectors
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mt-4">
            How InternShield AI Inspects Offers
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Our specialized classification system verifies every part of an internship listing to make sure you only apply to real companies.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FEATURES_DATA.map((feat, idx) => (
            <div 
              key={idx}
              className="group p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/60 hover:bg-slate-900/60 shadow-lg hover:shadow-cyan-500/[0.02] hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 group-hover:bg-slate-900 transition-transform duration-300 flex-shrink-0">
                {feat.icon}
              </div>
              
              {/* Text Container */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-200">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;
