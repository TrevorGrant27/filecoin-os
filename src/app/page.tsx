"use client";

import React, { useEffect, useState, useCallback } from "react";

// ============================================
// TYPES
// ============================================
interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function generateStars(count: number): StarData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ============================================
// COMPONENTS
// ============================================

function Stars({ data, opacity }: { data: StarData[]; opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity,
        transition: "opacity 1s ease",
      }}
    >
      {data.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

function RocketShip({ glowIntensity }: { glowIntensity: number }) {
  const flameHeight = 28 + glowIntensity * 48;
  const glowHeight = 36 + glowIntensity * 72;
  const showFlame = glowIntensity > 0.01;

  return (
    <div style={{ position: "relative" }}>
      <svg
        width={56}
        height={72}
        viewBox="0 0 48 64"
        style={{
          filter:
            glowIntensity > 0.3
              ? `drop-shadow(0 0 ${20 * glowIntensity}px rgba(95,180,247,${0.4 * glowIntensity}))`
              : undefined,
        }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="14" y1="20" x2="34" y2="20">
            <stop offset="0%" stopColor="#2a3f55" />
            <stop offset="50%" stopColor="#3d5a7a" />
            <stop offset="100%" stopColor="#2a3f55" />
          </linearGradient>
          <linearGradient id="noseGrad" x1="24" y1="2" x2="24" y2="20">
            <stop offset="0%" stopColor="#5fb4f7" />
            <stop offset="100%" stopColor="#3d5a7a" />
          </linearGradient>
          <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d5a7a" />
            <stop offset="100%" stopColor="#1a2a3a" />
          </linearGradient>
        </defs>
        <ellipse cx="24" cy="20" rx="10" ry="18" fill="url(#bodyGrad)" />
        <path d="M24 2 L34 20 L14 20 Z" fill="url(#noseGrad)" />
        <circle cx="24" cy="18" r="4" fill="#0a1628" stroke="#5fb4f7" strokeWidth="1" />
        <circle cx="24" cy="18" r="2" fill="rgba(95,180,247,0.3)" />
        <path d="M14 35 L8 48 L14 42 Z" fill="url(#finGrad)" />
        <path d="M34 35 L40 48 L34 42 Z" fill="url(#finGrad)" />
        <rect x="18" y="36" width="12" height="6" rx="1" fill="#1a2a3a" />
      </svg>

      {showFlame && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            transform: "translateX(-50%)",
            marginTop: -8,
          }}
        >
          <div
            style={{
              width: 18,
              height: flameHeight,
              background:
                "linear-gradient(to bottom, #5fb4f7 0%, #7fcfff 20%, #fbbf24 40%, #f97316 60%, transparent 100%)",
              borderRadius: "0 0 50% 50%",
              opacity: 0.9,
              filter: `blur(${1 + glowIntensity}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 36,
              height: glowHeight,
              background:
                "radial-gradient(ellipse at center top, rgba(95,180,247,0.4) 0%, rgba(251,191,36,0.2) 30%, transparent 70%)",
              filter: "blur(10px)",
              opacity: glowIntensity,
            }}
          />
        </div>
      )}
    </div>
  );
}

function Background({
  starsOpacity,
  atmosphereOpacity,
  stars,
}: {
  starsOpacity: number;
  atmosphereOpacity: number;
  stars: StarData[];
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Deep space */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 50% 100%, #0a1628 0%, #030014 50%, #000008 100%)",
          opacity: starsOpacity,
          transition: "opacity 0.7s ease",
        }}
      />

      {/* Stars layer */}
      <Stars data={stars} opacity={starsOpacity} />

      {/* Atmosphere */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, #0a1628 0%, #162544 30%, #1e3a5f 50%, #2d4a6f 70%, #1a3352 100%)",
          opacity: atmosphereOpacity,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(95,180,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(95,180,247,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1100,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      {children}
    </div>
  );
}

function SectionWrapper({
  children,
  paddingY = 128,
}: {
  children: React.ReactNode;
  paddingY?: number;
}) {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}

function Pill({
  children,
  variant = "blue",
}: {
  children: React.ReactNode;
  variant?: "blue" | "red" | "green";
}) {
  const colors = {
    blue: { bg: "rgba(95,180,247,0.1)", border: "rgba(95,180,247,0.3)", text: "#5fb4f7" },
    red: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", text: "#f87171" },
    green: { bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)", text: "#4ade80" },
  };
  const c = colors[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 9999,
        color: c.text,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          backgroundColor: c.text,
          borderRadius: "50%",
        }}
      />
      {children}
    </span>
  );
}

function ContentCard({
  children,
  accentColor = "blue",
}: {
  children: React.ReactNode;
  accentColor?: "blue" | "red";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverBorder = accentColor === "red" ? "rgba(248,113,113,0.4)" : "rgba(95,180,247,0.4)";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "rgba(12,24,41,0.8)",
        border: `1px solid ${isHovered ? hoverBorder : "rgba(30,58,95,0.4)"}`,
        borderRadius: 20,
        padding: "36px 40px",
        transition: "border-color 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// PAGE SECTIONS
// ============================================

function HeroSection() {
  return (
    <SectionWrapper paddingY={0}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            backgroundColor: "rgba(10,22,40,0.6)",
            border: "1px solid #1e3a5f",
            borderRadius: 9999,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#5fb4f7",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              color: "#5fb4f7",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Filecoin Ecosystem
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(56px, 12vw, 140px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 32,
          }}
        >
          Strategy
          <br />
          Launchpad
        </h1>

        <p
          style={{
            fontSize: "clamp(20px, 3vw, 32px)",
            color: "#8ba4c4",
            fontWeight: 300,
            lineHeight: 1.5,
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 64,
          }}
        >
          Without strategy, even the best technology ends up invisible.
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 24px",
            border: "1px solid rgba(30,58,95,0.5)",
            borderRadius: 9999,
            color: "#5a7a9a",
            fontSize: 14,
          }}
        >
          <span>Scroll to begin</span>
          <span style={{ fontSize: 18 }}>↓</span>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProblemSection() {
  const problems = [
    {
      main: "You've built something powerful on Filecoin",
      sub: "but struggle to explain why anyone should care",
    },
    {
      main: "You compete on price or technical specs",
      sub: "because you can't articulate your real differentiation",
    },
    {
      main: "Your pitch deck explains what you do, not why it matters",
      sub: "so enterprise clients tune out",
    },
    {
      main: "You got the grant, shipped the code",
      sub: "but adoption is painfully slow",
    },
    {
      main: "You're doing everything right technically",
      sub: "yet still feel like you're shouting into the void",
    },
  ];

  return (
    <SectionWrapper>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Pill variant="red">Sound familiar?</Pill>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {problems.map((item, index) => (
          <ContentCard key={index} accentColor="red">
            <p
              style={{
                fontSize: "clamp(18px, 2.5vw, 32px)",
                fontWeight: 500,
                color: "#ffffff",
                lineHeight: 1.4,
                marginBottom: 8,
              }}
            >
              {item.main}
            </p>
            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 22px)",
                color: "#5a7a9a",
                lineHeight: 1.5,
              }}
            >
              {item.sub}
            </p>
          </ContentCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

function RealitySection() {
  return (
    <SectionWrapper>
      <div
        style={{
          backgroundColor: "rgba(12,24,41,0.5)",
          border: "1px solid rgba(30,58,95,0.4)",
          borderRadius: 32,
          padding: "clamp(40px, 8vw, 80px)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(18px, 2.5vw, 30px)",
            color: "#8ba4c4",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 48,
          }}
        >
          The Filecoin ecosystem has funded hundreds of teams through ProPGF, RetroPGF, and dev
          grants.
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(30,58,95,0.5)",
            borderBottom: "1px solid rgba(30,58,95,0.5)",
            padding: "48px 0",
            marginBottom: 48,
          }}
        >
          <p
            style={{
              fontSize: "clamp(28px, 5vw, 64px)",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            The technology is world-class.
          </p>
        </div>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 26px)",
            color: "#5a7a9a",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          But brilliant infrastructure with unclear positioning means slower adoption, lower
          visibility, and reduced ecosystem impact.
        </p>
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 26px)",
            fontWeight: 500,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.6,
            marginTop: 16,
          }}
        >
          The network can't grow if no one understands why they need it.
        </p>
      </div>
    </SectionWrapper>
  );
}

function VisionSection() {
  return (
    <SectionWrapper>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 48 }}>
          <Pill variant="green">Imagine</Pill>
        </div>

        <p
          style={{
            fontSize: "clamp(22px, 4vw, 56px)",
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.3,
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Every storage provider, FVM builder, and infrastructure team could articulate exactly{" "}
          <span style={{ color: "#4ade80" }}>why their solution matters</span>
        </p>

        <p
          style={{
            fontSize: "clamp(22px, 4vw, 56px)",
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.3,
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 24,
          }}
        >
          — and <span style={{ color: "#4ade80" }}>why enterprises should choose Filecoin</span>.
        </p>
      </div>
    </SectionWrapper>
  );
}

function SolutionSection() {
  const benefits = [
    {
      icon: "◇",
      title: "Crystal clear positioning",
      desc: "Explain your value in one sentence. No more fumbled pitches.",
    },
    {
      icon: "↗",
      title: "Faster adoption",
      desc: "When the message is right, users and enterprises show up.",
    },
    {
      icon: "◎",
      title: "Inbound demand",
      desc: "Stop chasing. Start attracting the right customers.",
    },
    {
      icon: "◈",
      title: "Premium pricing",
      desc: "Compete on value, not price. Escape the race to the bottom.",
    },
  ];

  return (
    <SectionWrapper>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ marginBottom: 24 }}>
          <Pill variant="blue">The missing layer</Pill>
        </div>

        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 52px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: 900,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 24,
          }}
        >
          Strategic clarity is the missing layer
          <span style={{ color: "#5fb4f7" }}> in the Filecoin stack.</span>
        </h2>

        <p style={{ fontSize: "clamp(16px, 1.5vw, 22px)", color: "#5a7a9a" }}>
          Get this right, and everything else gets easier:
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {benefits.map((item, index) => (
          <ContentCard key={index}>
            <div style={{ fontSize: 48, color: "#5fb4f7", marginBottom: 20 }}>{item.icon}</div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: 12,
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: 17, color: "#5a7a9a", lineHeight: 1.6 }}>{item.desc}</p>
          </ContentCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

function CTASection() {
  const audiences = [
    "Storage Providers",
    "FVM Builders",
    "ProPGF Recipients",
    "RetroPGF Recipients",
    "Infrastructure Teams",
  ];

  return (
    <SectionWrapper>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 40 }}>
          <Pill variant="blue">You've arrived</Pill>
        </div>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 68px)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 32,
          }}
        >
          Welcome to strategic clarity.
        </h2>

        <p
          style={{
            fontSize: "clamp(17px, 2vw, 26px)",
            color: "#8ba4c4",
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 48,
          }}
        >
          The Filecoin Strategy Launchpad brings enterprise-grade strategy methodology to ecosystem
          teams — so you can turn technical excellence into market traction.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginBottom: 48,
          }}
        >
          {audiences.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "10px 20px",
                fontSize: 15,
                color: "#8ba4c4",
                backgroundColor: "rgba(10,22,40,0.6)",
                border: "1px solid rgba(30,58,95,0.6)",
                borderRadius: 9999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p style={{ fontSize: 15, color: "#3a5a7a", marginTop: 48 }}>
          Powered by Jayne & Clarity University
        </p>
      </div>
    </SectionWrapper>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stars, setStars] = useState<StarData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStars(generateStars(120));
  }, []);

  const handleScroll = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = clamp(window.scrollY / docHeight, 0, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Derived animation values
  const rocketBottom = Math.pow(scrollProgress, 0.8) * 85 + 5;
  const atmosphereOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const starsOpacity = clamp((scrollProgress - 0.2) * 2, 0, 1);
  const engineGlow = Math.min(1, scrollProgress * 3);
  const arrivedVisible = scrollProgress > 0.85;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#030014",
        color: "#e8f1f8",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Background layers */}
      {isClient && (
        <Background
          stars={stars}
          starsOpacity={starsOpacity}
          atmosphereOpacity={atmosphereOpacity}
        />
      )}

      {/* Fixed rocket (desktop only) */}
      <div
        style={{
          position: "fixed",
          right: "6%",
          bottom: `${rocketBottom}%`,
          zIndex: 50,
          transition: "bottom 75ms ease-out",
          display: isClient && window.innerWidth >= 1280 ? "block" : "none",
        }}
      >
        <RocketShip glowIntensity={engineGlow} />
      </div>

      {/* Arrival indicator */}
      <div
        style={{
          position: "fixed",
          top: 48,
          right: 48,
          zIndex: 50,
          opacity: arrivedVisible ? 1 : 0,
          transform: `translateY(${arrivedVisible ? 0 : -20}px)`,
          transition: "all 0.5s ease",
          display: isClient && window.innerWidth >= 1280 ? "flex" : "none",
          alignItems: "center",
          gap: 10,
          color: "#5fb4f7",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#4ade80",
            borderRadius: "50%",
          }}
        />
        DESTINATION REACHED
      </div>

      {/* Main content */}
      <main style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <HeroSection />
        <ProblemSection />
        <RealitySection />
        <VisionSection />
        <SolutionSection />
        <CTASection />
      </main>
    </div>
  );
}
