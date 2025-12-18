import { Hero } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { EmailSignup } from "@/components/email-signup";

// Asset Imports
import reptigramImg from "@assets/Screenshot_20251216-194219.Chrome_1766052025014.png";
import repfilesImg from "@assets/Screenshot_20251216-123703.Chrome_1766052062680.png";
import marketplaceImg from "@assets/1765885151831_1766052062701.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-white">
            Repti<span className="text-primary">Gram</span>
          </div>
          <a href="#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </header>

      <main>
        <Hero />

        <div className="space-y-12 py-12">
          <FeatureSection
            title="ReptiGram"
            subtitle="The Social Network for Reptile Lovers"
            description="Share your passion with a community that understands. Post updates, follow breeders, and discover amazing morphs from around the world. Built specifically for the herpetology community."
            image={reptigramImg}
            color="hsl(34, 100%, 60%)" // Orange
            badge="Social"
            align="left"
          />

          <FeatureSection
            title="RepFiles"
            subtitle="Professional Collection Management"
            description="Track feeding, breeding, weights, and husbandry with precision. Whether you have one gecko or a thousand snakes, RepFiles keeps your data organized and secure."
            image={repfilesImg}
            color="hsl(145, 65%, 49%)" // Green
            badge="Management"
            align="right"
          />

          <FeatureSection
            title="Marketplace"
            subtitle="Safe & Secure Trading"
            description="The most trusted place to buy and sell reptiles. Verified breeders, secure payments, and a dedicated platform for ethical trading. Find your next dream animal."
            image={marketplaceImg}
            color="hsl(180, 40%, 50%)" // Teal
            badge="Commerce"
            align="left"
          />
        </div>

        {/* CTA Section */}
        <section id="contact" className="py-24 relative overflow-hidden bg-white/5 border-t border-white/10">
          <div className="container px-4 text-center mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Be the first to know when we launch. Sign up for early access and exclusive updates.
            </p>
            <div className="flex justify-center">
              <EmailSignup />
            </div>
          </div>
          
          {/* Background Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-3xl pointer-events-none" />
        </section>
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-sm text-white/40">
        <div className="container mx-auto px-4">
          <p>&copy; 2026 ReptiGram Ecosystem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
