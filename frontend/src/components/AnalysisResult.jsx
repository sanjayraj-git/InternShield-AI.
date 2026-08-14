import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  FileText,
  Copy,
  Check,
  Download,
  Square,
  CheckSquare,
  Mail,
  CreditCard,
  MessageSquare,
  Percent
} from "lucide-react";

function AnalysisResult({ result, isAnalyzing }) {
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Reset checked checklist items whenever a new result object is loaded
  useEffect(() => {
    setCheckedItems({});
  }, [result]);

  const handleCopy = async () => {
    if (!result) return;
    
    const textToCopy = `🛡️ INTERNSHIELD AI SAFETY REPORT
----------------------------------
Verdict: ${result.verdict.toUpperCase()}
Risk Score: ${result.score}/100
Confidence: ${result.confidence}%
Scan Date: ${new Date().toLocaleDateString()}

SUMMARY:
${result.details.summary}

WARNING SIGNS IDENTIFIED:
${result.redFlags.map(flag => `- ${flag}`).join("\n") || "None"}

POSITIVE INDICATORS VERIFIED:
${result.trustFactors.map(trust => `- ${trust}`).join("\n") || "None"}

RECOMMENDED ACTIONS Checklist:
${result.details.checklist.map(action => `[ ] ${action}`).join("\n")}

Disclaimer: Heuristics scan report. Always manually verify contracts with official company HR departments directly.`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy report text", err);
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>InternShield Safety Report - ${result.verdict}</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              padding: 40px; 
              color: #0f172a; 
              background: #ffffff;
              line-height: 1.6;
            }
            .header { 
              border-bottom: 3px solid #e2e8f0; 
              padding-bottom: 24px; 
              margin-bottom: 30px; 
            }
            .logo {
              font-size: 24px;
              font-weight: 800;
              color: #0891b2;
            }
            .title { 
              font-size: 28px; 
              font-weight: 800; 
              color: #0f172a; 
              margin-top: 5px;
            }
            .meta { 
              font-size: 13px; 
              color: #64748b; 
              margin-top: 5px; 
            }
            .report-card { 
              background: #f8fafc; 
              border: 1px solid #cbd5e1; 
              padding: 24px; 
              border-radius: 16px; 
              margin-bottom: 32px; 
              display: flex; 
              justify-content: space-between;
              align-items: center;
            }
            .verdict-info {
              display: flex;
              flex-direction: column;
            }
            .verdict { 
              font-weight: 800; 
              font-size: 22px; 
              text-transform: uppercase; 
              letter-spacing: 0.05em;
              display: inline-block;
              padding: 4px 12px;
              border-radius: 8px;
            }
            .verdict-Safe { 
              color: #047857; 
              background-color: #d1fae5;
            }
            .verdict-Suspicious { 
              color: #b45309; 
              background-color: #fef3c7;
            }
            .verdict-Scam { 
              color: #b91c1c; 
              background-color: #fee2e2;
            }
            .section-title { 
              font-size: 16px; 
              font-weight: 800; 
              color: #334155; 
              margin-bottom: 12px; 
              border-bottom: 1.5px solid #cbd5e1; 
              padding-bottom: 6px; 
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .summary-text {
              font-size: 15px; 
              color: #334155; 
              margin-bottom: 30px; 
            }
            .list { 
              margin-bottom: 25px; 
              padding-left: 20px; 
            }
            .list-item { 
              font-size: 14px; 
              margin-bottom: 10px; 
              color: #334155;
            }
            .progress-bar-container {
              width: 150px;
              background-color: #e2e8f0;
              border-radius: 8px;
              height: 16px;
              overflow: hidden;
              margin-top: 4px;
              border: 1px solid #cbd5e1;
            }
            .progress-bar-fill {
              height: 100%;
            }
            .fill-Safe { background-color: #10b981; }
            .fill-Suspicious { background-color: #f59e0b; }
            .fill-Scam { background-color: #ef4444; }
            .disclaimer { 
              font-size: 11px; 
              color: #64748b; 
              border-top: 1px solid #e2e8f0; 
              padding-top: 20px; 
              margin-top: 50px; 
              line-height: 1.6; 
              text-align: justify;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🛡️ InternShield AI</div>
            <div class="title">Safety Scan Report</div>
            <div class="meta">Generated: ${new Date().toLocaleString()} | Heuristics Verification Engine</div>
          </div>
          
          <div class="report-card">
            <div class="verdict-info">
              <span style="font-size:12px; font-weight:bold; color:#64748b; text-transform:uppercase; margin-bottom:4px;">Audit Verdict</span>
              <div>
                <span class="verdict verdict-${result.verdict}">${result.verdict}</span>
              </div>
              <div style="font-size: 13px; color: #475569; margin-top: 8px; font-weight: 500;">
                AI Confidence Level: <strong>${result.confidence}%</strong>
              </div>
            </div>
            
            <div style="text-align: right;">
              <span style="font-size:12px; font-weight:bold; color:#64748b; text-transform:uppercase; display:block; margin-bottom:4px;">Risk Score</span>
              <div style="font-size:26px; font-weight:800; color:#0f172a; line-height:1;">${result.score}%</div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill fill-${result.verdict}" style="width: ${result.score}%"></div>
              </div>
            </div>
          </div>
          
          <div class="section-title">Executive Summary</div>
          <p class="summary-text">${result.details.summary}</p>

          <div class="section-title">Risk Warnings Identified (${result.redFlags.length})</div>
          <ul class="list">
            ${result.redFlags.map(flag => `<li class="list-item">⚠️ ${flag}</li>`).join("") || '<li style="color:#64748b; font-style:italic; font-size:14px; list-style-type:none; margin-left:-20px;">No risk indicators flagged.</li>'}
          </ul>

          <div class="section-title">Positive Indicators Verified (${result.trustFactors.length})</div>
          <ul class="list">
            ${result.trustFactors.map(trust => `<li class="list-item">✅ ${trust}</li>`).join("") || '<li style="color:#64748b; font-style:italic; font-size:14px; list-style-type:none; margin-left:-20px;">No positive trust markers verified.</li>'}
          </ul>

          <div class="section-title">Recommended Safety Plan</div>
          <ul class="list" style="list-style-type: none; padding-left: 0;">
            ${result.details.checklist.map((item, index) => `<li class="list-item" style="margin-bottom: 12px; display: flex; align-items: start;"><span style="margin-right: 8px; color: #64748b;">[ ]</span> ${item}</li>`).join("")}
          </ul>

          <div class="disclaimer">
            <strong>Disclaimer:</strong> InternShield AI is a software classification engine. The risk score generated is a heuristic rating. You are strongly advised to manually verify all corporate registrations, recruiters, and offers via official portals before taking employment actions.
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleToggleChecklist = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getFlagIcon = (flagText) => {
    const text = flagText.toLowerCase();
    if (text.includes("telegram") || text.includes("whatsapp") || text.includes("chat")) {
      return <MessageSquare className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />;
    }
    if (text.includes("deposit") || text.includes("fee") || text.includes("buy") || text.includes("purchase") || text.includes("money")) {
      return <CreditCard className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />;
    }
    if (text.includes("domain") || text.includes("gmail") || text.includes("address") || text.includes("email")) {
      return <Mail className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />;
    }
    return <AlertTriangle className="w-4.5 h-4.5 text-rose-400 mt-0.5 flex-shrink-0" />;
  };

  // ANALYZING LOADER
  if (isAnalyzing) {
    return (
      <div 
        className="w-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden"
        role="status"
        aria-live="polite"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 animate-pulse pointer-events-none" />
        
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-cyan-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-slate-700 animate-reverse-spin" />
          <ShieldAlert className="w-9 h-9 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">AI Safety Scan Active</h3>
        
        <div className="space-y-2.5 max-w-xs w-full text-center">
          <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase animate-pulse">Running diagnostics...</div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full w-2/3 animate-loading-bar" />
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Parsing lexical triggers, auditing channel vectors, and checking check-advancement scam models...
          </p>
        </div>
      </div>
    );
  }

  // AWAITING INPUT PLACEHOLDER STATE
  if (!result) {
    return (
      <div className="w-full bg-slate-900/30 backdrop-blur-md rounded-2xl border border-dashed border-slate-800 p-8 flex flex-col items-center justify-center min-h-[460px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-600 mb-6">
          <FileText className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-300 mb-2">Audit Report Ready</h3>
        <p className="text-slate-500 max-w-sm text-xs sm:text-sm mb-8 leading-relaxed">
          Input your job offer details or correspondence above and click <strong className="text-slate-400">Analyze Offer</strong> to begin safety classification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
            <Mail className="w-5 h-5 text-cyan-500/80 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-300">Sender Auth Scan</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Flags public domains, look-alikes, and typosquatting recruitment handles.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
            <CreditCard className="w-5 h-5 text-indigo-500/80 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-300">Financial Warning</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Identifies requirements for deposits, checks, or software purchases.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE SCAN RESULTS VIEW
  const { score, verdict, redFlags, trustFactors, confidence, details } = result;

  // Colors mappings
  let scoreColor = "text-emerald-400";
  let scoreProgressColor = "bg-emerald-500 shadow-emerald-500/35";
  let badgeColor = "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20";
  let verdictIcon = <ShieldCheck className="w-5 h-5 text-emerald-400" />;

  if (verdict === "Suspicious") {
    scoreColor = "text-amber-400";
    scoreProgressColor = "bg-amber-500 shadow-amber-500/35";
    badgeColor = "bg-amber-950/40 text-amber-400 border border-amber-500/20";
    verdictIcon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
  } else if (verdict === "Scam") {
    scoreColor = "text-rose-400";
    scoreProgressColor = "bg-rose-500 shadow-rose-500/35";
    badgeColor = "bg-rose-950/40 text-rose-400 border border-rose-500/20";
    verdictIcon = <ShieldAlert className="w-5 h-5 text-rose-400" />;
  }

  return (
    <div 
      className="w-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 sm:p-8 animate-slide-up-fade shadow-2xl focus:outline-none"
      tabIndex="0"
      aria-label={`InternShield Safety Scan Report: Verdict is ${verdict}`}
    >
      
      {/* Header Panel with Verdict Badge & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">AI Verification Scan</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Audit Results</h3>
        </div>
        
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
          {/* Verdict Badge */}
          <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 ${badgeColor}`}>
            {verdictIcon}
            <span>{verdict.toUpperCase()}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none"
              title="Copy safety report content"
              aria-label="Copy safety report content"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none"
              title="Download Safety PDF Report"
              aria-label="Download Safety PDF Report"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Risk Progress Bar & Metrics */}
      <div className="py-6 sm:py-8 border-b border-slate-800 flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Score Rating</span>
            <span className={`text-xl sm:text-2xl font-black ${scoreColor}`}>{score}%</span>
          </div>
          
          {/* Linear progress bar */}
          <div className="w-full bg-slate-950/60 rounded-full h-4 p-0.5 border border-slate-900 overflow-hidden shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${scoreProgressColor}`} 
              style={{ width: `${score}%` }} 
            />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">
            Values above 70% risk levels indicate high likelihood of fraudulent recruiting schemes.
          </span>
        </div>

        {/* Confidence Percentage & Decision summary grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 flex flex-col justify-center">
            <div className="text-slate-500 text-[10px] sm:text-xs font-semibold uppercase">Scan Confidence</div>
            <div className="text-2xl font-black text-white mt-1 flex items-center gap-1.5">
              <span>{confidence}%</span>
              <Percent className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-[9px] text-slate-600 mt-1 leading-relaxed">Based on signal consistency and offer length.</span>
          </div>

          <div className="md:col-span-2 p-5 rounded-xl bg-slate-950/20 border border-slate-900/60 flex flex-col justify-center">
            <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Decision Reason</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {details.summary}
            </p>
          </div>
          
        </div>
      </div>

      {/* Red Flags (Warning Signs) / Positive Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 sm:py-8 border-b border-slate-800">
        
        {/* Warning Signs (Warning List) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>Detected Warning Signs ({redFlags.length})</span>
          </h4>
          {redFlags.length === 0 ? (
            <p className="text-slate-500 text-xs italic bg-slate-950/20 rounded-xl p-4 border border-slate-900">
              No warning signs flagged in the content.
            </p>
          ) : (
            <ul className="space-y-3">
              {redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500/[0.08] transition-colors">
                  {getFlagIcon(flag)}
                  <span className="text-xs text-slate-300 leading-relaxed">{flag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Positive Indicators */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Positive Indicators Verified ({trustFactors.length})</span>
          </h4>
          {trustFactors.length === 0 ? (
            <p className="text-slate-500 text-xs italic bg-slate-950/20 rounded-xl p-4 border border-slate-900">
              No verifiable trust markings found. Exercise maximum caution.
            </p>
          ) : (
            <ul className="space-y-3">
              {trustFactors.map((trust, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/[0.08] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-300 leading-relaxed">{trust}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* Action Plan (Interactive Checklist) */}
      <div className="pt-6 sm:pt-8">
        <div className="flex items-start gap-2.5 mb-4">
          <Info className="w-4.5 h-4.5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Recommended Safety Action Steps</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Complete and check off each safety audit recommendation manually to ensure onboarding safety.</p>
          </div>
        </div>

        <ul className="space-y-2 max-w-3xl">
          {details.checklist.map((item, idx) => {
            const isChecked = !!checkedItems[idx];
            return (
              <li key={idx}>
                <button
                  onClick={() => handleToggleChecklist(idx)}
                  className={`w-full flex items-start gap-3.5 p-3 sm:p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    isChecked
                      ? "bg-slate-950/40 border-slate-900 text-slate-500 line-through"
                      : "bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700"
                  }`}
                  aria-pressed={isChecked}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4.5 h-4.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Square className="w-4.5 h-4.5 text-slate-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-xs leading-relaxed">{item}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}

export default AnalysisResult;
