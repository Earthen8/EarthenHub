import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary/30">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px] animate-pulse" />

      <main className="relative flex flex-col items-center justify-center min-h-screen px-6">
        <nav className="absolute top-0 w-full flex items-center justify-between py-8 px-12 max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <span className="text-xl font-bold tracking-tight">EarthenHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#" className="hover:text-foreground transition-colors">Solutions</a>
            <a href="#" className="hover:text-foreground transition-colors">Company</a>
            <button className="px-5 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </nav>

        <section className="flex flex-col items-center text-center max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-primary mb-4 border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NEXT.JS 15 READY
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text">
            Architecting the Future <br /> of Modern Web
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            EarthenHub is a premium template designed for high-performance applications. 
            Experience the synergy of speed, aesthetics, and developer experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Start Building
            </button>
            <button className="px-8 py-4 rounded-xl glass font-semibold hover:bg-white/5 transition-colors border-white/10">
              View Documentation
            </button>
          </div>
        </section>

        {/* Feature Cards Preview */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {[
            { title: "Ultra Performance", desc: "Optimized for Core Web Vitals from day one.", icon: "⚡" },
            { title: "Modern Stack", desc: "Built with Next.js 15, Tailwind, and TypeScript.", icon: "🎨" },
            { title: "Global Scale", desc: "Deploy to the edge with seamless Vercel integration.", icon: "🌍" }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl glass hover:border-primary/50 transition-colors group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        <footer className="mt-32 pb-12 text-sm text-muted-foreground">
          © {new Date().getFullYear()} EarthenHub. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
