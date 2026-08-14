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

function ResultCard({ result, isAnalyzing }) {
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Reset checkmark states when a new result is loaded
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

RED FLAGS IDENTIFIED:
${result.redFlags.map(flag => `- ${flag}`).join("\n") || "None"}

RECOMMENDED ACTIONS:
${result.details.checklist.map(action => `[ ] ${action}`).join("\n")}

Disclaimer: Scanned via InternShield heuristics. Confirm all offers with official HR departments directly.`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy report", err);
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
              display: flex;
              justify-content: space-between;
              align-items: center;
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
            .verdict-Fake { 
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
            .disclaimer { 
              font-size: 11px; 
              color: #64748b; 
              border-top: 1px solid #e2e8f0; 
              padding-top: 20px; 
              margin-top: 50px; 
              line-height: 1.6; 
              text-align: justify;
            }
            .score-circle {
              text-align: center;
              background: #fff;
              border: 2.5px solid #e2e8f0;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
            }
            .score-num {
              font-size: 32px;
              font-weight: 800;
              line-height: 1;
            }
            .score-lbl {
              font-size: 9px;
              font-weight: bold;
              text-transform: uppercase;
              color: #64748b;
              margin-top: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">🛡️ InternShield AI</div>
              <div class="title">Safety Scan Report</div>
              <div class="meta">Generated: ${new Date().toLocaleString()} | Secure AI Scan</div>
            </div>
          </div>
          
          <div class="report-card">
            <div class="verdict-info">
              <span style="font-size:12px; font-weight:bold; color:#64748b; text-transform:uppercase; margin-bottom: 4px;">Classification Verdict</span>
              <div>
                <span class="verdict verdict-${result.verdict}">${result.verdict}</span>
              </div>
              <div style="font-size: 13px; color: #475569; margin-top: 8px; font-weight: 500;">
                AI Confidence Level: <strong>${result.confidence}%</strong>
              </div>
            </div>
            
            <div class="score-circle">
              <span class="score-num">${result.score}</span>
              <span class="score-lbl">Risk Score</span>
            </div>
          </div>
          
          <div class="section-title">Executive Summary</div>
          <p class="summary-text">${result.details.summary}</p>

          <div class="section-title">Risk Indicators Checked (${result.redFlags.length})</div>
          <ul class="list">
            ${result.redFlags.map(flag => `<li class="list-item">⚠️ ${flag}</li>`).join("") || '<li style="color:#64748b; font-style:italic; font-size:14px; list-style-type:none; margin-left:-20px;">No critical risk indicators detected during analysis.</li>'}
          </ul>

          <div class="section-title">Trust Factors Verified (${result.trustFactors.length})</div>
          <ul class="list">
            ${result.trustFactors.map(trust => `<li class="list-item">✅ ${trust}</li>`).join("") || '<li style="color:#64748b; font-style:italic; font-size:14px; list-style-type:none; margin-left:-20px;">No verifiable corporate trust signals detected.</li>'}
          </ul>

          <div class="section-title">Recommended Action Plan</div>
          <ul class="list" style="list-style-type: none; padding-left: 0;">
            ${result.details.checklist.map((item, index) => `<li class="list-item" style="margin-bottom: 12px; display: flex; align-items: start;"><span style="margin-right: 8px; color: #64748b;">[ ]</span> ${item}</li>`).join("")}
          </ul>

          <div class="disclaimer">
            <strong>Legal Disclaimer:</strong> InternShield AI is a software classification engine that flags patterns common to recruitment and employment scams. The risk score generated is a heuristic rating. You are strongly advised to manually verify all corporate registrations, recruiters, and offers via direct telephone channels and official domains before taking employment actions.
          </div>
          <script>
            window.onload = function() {
              window.print();
              // Close window shortly after standard printing dialog triggers
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

  // Determine specific warning icons for red flag descriptions
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
    return <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />;
  };

  // LOADING STATE
  if (isAnalyzing) {
    return (
      <div 
        className="w-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden"
        role="status"
        aria-live="polite"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 animate-pulse pointer-events-none" />
        
        {/* Animated concentric scanning circles */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-cyan-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-slate-700 animate-reverse-spin" />
          <ShieldAlert className="w-9 h-9 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">AI Fraud Audit Active</h3>
        
        {/* Simulated scanning list with automated animation */}
        <div className="space-y-2.5 max-w-xs w-full text-center">
          <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase animate-pulse">Checking domain registrar...</div>
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

  // DEFAULT/AWAITING STATE (PLACEHOLDER)
  if (!result) {
    return (
      <div className="w-full bg-slate-900/30 backdrop-blur-md rounded-2xl border border-dashed border-slate-800 p-8 flex flex-col items-center justify-center min-h-[460px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-600 mb-6">
          <FileText className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-300 mb-2">Analysis Report Standby</h3>
        <p className="text-slate-500 max-w-sm text-xs sm:text-sm mb-8 leading-relaxed">
          Input your job listing details, email communications, or contract requirements above and click <strong className="text-slate-400">Analyze Offer</strong> to compile a Safety score.
        </p>

        {/* Informational grid boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
            <Mail className="w-5 h-5 text-cyan-500/80 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-300">Domain Authentication</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Scans MX registration and looks for typosquatting mimics.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
            <CreditCard className="w-5 h-5 text-indigo-500/80 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-300">Onboarding Audits</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Identifies check buying mandates or upfront security charges.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE REPORT COMPLETED STATE
  const { score, verdict, redFlags, trustFactors, confidence, details } = result;

  // Safety Style Configs
  let scoreColor = "text-emerald-400";
  let gaugeStroke = "stroke-emerald-500";
  let badgeColor = "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20";
  let verdictIcon = <ShieldCheck className="w-5 h-5 text-emerald-400" />;

  if (verdict === "Suspicious") {
    scoreColor = "text-amber-400";
    gaugeStroke = "stroke-amber-500";
    badgeColor = "bg-amber-950/40 text-amber-400 border border-amber-500/20";
    verdictIcon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
  } else if (verdict === "Fake") {
    scoreColor = "text-rose-400";
    gaugeStroke = "stroke-rose-500";
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
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Audit Assessment</h3>
        </div>
        
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
          {/* Action Badge */}
          <div className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 ${badgeColor}`}>
            {verdictIcon}
            <span>{verdict.toUpperCase()}</span>
          </div>

          {/* Tool actions */}
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

      {/* Main Score panel & Circular gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 sm:py-8 border-b border-slate-800">
        
        {/* Risk Score Circular Gauge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-950/40 border border-slate-900">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="58"
                className="stroke-slate-900"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="58"
                className={`transition-all duration-1000 ease-out ${gaugeStroke}`}
                strokeWidth="9"
                fill="transparent"
                strokeDasharray={364.42}
                strokeDashoffset={364.42 - (364.42 * score) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${scoreColor}`}>{score}%</span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 mt-1">Risk Rating</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-xs text-slate-400">Analysis Confidence</div>
            <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
              <span>{confidence}%</span>
              <Percent className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Scan summaries */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Safety Evaluation Summary</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {details.summary}
            </p>
          </div>
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-950/20 border border-slate-900/60">
              <div className="text-slate-500 text-[10px] sm:text-xs font-semibold uppercase">Risk Signals Found</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">{redFlags.length}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/20 border border-slate-900/60">
              <div className="text-slate-500 text-[10px] sm:text-xs font-semibold uppercase">Verifications Met</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">{trustFactors.length}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Red Flags Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 sm:py-8 border-b border-slate-800">
        
        {/* Danger flags listing */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>Detected Red Flags ({redFlags.length})</span>
          </h4>
          {redFlags.length === 0 ? (
            <p className="text-slate-500 text-xs italic bg-slate-950/20 rounded-xl p-4 border border-slate-900">
              No core security warnings detected in listing text.
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

        {/* Verified markers listing */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Trust Markers ({trustFactors.length})</span>
          </h4>
          {trustFactors.length === 0 ? (
            <p className="text-slate-500 text-xs italic bg-slate-950/20 rounded-xl p-4 border border-slate-900">
              No safety check-markers validated. Please check domain registry manually.
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

      {/* Checklist Action Plan (TICKABLE) */}
      <div className="pt-6 sm:pt-8">
        <div className="flex items-start gap-2.5 mb-4">
          <Info className="w-4.5 h-4.5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Recommended Safety Action Plan</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Please check off each verification step as you perform it to secure your onboarding.</p>
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

export default ResultCard;
