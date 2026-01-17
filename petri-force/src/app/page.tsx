import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen p-6 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen opacity-20" />
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-transparent via-white/5 to-transparent h-[1px] w-full mb-8 opacity-20" />

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Petri Force
          </h1>
          <p className="text-white/50 text-sm">Control your impulse.</p>
        </header>

        <Dashboard />
      </div>
    </main>
  );
}
