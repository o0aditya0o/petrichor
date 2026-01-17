import { CoinBalance } from "@/components/CoinBalance";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background selection:bg-primary/20">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <CoinBalance />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="glass-card p-12 rounded-3xl max-w-md w-full flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
            <span className="text-3xl">💠</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            Petri Force
          </h1>

          <p className="text-white/60 text-lg leading-relaxed">
            Stop the impulse. <br />
            Master your budget.
          </p>
        </div>
      </div>
    </main>
  );
}
