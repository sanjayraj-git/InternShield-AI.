import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OfferAnalyzer from "./components/OfferAnalyzer";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200 antialiased overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Area */}
        <Hero />

        {/* Dynamic Analyzer Section (Includes text input and Result Card) */}
        <OfferAnalyzer />

        {/* Scanner Features Section */}
        <Features />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer Area */}
      <Footer />
    </div>
  );
}

export default App;