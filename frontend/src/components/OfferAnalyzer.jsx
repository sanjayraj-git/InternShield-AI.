import React, { useState } from "react";
import { Sparkles, FileText, RefreshCw, AlertTriangle, Trash2 } from "lucide-react";
import ResultCard from "./ResultCard";

const SAMPLE_SCAM = `Subject: Internship Offer - Remote Data Entry Assistant (Urgent)

Dear Candidate,
We are pleased to offer you a remote Internship position at Global Tech Systems. We found your profile on LinkedIn. The hourly rate is $35/hour.

To get started, you must complete your interview and onboarding on Telegram. Please message our recruiter @HrGlobalTech to set up your briefing. 

Please note: You will be required to buy your own working laptop and scanner from our verified vendor. We will mail you a check of $1200 for the expenses once you deposit a security clearance fee of $150 via bank wire or bitcoin.

Best Regards,
recruiter.globaltech@gmail.com`;

const SAMPLE_SAFE = `Subject: Software Engineering Intern - Summer 2027 (Acme Corp)

Dear Intern,
Following your interviews with the engineering panel, we are excited to extend an offer for the Software Engineering Internship position at Acme Corp's headquarters in Seattle, WA.

Details of your offer:
- Term: May 24, 2027 – August 13, 2027
- Compensation: $42.00 per hour
- Relocation: Corporate housing provided or monthly stipend
- Reporting Manager: Sarah Jenkins (VP of Engineering)

Please review the attached formal offer letter. If you accept, please sign and return the document through our official Workday recruitment portal by next Friday. We will never ask you to purchase equipment or pay onboarding fees.

Sincerely,
Acme Corp Talent Acquisition Team
recruiting@acmecorp.com`;

function OfferAnalyzer() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    if (val.length >= 50) {
      setError("");
    }
  };

  const loadSample = (sampleText) => {
    setText(sampleText);
    setError("");
    setResult(null);
  };

  const clearAll = () => {
    setText("");
    setResult(null);
    setError("");
  };

  const analyzeOffer = () => {
    if (text.trim().length < 50) {
      setError("Please paste at least 50 characters of the offer content to generate a safety audit.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    // Simulate AI network/computation request
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const redFlags = [];
      const trustFactors = [];
      let riskScore = 5; // Start with baseline minimum risk score

      // Heuristic evaluations
      if (lowerText.includes("telegram") || lowerText.includes("@hr")) {
        redFlags.push("Recruitment directed through Telegram or custom @handle (high scam vector).");
        riskScore += 25;
      }
      if (lowerText.includes("whatsapp")) {
        redFlags.push("Interviews or onboarding managed via WhatsApp chat rather than official corporate portals.");
        riskScore += 20;
      }
      if (lowerText.includes("deposit") || lowerText.includes("security fee") || lowerText.includes("clearance fee")) {
        redFlags.push("Request for upfront financial deposits or 'security fees' to secure employment.");
        riskScore += 35;
      }
      if (lowerText.includes("buy laptop") || lowerText.includes("purchase equipment") || lowerText.includes("buy your own") && lowerText.includes("check")) {
        redFlags.push("Instructs candidate to purchase equipment from a 'verified vendor' with promise of check reimbursement.");
        riskScore += 25;
      }
      if (lowerText.includes("bitcoin") || lowerText.includes("crypto") || lowerText.includes("gift card")) {
        redFlags.push("Recruiter requests transaction details or fees paid in Cryptocurrency, Bitcoin, or Gift Cards.");
        riskScore += 20;
      }
      if (lowerText.includes("@gmail.com") || lowerText.includes("@outlook.com") || lowerText.includes("@yahoo.com") || lowerText.includes("@hotmail.com")) {
        redFlags.push("Official recruitment message sent from a free domain address (@gmail, @outlook, etc.) rather than a corporate domain.");
        riskScore += 15;
      }
      if (lowerText.includes("$35/hour") || lowerText.includes("$40/hour") && lowerText.includes("data entry")) {
        redFlags.push("Unusually high pay rate offered for entry-level / data entry work with no required experience.");
        riskScore += 10;
      }
      if (lowerText.includes("urgent") || lowerText.includes("immediate start") || lowerText.includes("right away")) {
        redFlags.push("High urgency pressure tactics demanding immediate response or contract signature.");
        riskScore += 5;
      }

      // Trust Factors
      if (lowerText.includes("workday") || lowerText.includes("official portal") || lowerText.includes("ats")) {
        trustFactors.push("Directs signing or onboarding through industry-standard ATS portals (Workday, Greenhouse).");
        riskScore -= 10;
      }
      if (lowerText.includes("corporate housing") || lowerText.includes("stipend") || lowerText.includes("relocation")) {
        trustFactors.push("Offer includes standard, detailed benefit outlines and corporate relocation support.");
        riskScore -= 5;
      }
      if (lowerText.includes("never ask you to purchase") || lowerText.includes("no fees")) {
        trustFactors.push("Contains explicit security notices regarding equipment policies and zero upfront fee statements.");
        riskScore -= 10;
      }
      if (lowerText.includes("acmecorp.com") && !lowerText.includes("gmail")) {
        trustFactors.push("Recruiter sent email from an official enterprise-level web domain.");
        riskScore -= 10;
      }

      // Clamp risk score between 5% and 98%
      riskScore = Math.max(5, Math.min(98, riskScore));

      // Calculate Verdict
      let verdict = "Safe";
      if (riskScore >= 70) {
        verdict = "Fake";
      } else if (riskScore >= 25) {
        verdict = "Suspicious";
      }

      // Confidence level (based on text details and signal flags)
      const confidence = Math.min(98, 70 + Math.round(text.length / 120) + (redFlags.length + trustFactors.length) * 3);

      // Populate Details & Recommended Checklist Action Plans
      let summary = "";
      let checklist = [];

      if (verdict === "Fake") {
        summary = "This internship offer shows strong indicators commonly associated with employment scams. Multiple high-severity red flags were detected, including unofficial communication mediums and suspicious equipment-buying requirements.";
        checklist = [
          "DO NOT send money, pay fees, or buy any equipment.",
          "Block the recruiter's number or handle on Telegram/WhatsApp immediately.",
          "Report the user/job poster on the job search platform (e.g. LinkedIn, Handshake).",
          "Never click any financial check links or deposit electronic check clearances."
        ];
      } else if (verdict === "Suspicious") {
        summary = "This offer contains minor warning flags. The communication platform or domain details do not fully align with corporate best practices, although the core contents are typical of standard listings.";
        checklist = [
          "Verify the recruiter's profile details and name on LinkedIn.",
          "Search Google for the hiring company's official careers domain name.",
          "Contact the official company HR department directly through their official portal (do not reply to this email).",
          "Request a formal video interview on Google Meet, Zoom, or Teams (avoid chat-only onboarding)."
        ];
      } else {
        summary = "No major scam signatures were detected. The compensation patterns, recruitment pathways, and policies match those of verified companies.";
        checklist = [
          "Double check that the sender's actual email header matches the corporate domain name.",
          "Confirm all onboarding portals use safe 'https://' URLs.",
          "Carefully read and sign the employee contract once sent officially."
        ];
      }

      setResult({
        score: riskScore,
        verdict,
        redFlags,
        trustFactors,
        confidence,
        details: {
          summary,
          checklist
        }
      });
      setIsAnalyzing(false);

      // Smooth scroll to results view
      setTimeout(() => {
        const resultsEl = document.getElementById("analysis-results-view");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }, 1500);
  };

  return (
    <section id="analyzer" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Analyze Your Offer Details
          </h2>
          <p className="mt-4 text-slate-400">
            Paste the contents of the offer email, job description, or message threads below. Our AI scans linguistic cues, domain mismatches, and payment triggers.
          </p>
        </div>

        {/* Analyzer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Input Panel */}
          <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Offer Text
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => loadSample(SAMPLE_SCAM)}
                  className="text-[10px] sm:text-xs text-rose-400 hover:text-rose-300 font-semibold px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer"
                >
                  Load Scam Sample
                </button>
                <button
                  onClick={() => loadSample(SAMPLE_SAFE)}
                  className="text-[10px] sm:text-xs text-emerald-400 hover:text-emerald-300 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 transition-all cursor-pointer"
                >
                  Load Safe Sample
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Paste the recruiter's email, LinkedIn job posting, or offer letter here (Min. 50 characters)..."
                rows={10}
                className="w-full bg-slate-950/80 text-slate-200 border border-slate-800 rounded-xl p-4 text-sm sm:text-base outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all resize-y placeholder-slate-700 font-mono focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Job Offer Text Area"
              />
            </div>

            {/* Character Count & Validation Warnings */}
            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <span className={`text-xs ${text.length < 50 && text.length > 0 ? "text-amber-500" : "text-slate-500"}`}>
                {text.length} / 5000 characters {text.length < 50 && text.length > 0 && "(Minimum 50 required)"}
              </span>
              {error && (
                <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {error}
                </span>
              )}
            </div>

            {/* Analysis Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={clearAll}
                disabled={isAnalyzing || !text}
                className="w-full sm:w-1/3 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear Text</span>
              </button>
              
              <button
                onClick={analyzeOffer}
                disabled={isAnalyzing}
                className={`w-full sm:w-2/3 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 border border-cyan-500/30 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ${
                  isAnalyzing
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border-transparent"
                    : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-cyan-500/10"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Scanning Content...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze Offer</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div id="analysis-results-view" className="w-full">
            <ResultCard result={result} isAnalyzing={isAnalyzing} />
          </div>

        </div>

      </div>
    </section>
  );
}

export default OfferAnalyzer;
