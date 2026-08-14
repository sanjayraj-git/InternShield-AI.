import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What are the most common signs of a fake internship offer?",
    answer: "The biggest warning signals are: requests for upfront money or 'security deposits' to verify eligibility; being asked to purchase software/laptops from a specified 'approved vendor' with promises of a check reimbursement; communication handled solely through Telegram, WhatsApp, or signal; and recruiter email addresses coming from free domains (@gmail.com, @yahoo.com) rather than corporate websites."
  },
  {
    question: "How does the InternShield AI Trust Score work?",
    answer: "Our system scores offers from 10 to 99 based on a heuristic matching engine. We parse communication vectors (e.g., Telegram redirects), domain validity (e.g., free mailboxes vs corporate handles), financial audit triggers (e.g., equipment buy-back checks), and urgency tactics. A score below 50 is classified as High Risk."
  },
  {
    question: "Why do recruitment scams target students and interns specifically?",
    answer: "Students and early-career jobseekers are often highly motivated to secure experience, making them more willing to overlook structural inconsistencies. Additionally, they may be less familiar with standard corporate hiring protocols, which never include paying for equipment or interviewing exclusively on chat apps."
  },
  {
    question: "Is my pasted offer letter kept private?",
    answer: "Yes, privacy is our top priority. The pasted texts are analyzed in-session to parse variables and score risk. We do not store, catalog, or share your pasted documents, contracts, or credentials."
  }
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 relative border-t border-slate-900">
      
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-950/40 border border-indigo-800/30 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mt-4">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-400">
            Learn how to recognize employment scams and check details like a professional researcher.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-slate-900/30 border border-slate-800/60 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "transform rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>
                
                {/* Collapsible Answer */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] opacity-100 border-t border-slate-900" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="p-6 text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
