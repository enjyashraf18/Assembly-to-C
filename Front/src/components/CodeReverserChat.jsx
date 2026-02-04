import React, { useState, useRef, useEffect } from "react";
import { 
  BrainCircuit, 
  ChevronDown, 
  Copy, 
  Check, 
  User, 
  Bot,
  Send,
  ArrowLeft,
  Zap,
  Shield,
  Globe,
  CheckCircle2,
  Cpu,
  Terminal,
  Code2,
  Book,
  Layers,
  Search,
  Key
} from 'lucide-react';


import DEEPSEEK_ICON from "../deliverables/DeepSeek_logo_icon.png";
import QWEN_ICON from "../deliverables/Qwen-Ai-Logo-PNG-Vector.png";


const getModelIcon = (name, size = "w-5 h-5") => {
  if (name === "DeepSeek Coder") return <img src={DEEPSEEK_ICON} alt="DeepSeek" className={`${size} object-contain`} />;
  if (name === "Qwen Coder") return <img src={QWEN_ICON} alt="Qwen" className={`${size} object-contain`} />;
  return null; 
};


const CodeWithLineNumbers = ({ code, textColor = "text-gray-300" }) => {
  const lines = code ? code.split("\n") : [];
  return (
    <div className="flex gap-4 font-mono text-sm leading-relaxed overflow-x-auto">
      <div className="flex flex-col text-right select-none text-gray-600/50 min-w-[1.5rem]">
        {lines.map((_, i) => <span key={i}>{i + 1}.</span>)}
      </div>
      <div className={`flex flex-col whitespace-pre ${textColor}`}>
        {lines.map((line, i) => <span key={i} className="min-h-[1.5em]">{line || " "}</span>)}
      </div>
    </div>
  );
};

//feature page
const FeaturesPage = ({ onBack }) => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "Multi-Architecture Support",
      desc: "Seamlessly reverse engineer x86, x64, ARM, MIPS, and RISC-V assembly code into high-level C/C++."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      title: "LLM-Powered Context",
      desc: "Leverages DeepSeek V2 and Qwen 2.5 to understand variable naming context, not just direct translation."
    },
    {
      icon: <Shield className="w-6 h-6 text-teal-400" />,
      title: "Vulnerability Scanning",
      desc: "Automatically detects buffer overflows, memory leaks, and logic flaws during the decompilation process."
    },
    {
      icon: <Terminal className="w-6 h-6 text-pink-400" />,
      title: "CLI & API Integration",
      desc: "Integrate CodeReverse into your CI/CD pipeline or use our CLI tool for local batch processing."
    },
    {
      icon: <Layers className="w-6 h-6 text-yellow-400" />,
      title: "Symbol Reconstruction",
      desc: "Smart algorithms predict function names and variable types even when symbols are stripped from the binary."
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      title: "IDE Extensions",
      desc: "Direct plugins for VS Code, IDA Pro, and Ghidra to bring AI assistance directly into your workflow."
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pt-10 pb-20 animate-fade-in px-6">
      {/* BACK BUTTON */}
      <div className="w-full flex justify-start mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </button>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-6">
          Beyond Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Decompilation</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We combine traditional static analysis with state-of-the-art Large Language Models to reconstruct code that is not just compilable, but readable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="group p-6 rounded-2xl bg-[#0b0b0f] border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300">
            <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit group-hover:bg-white/10 transition-colors">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 border-t border-white/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
           <div className="text-3xl font-bold text-white mb-1">10B+</div>
           <div className="text-gray-500 text-sm uppercase tracking-wider">Instructions Processed</div>
        </div>
        <div>
           <div className="text-3xl font-bold text-white mb-1">98%</div>
           <div className="text-gray-500 text-sm uppercase tracking-wider">Syntax Accuracy</div>
        </div>
        <div>
           <div className="text-3xl font-bold text-white mb-1">12+</div>
           <div className="text-gray-500 text-sm uppercase tracking-wider">Architectures</div>
        </div>
        <div>
           <div className="text-3xl font-bold text-white mb-1">24/7</div>
           <div className="text-gray-500 text-sm uppercase tracking-wider">Uptime</div>
        </div>
      </div>
    </div>
  );
};

//docs Page
const DocsPage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("quickstart");

  return (
    <div className="w-full max-w-7xl mx-auto pt-10 pb-20 animate-fade-in px-6">
       {/* BACK BUTTON */}
       <div className="w-full flex justify-start mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </button>
      </div>

      <div className="flex gap-12">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-32 h-fit">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Getting Started</h3>
            <nav className="flex flex-col gap-1">
            <button onClick={() => setActiveTab("quickstart")} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'quickstart' ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                Quick Start
            </button>
            <button onClick={() => setActiveTab("supported")} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'supported' ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                Supported Architectures
            </button>
            </nav>

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 mt-8 px-2">Developers</h3>
            <nav className="flex flex-col gap-1">
            <button onClick={() => setActiveTab("api")} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'api' ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                API Reference
            </button>
            <button onClick={() => setActiveTab("cli")} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'cli' ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                CLI Usage
            </button>
            </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-h-[500px]">
            {activeTab === "quickstart" && (
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-6">Quick Start Guide</h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                CodeReverse AI helps you translate low-level assembly code into high-level C/C++ representations using advanced LLMs. Follow these steps to generate your first translation.
                </p>
                
                <div className="space-y-8">
                <div className="bg-[#0b0b0f] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Search className="w-5 h-5"/></div>
                    <h3 className="text-lg font-semibold text-white">1. Input Assembly</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Paste your raw assembly instructions into the bottom text bar. We support standard syntax from tools like OBJ-DUMP, IDA, or Ghidra.</p>
                    <div className="bg-black rounded-lg p-4 font-mono text-xs text-gray-500 border border-white/5">
                    mov r0, #1<br/>
                    add r0, r0, #1<br/>
                    bx lr
                    </div>
                </div>

                <div className="bg-[#0b0b0f] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-lg text-teal-400"><BrainCircuit className="w-5 h-5"/></div>
                    <h3 className="text-lg font-semibold text-white">2. Select Model</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                    Click the model selector in the input bar. 
                    <br/><br/>
                    <span className="text-purple-300">DeepSeek Coder</span> is best for complex logic and large functions.<br/>
                    <span className="text-teal-300">Qwen Coder</span> is optimized for speed and standard snippets.
                    </p>
                </div>
                </div>
            </div>
            )}

            {activeTab === "api" && (
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-6">API Reference</h1>
                <p className="text-gray-400 mb-6">
                Automate your reverse engineering workflow using our REST API.
                </p>

                <div className="bg-[#1e1e24] rounded-lg overflow-hidden border border-white/10 mb-8">
                <div className="bg-black/50 px-4 py-2 flex justify-between items-center border-b border-white/10">
                    <span className="text-xs text-gray-500 font-mono">POST /v1/reverse</span>
                    <span className="text-xs text-green-400 font-mono">HTTPS</span>
                </div>
                <div className="p-6 overflow-x-auto">
                    <pre className="text-sm font-mono text-blue-300">
                    <span className="text-purple-400">curl</span> -X POST https://api.codereverse.ai/v1/reverse \<br/>
                    &nbsp;&nbsp;-H <span className="text-green-300">"Authorization: Bearer YOUR_API_KEY"</span> \<br/>
                    &nbsp;&nbsp;-H <span className="text-green-300">"Content-Type: application/json"</span> \<br/>
                    &nbsp;&nbsp;-d <span className="text-yellow-300">{'\'{\''}</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-300">"model":</span> <span className="text-green-300">"deepseek-coder"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-300">"assembly":</span> <span className="text-green-300">"mov eax, 1\nret"</span><br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">{'}\''}</span>
                    </pre>
                </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Response Object</h3>
                <table className="w-full text-left text-sm text-gray-400">
                <thead className="border-b border-white/10">
                    <tr>
                    <th className="py-2">Field</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-white/5">
                    <td className="py-3 font-mono text-purple-300">code</td>
                    <td className="py-3">string</td>
                    <td className="py-3">The generated C code</td>
                    </tr>
                    <tr className="border-b border-white/5">
                    <td className="py-3 font-mono text-purple-300">confidence</td>
                    <td className="py-3">float</td>
                    <td className="py-3">0.0 to 1.0 probability score</td>
                    </tr>
                    <tr>
                    <td className="py-3 font-mono text-purple-300">tokens</td>
                    <td className="py-3">int</td>
                    <td className="py-3">Total tokens consumed</td>
                    </tr>
                </tbody>
                </table>
            </div>
            )}

            {(activeTab === "supported" || activeTab === "cli") && (
            <div className="animate-fade-in flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-xl bg-white/5">
                <Book className="w-12 h-12 text-gray-600 mb-4" />
                <p className="text-gray-400">Documentation content loading...</p>
            </div>
            )}

        </div>
      </div>
    </div>
  );
};

// Pricing Page
const PricingPage = ({ onBack }) => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-10 pb-20 animate-fade-in">
      {/* back to chat */}
      <div className="w-full flex justify-start mb-8 px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </button>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Plans & Pricing</h2>
        <p className="text-gray-400 text-lg">Supercharge your reverse engineering workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        {/* free */}
        <div className="border border-white/10 bg-[#0b0b0f] rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <Globe className="w-6 h-6 text-gray-400" />
                <h3 className="text-xl font-bold text-white">Hub</h3>
            </div>
            <p className="text-gray-400 text-sm">For hobbyists and students.</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-bold text-white">$0</span>
            <span className="text-gray-500">/mo</span>
          </div>
          <ul className="flex-1 space-y-4 mb-8">
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gray-500 mt-0.5" /> 
                Access to basic models (Qwen 7B)
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gray-500 mt-0.5" /> 
                Public generation history
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gray-500 mt-0.5" /> 
                Standard inference speed
            </li>
          </ul>
          <button className="w-full py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
            Get Started
          </button>
        </div>

        {/* pro*/}
        <div className="relative border border-purple-500 bg-[#120d1d] rounded-2xl p-8 flex flex-col shadow-2xl shadow-purple-900/20 transform md:-translate-y-4">
          <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            POPULAR
          </div>
          <div className="mb-6">
             <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Pro</h3>
             </div>
            <p className="text-purple-200/60 text-sm">For professional engineers.</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-bold text-white">$9</span>
            <span className="text-gray-500">/mo</span>
          </div>
          <ul className="flex-1 space-y-4 mb-8">
            <li className="flex items-start gap-3 text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" /> 
                <strong>DeepSeek Coder V2</strong> Access
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" /> 
                Private mode (Zero data retention)
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" /> 
                Larger context window (128k)
            </li>
          </ul>
          <button className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/25">
            Upgrade to Pro
          </button>
        </div>

        {/*enterprice */}
        <div className="border border-white/10 bg-[#0b0b0f] rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
          <div className="mb-6">
             <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
             </div>
            <p className="text-gray-400 text-sm">For security teams & orgs.</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-bold text-white">$29</span>
            <span className="text-gray-500">/user/mo</span>
          </div>
          <ul className="flex-1 space-y-4 mb-8">
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" /> 
                SSO & SAML Login
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" /> 
                On-premise deployment
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" /> 
                Custom fine-tuned models
            </li>
          </ul>
          <button className="w-full py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};


const InputPill = ({ 
  inputAssembly, 
  setInputAssembly, 
  onKeyDown, 
  handleSubmit, 
  modelOpen, 
  setModelOpen, 
  selectedModel, 
  handleSelectModel, 
  textareaRef, 
  variant 
}) => {
  return (
    <div 
      className={`relative w-full group transition-all duration-500 ${variant === 'fixed' ? 'max-w-3xl mx-auto' : ''}`}
      style={{ boxShadow: "0 0 40px -10px rgba(168, 85, 247, 0.15)" }}
    >
      <div className="w-full flex items-end bg-black border border-purple-900/60 rounded-3xl px-6 py-4 transition-all duration-300 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500/50">
        
        <textarea
          ref={textareaRef}
          value={inputAssembly}
          onChange={(e) => setInputAssembly(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder:text-gray-500 resize-none py-0 overflow-hidden font-mono text-sm mb-1"
          placeholder="Type or paste assembly code..."
          style={{ minHeight: '1.5rem', maxHeight: '150px' }} 
        />

        <div className="w-px h-6 bg-gray-800 mx-4 mb-1"></div>

        <div className="flex items-center gap-3 mb-0.5">
          <div className="relative shrink-0">
            <button
              onClick={() => setModelOpen(!modelOpen)}
              className="flex items-center gap-2 text-white font-semibold hover:text-purple-300 transition-colors text-sm"
            >
              {getModelIcon(selectedModel)}
              <span>{selectedModel}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${modelOpen ? 'rotate-180' : ''}`} />
            </button>

            {modelOpen && (
              <div className={`absolute right-0 w-56 bg-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20 z-50 p-1 ${variant === 'fixed' ? 'bottom-full mb-4' : 'top-full mt-4'}`}>
                <button onClick={() => handleSelectModel("DeepSeek Coder")} className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors rounded-lg group">
                  <img src={DEEPSEEK_ICON} alt="DeepSeek" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100" />
                  <span>DeepSeek Coder</span>
                </button>
                <button onClick={() => handleSelectModel("Qwen Coder")} className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors rounded-lg group">
                  <img src={QWEN_ICON} alt="Qwen" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100" />
                  <span>Qwen Coder</span>
                </button>
              </div>
            )}
          </div>

          {inputAssembly.trim().length > 0 && (
            <button onClick={handleSubmit} className="p-1 text-purple-500 hover:text-purple-300 transition-colors animate-fade-in">
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ item }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(item.generatedC);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-8 animate-fade-in mb-12 border-b border-white/5 pb-12 last:border-0 last:pb-0">
      <div className="relative w-full">
        <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-teal-500 via-cyan-500 to-transparent w-full">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 min-h-[100px]">
                <CodeWithLineNumbers code={item.assembly} textColor="text-teal-100/90" />
            </div>
        </div>
        <div className="absolute -right-12 top-0 hidden md:block">
           <div className="text-teal-500 bg-teal-500/10 p-2 rounded-full border border-teal-500/20">
              <User className="w-6 h-6" />
           </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute -left-12 top-0 hidden md:block">
            <div className="text-purple-500 bg-purple-500/10 p-2 rounded-full border border-purple-500/20">
                <Bot className="w-6 h-6" />
            </div>
        </div>
        <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-purple-600 via-pink-500 to-transparent shadow-2xl shadow-purple-900/10 w-full">
            <div className="bg-[#0b0b0f] rounded-2xl overflow-hidden min-h-[200px] relative">
                <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-2 text-purple-300">
                        {getModelIcon(item.model, "w-4 h-4")}
                        <span className="text-sm font-semibold tracking-wide">{item.model}</span>
                    </div>
                    <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-gray-400 hover:text-white transition-all text-xs border border-white/10">
                        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Copied" : "Copy Code"}
                    </button>
                </div>
                <div className="p-6">
                    <CodeWithLineNumbers code={item.generatedC} textColor="text-purple-100/90" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};


export default function CodeReverserChat() {
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Select model");
  const [view, setView] = useState("chat"); 
  const [inputAssembly, setInputAssembly] = useState("");
  const [history, setHistory] = useState([]);
  const [stage, setStage] = useState("initial"); 
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputAssembly]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleSelectModel = (m) => {
    setSelectedModel(m);
    setModelOpen(false);
  };
 

  // the connection with back here : I take the assembly and the model 
  const mockGenerateC = (asm, model) => {
    return `// Generated C code from ${model}\n// Source Assembly Length: ${asm.length} chars\n#include \"stm32f4xx_hal.h\"\n\nvoid LED_Init(void) {\n    GPIO_InitTypeDef GPIO_InitStruct = {0};\n    \n    __HAL_RCC_GPIOH_CLK_ENABLE();\n    \n    GPIO_InitStruct.Pin = GPIO_PIN_3;\n    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;\n    GPIO_InitStruct.Pull = GPIO_NOPULL;\n    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;\n    HAL_GPIO_Init(GPIOH, &GPIO_InitStruct);\n}\n\nvoid LED_On(void) {\n    HAL_GPIO_WritePin(GPIOH, GPIO_PIN_3, GPIO_PIN_SET);\n}\n\nvoid LED_Off(void) {\n    HAL_GPIO_WritePin(GPIOH, GPIO_PIN_3, GPIO_PIN_RESET);\n}\n\nvoid LED_Toggle(void) {\n    HAL_GPIO_TogglePin(GPIOH, GPIO_PIN_3);\n}"\n`;
  };

  const handleSubmit = () => {
    if (!selectedModel || selectedModel === "Select model" || !inputAssembly.trim()) {
        if(selectedModel === "Select model") alert("Please select a model first.");
        return;
    }
    const generated = mockGenerateC(inputAssembly, selectedModel);
    const newEntry = {
      id: Date.now(),
      assembly: inputAssembly,
      generatedC: generated,
      model: selectedModel
    };
    setHistory(prev => [...prev, newEntry]);
    setInputAssembly("");
    setStage("result");
  };

  const handleBackToSearch = () => {
    setHistory([]);
    setInputAssembly("");
    setStage("initial");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-purple-500/30">
      
 
      <header className="flex items-center justify-between px-8 py-6 z-40 bg-black/80 backdrop-blur-md sticky top-0 border-b border-white/5">
        <button onClick={() => setView("chat")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <BrainCircuit className="w-8 h-8 text-purple-500" />
          <h1 className="text-xl font-bold tracking-wide text-gray-200">
            CODEREVERSE AI
          </h1>
        </button>
        <nav className="hidden sm:flex items-center gap-8 text-gray-400 text-sm font-medium">
          <button onClick={() => setView("features")} className={`hover:text-white transition-colors ${view === 'features' ? 'text-white' : ''}`}>Features</button>
          <button onClick={() => setView("pricing")} className={`hover:text-white transition-colors ${view === 'pricing' ? 'text-white' : ''}`}>Pricing</button>
          <button onClick={() => setView("docs")} className={`hover:text-white transition-colors ${view === 'docs' ? 'text-white' : ''}`}>Docs</button>
        </nav>
      </header>


      <main className="flex-1 flex flex-col items-center px-4 relative">
        
        {view === "pricing" && <PricingPage onBack={() => setView('chat')} />}
        {view === "features" && <FeaturesPage onBack={() => setView('chat')} />}
        {view === "docs" && <DocsPage onBack={() => setView('chat')} />}


        {view === "chat" && (
          <>
            {stage === 'result' && (
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-purple-900/10 blur-[100px] pointer-events-none" />
            )}

            <div className="w-full max-w-4xl flex flex-col items-center animate-fade-in z-10 pt-10">
              
              {stage === "initial" && (
                <div className="w-full flex flex-col items-center mt-20">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="relative">
                      <div className="absolute inset-0 blur-xl bg-purple-600/30 rounded-full"></div>
                      <BrainCircuit className="w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 relative z-10" color="#a855f7" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                      CODEREVERSE AI
                    </h2>
                  </div>
                  
                  <div className="w-full max-w-3xl">
                    <InputPill 
                        inputAssembly={inputAssembly}
                        setInputAssembly={setInputAssembly}
                        onKeyDown={onKeyDown}
                        handleSubmit={handleSubmit}
                        modelOpen={modelOpen}
                        setModelOpen={setModelOpen}
                        selectedModel={selectedModel}
                        handleSelectModel={handleSelectModel}
                        textareaRef={textareaRef}
                        variant="default" 
                    />
                  </div>
                </div>
              )}

              {stage === "result" && (
                <div className="w-full max-w-3xl flex flex-col pb-40">
                  
                  <div className="w-full flex justify-start mb-8">
                    <button 
                      onClick={handleBackToSearch}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to search
                    </button>
                  </div>

                  {history.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                  ))}
                  
                  <div ref={messagesEndRef} />

                  <div className="fixed bottom-10 left-0 right-0 px-4 z-50 pointer-events-none">
                      <div className="pointer-events-auto">
                        <InputPill 
                            inputAssembly={inputAssembly}
                            setInputAssembly={setInputAssembly}
                            onKeyDown={onKeyDown}
                            handleSubmit={handleSubmit}
                            modelOpen={modelOpen}
                            setModelOpen={setModelOpen}
                            selectedModel={selectedModel}
                            handleSelectModel={handleSelectModel}
                            textareaRef={textareaRef}
                            variant="fixed" 
                        />
                      </div>
                  </div>

                </div>
              )}
            </div>
          </>
        )}

      </main>
    </div>
  );
}