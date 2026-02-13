"use client";

import { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"agent-owners" | "saas">("agent-owners");
  const [copied, setCopied] = useState(false);
  
  const agentOwnersCodeContent = `## Add this skill URL to your AI agent
https://ametyst.xyz/setup-agent-owners-skill.md`;

  const saasCodeContent = `## Add this skill URL to your AI agent
https://ametyst.xyz/setup-saas-skill.md`;

  const handleCopy = async () => {
    try {
      const contentToCopy = activeTab === "agent-owners" ? agentOwnersCodeContent : saasCodeContent;
      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20 border-b border-border/20">
      <div className="w-full">
        {/* Tab Container - White background */}
        <div className="bg-white rounded-lg overflow-hidden border-2 border-border/20">
          {/* Tab Header */}
          <div className="flex border-b border-border/20">
            <button
              type="button"
              onClick={() => setActiveTab("agent-owners")}
              className={`flex-1 px-6 py-4 text-center transition-colors font-headline text-lg md:text-xl lg:text-2xl ${
                activeTab === "agent-owners"
                  ? "bg-white border-b-2 font-bold"
                  : "bg-white text-black/60 hover:text-[#7A1FFF] font-medium"
              }`}
              style={activeTab === "agent-owners" ? { color: '#7A1FFF', borderBottomColor: '#7A1FFF' } : {}}
            >
              For Agent Owners
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saas")}
              className={`flex-1 px-6 py-4 text-center transition-colors font-headline text-lg md:text-xl lg:text-2xl ${
                activeTab === "saas"
                  ? "bg-white border-b-2 font-bold"
                  : "bg-white text-black/60 hover:text-[#7A1FFF] font-medium"
              }`}
              style={activeTab === "saas" ? { color: '#7A1FFF', borderBottomColor: '#7A1FFF' } : {}}
            >
              For SaaS
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 min-h-[200px]">
            {activeTab === "agent-owners" ? (
              <div className="text-black">
                {/* 3 points - box with number above, text below */}
                <div className="flex items-start justify-between w-full mt-4 md:mt-6 mb-8 md:mb-12 gap-4">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3"
                      style={{ backgroundColor: '#7A1FFF' }}
                    >
                      1
                    </div>
                    <p className="font-body text-base md:text-lg text-center text-black">
                      <strong>Create and fund</strong> your account
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3"
                      style={{ backgroundColor: '#7A1FFF' }}
                    >
                      2
                    </div>
                    <p className="font-body text-base md:text-lg text-center text-black">
                      <strong>Spin up wallets</strong> with policy controls
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3"
                      style={{ backgroundColor: '#7A1FFF' }}
                    >
                      3
                    </div>
                    <p className="font-body text-base md:text-lg text-center text-black">
                      <strong>Link your agents</strong> and spend
                    </p>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-body text-xl md:text-2xl font-bold text-black mb-2 md:mb-3">
                  Choose your setup mode
                </h3>
                
                {/* Two symmetric cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
                  {/* Agent-assisted setup card */}
                  <div className="bg-white border border-border/20 rounded-lg p-4 md:p-6 flex flex-col h-full">
                    <h4 className="font-body text-lg md:text-xl font-semibold text-black mb-3">
                      Agent-assisted
                    </h4>
                    <p className="font-body text-sm md:text-base text-black/70 mb-4">
                      Let your business agent guide you
                    </p>
                    {/* Code snippet */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 overflow-hidden">
                      {/* Header with Copy button */}
                      <div className="flex items-center justify-between px-3 py-1.5 bg-[#252525] border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                          </div>
                          <span className="text-gray-400 text-xs font-mono ml-2">skill URL</span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-xs font-mono"
                          aria-label="Copy code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{copied ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                      <pre className="bg-[#1a1a1a] text-[#e0e0e0] p-2 md:p-3 overflow-x-auto text-xs md:text-sm font-mono">
                        <code>{agentOwnersCodeContent}</code>
                      </pre>
                    </div>
                  </div>
                  
                  {/* Manual setup card */}
                  <div className="bg-white border border-border/20 rounded-lg p-4 md:p-6 flex flex-col h-full">
                    <h4 className="font-body text-lg md:text-xl font-semibold text-black mb-3">
                      Manual
                    </h4>
                    <p className="font-body text-sm md:text-base text-black/70 mb-4">
                      Complete the onboarding step by step from your dashboard
                    </p>
                    <a
                      href="/book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border-2 font-semibold py-1.5 px-4 text-xs md:text-sm transition-colors hover:opacity-90 w-full flex items-center justify-center bg-transparent"
                      style={{ borderColor: '#7A1FFF', color: '#7A1FFF' }}
                    >
                      Go to dashboard
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-black">
                {/* 3 points - box with number above, text below */}
                <div className="flex items-start justify-between w-full mt-4 md:mt-6 mb-8 md:mb-12 gap-4">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3"
                      style={{ backgroundColor: '#7A1FFF' }}
                    >
                      1
                    </div>
                    <p className="font-body text-base md:text-lg text-center text-black">
                      <strong>Create</strong> your account
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3"
                      style={{ backgroundColor: '#7A1FFF' }}
                    >
                      2
                    </div>
                    <p className="font-body text-base md:text-lg text-center text-black">
                    <strong>Set pricing</strong> and <strong>access</strong> rules
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-white text-2xl md:text-3xl mb-3"
                      style={{ backgroundColor: '#7A1FFF' }}
                    >
                      3
                    </div>
                    <p className="font-body text-base md:text-lg text-center text-black">
                      <strong>Embed the SDK </strong> into your codebase
                    </p>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-body text-xl md:text-2xl font-bold text-black mb-2 md:mb-3">
                  Choose your setup mode
                </h3>
                
                {/* Two symmetric cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
                  {/* Agent-assisted setup card */}
                  <div className="bg-white border border-border/20 rounded-lg p-4 md:p-6 flex flex-col h-full">
                    <h4 className="font-body text-lg md:text-xl font-semibold text-black mb-3">
                      Agent-assisted
                    </h4>
                    <p className="font-body text-sm md:text-base text-black/70 mb-4">
                    Let your coding agent guide you
                    </p>
                    {/* Code snippet */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-[#252525] border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                          </div>
                          <span className="text-gray-400 text-xs font-mono ml-2">skill URL</span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-xs font-mono"
                          aria-label="Copy code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{copied ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                      <pre className="bg-[#1a1a1a] text-[#e0e0e0] p-2 md:p-3 overflow-x-auto text-xs md:text-sm font-mono">
                        <code>{saasCodeContent}</code>
                      </pre>
                    </div>
                  </div>
                  
                  {/* Manual setup card */}
                  <div className="bg-white border border-border/20 rounded-lg p-4 md:p-6 flex flex-col h-full">
                    <h4 className="font-body text-lg md:text-xl font-semibold text-black mb-3">
                      Manual
                    </h4>
                    <p className="font-body text-sm md:text-base text-black/70 mb-4">
                      Complete the onboarding step by step from your dashboard.
                    </p>
                    <a
                      href="/book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border-2 font-semibold py-1.5 px-4 text-xs md:text-sm transition-colors hover:opacity-90 w-full flex items-center justify-center bg-transparent"
                      style={{ borderColor: '#7A1FFF', color: '#7A1FFF' }}
                    >
                      Go to dashboard
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
