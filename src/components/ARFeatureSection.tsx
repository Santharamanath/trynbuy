import { Button } from "@/components/ui/button";
import { Camera, Scan, Sparkles, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Face Scanning",
    description: "Advanced facial recognition for perfect frame fitting",
  },
  {
    icon: Camera,
    title: "Dual Camera",
    description: "Use both cameras for realistic background integration",
  },
  {
    icon: Sparkles,
    title: "Real-time Rendering",
    description: "See products on you with zero latency",
  },
  {
    icon: CheckCircle2,
    title: "Size Guarantee",
    description: "Get the perfect fit every time with AR measurements",
  },
];

const ARFeatureSection = () => {
  return (
    <section className="py-24 bg-background" id="try-ar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Camera className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Virtual Try-On Technology</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
              Experience Products
              <span className="block text-gradient-gold">Before Purchase</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Our cutting-edge AR technology uses your device's cameras to create a realistic virtual try-on experience. 
              See exactly how products look on you before making a purchase.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl glass"
                >
                  <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="xl">
              <Camera className="h-5 w-5" />
              Launch AR Experience
            </Button>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Phone Mockup */}
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-[9/16] rounded-[3rem] gradient-card shadow-elevated p-3 border border-border">
                <div className="w-full h-full rounded-[2.5rem] bg-muted flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-accent flex items-center justify-center animate-pulse-glow">
                      <Camera className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h4 className="text-xl font-display font-bold text-foreground mb-2">
                      AR Try-On Ready
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Point your camera at your face to start the virtual try-on experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 glass px-4 py-3 rounded-2xl shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Perfect Fit</p>
                    <p className="text-xs text-muted-foreground">98% accuracy</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 glass px-4 py-3 rounded-2xl shadow-card animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Real-time</p>
                    <p className="text-xs text-muted-foreground">Zero latency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARFeatureSection;
