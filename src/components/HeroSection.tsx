import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-glasses.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">AR-Powered Virtual Try-On</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
              Try Before You
              <span className="block text-gradient">Buy It</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Experience the future of shopping. Use our AR technology to virtually try on glasses, shoes, and hats from anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl">
                Start Trying
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="glass" size="xl">
                Explore Collection
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gradient">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gradient-gold">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-gradient">99%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative z-10 animate-float">
              <img
                src={heroImage}
                alt="AR Glasses Virtual Try-On"
                className="w-full rounded-3xl shadow-elevated"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-primary/30 rounded-3xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border-2 border-accent/30 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
