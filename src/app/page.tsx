import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera, History, Leaf, ShieldCheck, Sprout } from 'lucide-react';
import { NatureDecor } from '@/components/NatureDecor';

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <NatureDecor />
      
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg text-white">
            <Leaf size={24} />
          </div>
          <span className="text-xl font-bold text-primary font-headline">LeafSense AI</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/history" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <History size={16} /> History
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10 py-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 animate-bounce">
            <Sprout size={16} /> Nature-Powered Diagnosis
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight text-slate-800">
            Keep Your Plants <span className="text-primary italic">Thriving</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our AI-powered leaf disease detector helps you identify plant illnesses instantly and provides expert botanical treatment advice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/scan">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 group">
                <Camera className="mr-2" size={20} /> Start Scanning
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg font-bold border-primary/20 hover:bg-primary/5">
                <History className="mr-2" size={20} /> View History
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Icons/Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary">
              <ShieldCheck size={28} />
            </div>
            <p className="font-semibold text-slate-700">95% Accuracy</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary">
              <Sprout size={28} />
            </div>
            <p className="font-semibold text-slate-700">100+ Plant Types</p>
          </div>
          <div className="flex flex-col items-center gap-3 col-span-2 md:col-span-1">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary">
              <Camera size={28} />
            </div>
            <p className="font-semibold text-slate-700">Instant Analysis</p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm relative z-10">
        <p>© 2024 LeafSense AI Detector. Made for plant lovers.</p>
      </footer>
    </div>
  );
}
