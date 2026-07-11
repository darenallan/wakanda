import { Toaster } from 'sonner';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { FloorPlan } from './components/floor-plan';
import { MenuCarousel } from './components/menu-carousel';
import { SoulSection } from './components/soul-section';
import { Footer } from './components/footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <FloorPlan />
        <MenuCarousel />
        <SoulSection />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--card)',
            border: '1px solid var(--gold)',
            color: 'var(--foreground)',
          },
        }}
      />
    </div>
  );
}
