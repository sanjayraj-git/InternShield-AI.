import React, { useState } from "react";
import { Shield, Menu, X, ArrowRight } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-5 h-5" />
            </div>
            <span className="ml-3 text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              InternShield <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("features")} 
              className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors duration-200"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("analyzer")} 
              className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors duration-200"
            >
              Analyzer
            </button>
            <button 
              onClick={() => scrollToSection("faq")} 
              className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors duration-200"
            >
              FAQs
            </button>
            
            <button
              onClick={() => scrollToSection("analyzer")}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs sm:text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-indigo-500 group-hover:from-cyan-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-800 cursor-pointer mt-2"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-md group-hover:bg-opacity-0">
                Check Offer
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-slate-950/95 border-b border-slate-800/80 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <button
            onClick={() => scrollToSection("features")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("analyzer")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Analyzer
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            FAQs
          </button>
          <div className="px-3 pt-2">
            <button
              onClick={() => scrollToSection("analyzer")}
              className="flex w-full items-center justify-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-indigo-600 transition-all"
            >
              Check Offer <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;