"use client";

import { useEffect, useState } from "react";

// Navigation tree items
const navItems = [
  { id: "home", label: "Home", icon: ">" },
  { id: "about", label: "About", icon: ">" },
  { id: "problem", label: "The Problem", icon: ">", indent: 1 },
  { id: "solution", label: "The Solution", icon: ">", indent: 1 },
  { id: "program", label: "Program", icon: ">" },
  { id: "includes", label: "What's Included", icon: ">", indent: 1 },
  { id: "outcomes", label: "Outcomes", icon: ">", indent: 1 },
  { id: "audience", label: "Who It's For", icon: ">" },
  { id: "team", label: "Team", icon: ">" },
  { id: "contact", label: "Contact", icon: "+" },
  { id: "waitlist", label: "Join Waitlist", icon: "+" },
];

// Mobile menu button
function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden os-button p-2 fixed top-3 left-3 z-50"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className="text-[#5fb4f7]">{isOpen ? "[X]" : "[=]"}</span>
    </button>
  );
}

// Mobile overlay
function MobileOverlay({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  if (!isOpen) return null;
  return (
    <div
      className="lg:hidden fixed inset-0 bg-black/70 z-30"
      onClick={onClick}
    />
  );
}


// Clock component
function Clock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setDate(now.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right font-mono">
      <div className="text-[#e8f1f8]">{date}</div>
      <div className="text-[#b8d4e8]">{time}</div>
    </div>
  );
}

// Menu bar component
function MenuBar({ activeSection }: { activeSection: string }) {
  return (
    <div className="os-menubar">
      <span className="text-[#b8d4e8]">Strategy OS</span>
      <span className="text-[#b8d4e8] ml-auto">
        {activeSection.toUpperCase()}
      </span>
    </div>
  );
}

// Sidebar navigation
function Sidebar({ activeSection, onNavigate, isOpen, onClose, isMobile = true }: { activeSection: string; onNavigate: (id: string) => void; isOpen?: boolean; onClose?: () => void; isMobile?: boolean }) {
  return (
    <div className={`
      os-window h-full flex flex-col
      ${isMobile ? 'fixed inset-y-0 left-0 z-40 w-[280px] transform transition-transform duration-300 ease-in-out' : ''}
      ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
    `}>
      <div className="os-window-header">
        <span className="text-[#5fb4f7]">[&gt;]</span>
        <span className="os-window-title">Filecoin</span>
        {isMobile && (
          <button
            onClick={onClose}
            className="ml-auto text-[#5fb4f7] hover:text-[#7fcfff]"
            aria-label="Close menu"
          >
            [X]
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                if (isMobile) onClose?.();
              }}
              className={`tree-item ${activeSection === item.id ? "active" : ""}`}
              style={{ paddingLeft: item.indent ? `${item.indent * 16 + 12}px` : "12px" }}
            >
              <span className="tree-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// Main content window with grid background
function MainContent({ activeSection }: { activeSection: string }) {
  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <HomeContent />;
      case "about":
      case "problem":
        return <ProblemContent />;
      case "solution":
        return <SolutionContent />;
      case "program":
      case "includes":
        return <ProgramContent />;
      case "outcomes":
        return <OutcomesContent />;
      case "audience":
        return <AudienceContent />;
      case "team":
        return <TeamContent />;
      case "contact":
      case "waitlist":
        return <WaitlistContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="os-window h-full flex flex-col overflow-hidden">
      <MenuBar activeSection={activeSection} />
      <div className="flex-1 overflow-auto grid-bg">
        <div className="p-4 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Home content
function HomeContent() {
  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">FILECOIN STRATEGY OS</span>
      </div>

      <p className="text-[#c8dced] mb-4 leading-relaxed">
        The Strategy OS is a purpose-built public good for the Filecoin ecosystem,
        based on Clarity University - Jayne&apos;s strategic clarity platform.
      </p>

      <p className="text-[#c8dced] mb-4 leading-relaxed">
        User-centered in design, built from 500K data points gathered across 4K small
        businesses and over 72 enterprises including organizations like Coinstar, PepsiCo,
        Mondelēz, Takeda, and American Red Cross.
      </p>

      <p className="text-[#c8dced] mb-8 leading-relaxed">
        It was designed to provide the high-value education, tools, support, and community
        that founders need to develop scalable, repeatable outcomes for emerging, fast-moving,
        technologically adaptive brands.
      </p>

      <p className="text-[#e8f1f8] mb-8">Please explore. :)</p>

      <hr className="os-divider" />

      <DataDisplay />
    </div>
  );
}

// DNA/Data style display component
function DataDisplay() {
  const [dataString, setDataString] = useState("");

  useEffect(() => {
    // Generate random data-like string
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segments: string[] = [];
    for (let i = 0; i < 20; i++) {
      let segment = "";
      for (let j = 0; j < 4; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(segment);
    }
    setDataString(segments.join("-"));
  }, []);

  return (
    <div className="os-card">
      <div className="flex justify-between items-center mb-4 text-xs">
        <span className="text-[#c9d1d9] font-mono">TR{Date.now().toString().slice(0, 13)}</span>
        <span className="text-[#8b949e]">{new Date().toLocaleDateString()}</span>
      </div>
      <div className="os-data leading-relaxed">
        {dataString}
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-[#30363d] p-3">
          <div className="text-[#8b949e] text-xs mb-1">METHODOLOGY</div>
          <div className="text-[#c9d1d9] text-sm">Clarity University</div>
        </div>
        <div className="border border-[#30363d] p-3">
          <div className="text-[#8b949e] text-xs mb-1">DATA POINTS</div>
          <div className="text-[#c9d1d9] text-sm">500,000+</div>
        </div>
        <div className="border border-[#30363d] p-3">
          <div className="text-[#8b949e] text-xs mb-1">STATUS</div>
          <div className="text-[#3fb950] text-sm">ACTIVE</div>
        </div>
      </div>
    </div>
  );
}

// Problem content
function ProblemContent() {
  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">THE PROBLEM</span>
      </div>

      <p className="text-xl text-[#e8f1f8] mb-6">
        Strong technology. <span className="text-[#7da4c9]">Weak positioning.</span>
      </p>

      <p className="text-[#c8dced] mb-4 leading-relaxed">
        The Filecoin ecosystem funds exceptional technical teams through ProPGF, RetroPGF,
        dev grants, and other mechanisms - but many of these teams struggle to articulate
        their value proposition, differentiate from competitors, and reach their target
        audiences effectively.
      </p>

      <p className="text-[#c8dced] mb-6 leading-relaxed">
        This creates a bottleneck: strong technology with weak strategic positioning means
        slower adoption, lower visibility, and reduced ecosystem impact.
      </p>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">The Current Reality</div>

      <div className="space-y-3">
        <div className="os-card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[#e8f1f8] text-lg">$100K+</div>
              <div className="text-[#c8dced] text-sm mt-1">Traditional enterprise strategy consulting cost</div>
            </div>
            <span className="text-[#f87171] text-xs font-semibold">BARRIER</span>
          </div>
        </div>
        <div className="os-card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[#e8f1f8] text-lg">6+ Months</div>
              <div className="text-[#c8dced] text-sm mt-1">Typical timeline for traditional consulting</div>
            </div>
            <span className="text-[#fbbf24] text-xs font-semibold">SLOW</span>
          </div>
        </div>
        <div className="os-card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[#e8f1f8] text-lg">DIY = Generic</div>
              <div className="text-[#c8dced] text-sm mt-1">Self-service produces inconsistent positioning</div>
            </div>
            <span className="text-[#b8d4e8] text-xs font-semibold">INEFFECTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Solution content
function SolutionContent() {
  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">THE SOLUTION</span>
      </div>

      <p className="text-xl text-[#e8f1f8] mb-6">
        Filecoin Strategy OS
      </p>

      <p className="text-[#c8dced] mb-4 leading-relaxed">
        A plug-and-play strategy system designed for fast-moving teams. The exact methodology
        used with Fortune 50 enterprises like PepsiCo, Mondelēz, Takeda, Abbott, and American Red
        Cross—adapted for Filecoin ecosystem teams.
      </p>

      <div className="os-card my-6">
        <div className="flex items-center gap-2">
          <span className="text-[#4ade80]">●</span>
          <span className="text-[#c8dced] text-sm">Built from 500K+ data points across 4K+ businesses</span>
        </div>
      </div>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">System Initialization</div>

      <div className="os-code">
        <p className="text-[#c8dced]">$ ./strategy-os --init</p>
        <p className="text-[#b8d4e8]">→ Loading curriculum...</p>
        <p className="text-[#b8d4e8]">→ Initializing strategy tool...</p>
        <p className="text-[#b8d4e8]">→ Connecting to expert network...</p>
        <p className="text-[#4ade80]">✓ Ready to transform your positioning</p>
        <span className="os-cursor"></span>
      </div>
    </div>
  );
}

// Program content
function ProgramContent() {
  const features = [
    { icon: "▶", title: "Video Course", description: "Complete strategy curriculum detailing the exact methodology used with global brands." },
    { icon: "◈", title: "Strategy Tool", description: "Fill-in-the-blanks interactive workbook: audience, insight, position, promise, story, messaging." },
    { icon: "◉", title: "1-on-1 Feedback", description: "Dedicated time with a Jayne strategist to pressure-test your work and refine your approach." },
    { icon: "∞", title: "Unlimited Q&A", description: "Submit unlimited questions throughout the cohort period. Get expert responses." },
    { icon: "⬡", title: "Group Calls", description: "Intimate sessions with the Jayne team and fellow ecosystem participants." },
    { icon: "◇", title: "Graduate Directory", description: "Searchable directory of program graduates for ecosystem networking." },
  ];

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">PROGRAM DETAILS</span>
      </div>

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">What&apos;s Included</div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="os-card flex gap-4">
            <span className="text-[#5fb4f7] text-lg shrink-0">{feature.icon}</span>
            <div>
              <div className="text-[#e8f1f8] text-sm">{feature.title}</div>
              <div className="text-[#c8dced] text-xs mt-1">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">Expected Outputs</div>

      <div className="os-code text-xs space-y-1">
        <p><span className="text-[#4ade80]">✓</span> <span className="text-[#c8dced]">Filecoin Strategy OS Platform (hosted on Circle)</span></p>
        <p><span className="text-[#4ade80]">✓</span> <span className="text-[#c8dced]">Complete video course with enterprise methodology</span></p>
        <p><span className="text-[#4ade80]">✓</span> <span className="text-[#c8dced]">Fill-in-the-blanks strategy tool (permanent ownership)</span></p>
        <p><span className="text-[#4ade80]">✓</span> <span className="text-[#c8dced]">1-on-1 live feedback session with Jayne strategist</span></p>
        <p><span className="text-[#4ade80]">✓</span> <span className="text-[#c8dced]">Cohort completion and impact reports</span></p>
      </div>
    </div>
  );
}

// Outcomes content
function OutcomesContent() {
  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">OUTCOMES</span>
      </div>

      <p className="text-xl text-[#e8f1f8] mb-6">
        Leave with clarity. <span className="text-[#7da4c9]">And the skills to keep it.</span>
      </p>

      <div className="space-y-4">
        <div className="os-card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#5fb4f7]">→</span>
            <span className="text-[#e8f1f8]">Completed Strategy</span>
          </div>
          <p className="text-[#c8dced] text-sm">
            A documented strategic platform you can execute against—audience, positioning, and messaging.
          </p>
        </div>

        <div className="os-card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#5fb4f7]">↺</span>
            <span className="text-[#e8f1f8]">Mastered Methodology</span>
          </div>
          <p className="text-[#c8dced] text-sm">
            Own the framework forever. Continue to adapt and evolve at the pace right for your business.
          </p>
        </div>

        <div className="os-card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#5fb4f7]">⬡</span>
            <span className="text-[#e8f1f8]">Ecosystem Impact</span>
          </div>
          <p className="text-[#c8dced] text-sm">
            Every team that communicates clearly accelerates Filecoin adoption and network growth.
          </p>
        </div>
      </div>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">Impact Pathway</div>

      <div className="os-code text-xs space-y-2">
        <p><span className="text-[#5fb4f7]">Platform + Curriculum</span> <span className="text-[#c8dced]">→ Teams gain clarity on positioning</span></p>
        <p><span className="text-[#5fb4f7]">Strategy Platforms</span> <span className="text-[#c8dced]">→ Documented strategy to execute against</span></p>
        <p><span className="text-[#5fb4f7]">1-on-1 Feedback</span> <span className="text-[#c8dced]">→ Personalized expert review</span></p>
        <p><span className="text-[#5fb4f7]">Peer Community</span> <span className="text-[#c8dced]">→ Stronger ecosystem coordination</span></p>
      </div>
    </div>
  );
}

// Audience content
function AudienceContent() {
  const audiences = [
    { title: "ProPGF & RetroPGF Recipients", description: "Teams already validated as valuable who need help translating technical work into market traction." },
    { title: "FOC & FVM Projects", description: "Teams building on Filecoin Onchain Cloud and FVM who need clear positioning in competitive markets." },
    { title: "Storage Providers", description: "Operators who want to differentiate their services and attract enterprise clients." },
    { title: "Infrastructure & Tooling Teams", description: "Projects building developer tools, SDKs, and integrations that need to reach target users." },
    { title: "Core Ecosystem Organizations", description: "Teams supporting network growth, developer adoption, and storage provider success." },
  ];

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">WHO IT&apos;S FOR</span>
      </div>

      <p className="text-xl text-[#e8f1f8] mb-6">
        Built for teams building Filecoin.
      </p>

      <p className="text-[#c8dced] mb-6 text-sm">
        We chose these groups because they&apos;ve already demonstrated commitment to the ecosystem.
        Investing in their strategic capabilities creates a multiplier effect.
      </p>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">Target Beneficiaries</div>

      <div className="space-y-2">
        {audiences.map((audience, index) => (
          <div key={index} className="os-card">
            <div className="text-[#e8f1f8] text-sm">{audience.title}</div>
            <div className="text-[#c8dced] text-xs mt-1">{audience.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Team content
function TeamContent() {
  const team = [
    { initials: "BF", name: "Brooke Foley", role: "Program Leader", bio: "Founder and CEO of Jayne and Clarity University. 30 years in strategy. Previously Executive Creative Director at DDB, Razorfish, and Ogilvy." },
    { initials: "TG", name: "Trevor Grant", role: "Ecosystem Liaison & Facilitator", bio: "Deep experience and knowledge in Filecoin Ecosystem. Work with Filecoin Foundation since 2022. Prev. work with Protocol Labs." },
    { initials: "BP", name: "Brad Pierce", role: "Program Facilitator", bio: "Jayne's Chief Strategy Officer. 13+ years leading strategy across startups to Fortune 50 enterprises." },
  ];

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">TEAM</span>
      </div>

      <p className="text-xl text-[#e8f1f8] mb-6">
        Led by world-class strategists.
      </p>

      <div className="space-y-3">
        {team.map((member, index) => (
          <div key={index} className="os-card flex gap-4">
            <div className="os-avatar shrink-0">
              <span>{member.initials}</span>
            </div>
            <div>
              <div className="text-[#e8f1f8] text-sm">{member.name}</div>
              <div className="text-[#5fb4f7] text-xs mb-2">{member.role}</div>
              <div className="text-[#c8dced] text-xs leading-relaxed">{member.bio}</div>
            </div>
          </div>
        ))}
      </div>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">Credentials</div>

      <div className="os-code text-xs text-[#c8dced]">
        <p>Enterprise Clients: Coinstar, PepsiCo, Mondelēz, Takeda, American Red Cross</p>
        <p>Data Points: 500,000+</p>
        <p>Businesses Analyzed: 4,000+</p>
        <p>Enterprise Engagements: 72+</p>
      </div>
    </div>
  );
}

// Waitlist content
function WaitlistContent() {
  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <span className="text-[#7da4c9]">. </span>
        <span className="text-[#e8f1f8]">JOIN WAITLIST</span>
      </div>

      <p className="text-xl text-[#e8f1f8] mb-6">
        Ready to thrive?
      </p>

      <p className="text-[#c8dced] mb-6 text-sm">
        Join the waitlist to be notified when the next cohort opens.
        Limited spots available for Filecoin ecosystem teams.
      </p>

      <div className="my-8">
        <a
          href="https://your-typeform-url.typeform.com/to/XXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="os-button-primary inline-block"
        >
          [+] JOIN THE WAITLIST
        </a>
      </div>

      <p className="text-xs text-[#b8d4e8]">
        Free for qualifying Filecoin ecosystem teams
      </p>

      <hr className="os-divider" />

      <div className="text-xs text-[#b8d4e8] uppercase tracking-wider mb-4">What Happens Next</div>

      <div className="os-code text-xs space-y-1 text-[#c8dced]">
        <p>1. Submit your application via Typeform</p>
        <p>2. We review for ecosystem fit</p>
        <p>3. Selected teams receive cohort invitation</p>
        <p>4. Begin your strategic clarity journey</p>
        <span className="os-cursor"></span>
      </div>
    </div>
  );
}

// Info panel (right side)
function InfoPanel() {
  return (
    <div className="os-window h-full flex flex-col">
      <div className="os-window-header">
        <span>System Info</span>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="os-info-row">
            <span className="os-info-label">Status</span>
            <span className="status-active font-semibold">ACTIVE</span>
          </div>
          <div className="os-info-row">
            <span className="os-info-label">Cohort</span>
            <span className="accent-glow font-semibold">OPEN</span>
          </div>
          <div className="os-info-row">
            <span className="os-info-label">Network</span>
            <span className="os-info-value font-semibold">FILECOIN</span>
          </div>
          <hr className="os-divider" />
          <div className="os-info-row">
            <span className="os-info-label">Provider</span>
            <span className="os-info-value font-semibold">JAYNE</span>
          </div>
          <div className="os-info-row">
            <span className="os-info-label">Method</span>
            <span className="os-info-value font-semibold">CLARITY U</span>
          </div>
        </div>
        <div className="text-xs text-[#7da4c9] text-right font-medium" style={{ textShadow: '0 0 8px rgba(95, 180, 247, 0.3)' }}>
          NO DATA
        </div>
      </div>
    </div>
  );
}

// Marquee
function Marquee() {
  const text = "Strategic Clarity for Filecoin Ecosystem Teams.    ●    Transform Technical Excellence into Market Traction.    ●    ";
  return (
    <div className="os-marquee">
      <div className="os-marquee-content">
        {text.repeat(8)}
      </div>
    </div>
  );
}

// Footer status bar
function StatusBar() {
  return (
    <div className="os-statusbar flex-wrap gap-2">
      <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
        <span className="text-[10px] sm:text-xs">Strategy OS</span>
        <span className="text-[#30363d] hidden sm:inline">|</span>
        <span className="text-[10px] sm:text-xs hidden sm:inline">Powered by Jayne & Clarity University</span>
      </div>
      <Clock />
    </div>
  );
}

// Main Page
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      {/* Mobile menu button */}
      <MobileMenuButton
        isOpen={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Mobile overlay */}
      <MobileOverlay
        isOpen={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile sidebar - fixed overlay, outside grid flow */}
      {mobileMenuOpen && (
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          isMobile={true}
        />
      )}

      {/* Main layout */}
      <div className="flex-1 p-3 flex lg:grid lg:grid-cols-[260px_1fr_180px] gap-3 min-h-0">
        {/* Desktop sidebar - in grid flow, hidden on mobile */}
        <div className="hidden lg:block h-full">
          <Sidebar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            isOpen={true}
            onClose={() => {}}
            isMobile={false}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-h-0">
          <MainContent activeSection={activeSection} />
        </div>

        {/* Right panel - hidden on mobile */}
        <div className="hidden lg:block">
          <InfoPanel />
        </div>
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Status bar */}
      <StatusBar />
    </div>
  );
}
