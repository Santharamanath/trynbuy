import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, RefreshCw, ShoppingCart, Loader2 } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ARTryOnModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

type CameraState = "idle" | "requesting" | "active" | "denied" | "error";

const ARTryOnModal = ({ product, isOpen, onClose }: ARTryOnModalProps) => {
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { addItem, setIsOpen: openCart } = useCart();
  const { toast } = useToast();

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setCameraState("requesting");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraState("active");
      }
    } catch (error) {
      console.error("Camera access error:", error);
      if ((error as Error).name === "NotAllowedError") {
        setCameraState("denied");
      } else {
        setCameraState("error");
      }
    }
  }, [facingMode]);

  const toggleCamera = useCallback(() => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, [stopCamera]);

  useEffect(() => {
    if (facingMode && cameraState === "active") {
      startCamera();
    }
  }, [facingMode]);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCameraState("idle");
    }
  }, [isOpen, stopCamera]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
      onClose();
      openCart(true);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col p-0 gap-0 bg-card border-border overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
          <DialogTitle className="text-xl font-display flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
            AR Try-On: {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative overflow-hidden bg-background/50">
          {/* Camera View */}
          {cameraState === "active" && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
            />
          )}

          {/* Product Overlay */}
          {cameraState === "active" && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-48 h-48 object-contain opacity-70 mix-blend-overlay"
                />
              </div>
              {/* AR Guidelines */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full">
                <p className="text-sm text-muted-foreground">Position yourself in frame</p>
              </div>
            </div>
          )}

          {/* Idle State - Start Camera */}
          {cameraState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 rounded-full gradient-card border-2 border-dashed border-primary/30 flex items-center justify-center mb-6 animate-pulse">
                <Camera className="h-16 w-16 text-primary/50" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Try On {product.name}</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Use your camera to virtually try on this product. Click the button below to start the AR experience.
              </p>
              <Button variant="hero" size="xl" onClick={startCamera}>
                <Camera className="h-5 w-5" />
                Start Camera
              </Button>
            </div>
          )}

          {/* Requesting Permission */}
          {cameraState === "requesting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
              <h3 className="text-2xl font-display font-bold mb-2">Requesting Camera Access</h3>
              <p className="text-muted-foreground max-w-md">
                Please allow camera access when prompted by your browser.
              </p>
            </div>
          )}

          {/* Camera Denied */}
          {cameraState === "denied" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center mb-6">
                <X className="h-16 w-16 text-destructive" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Camera Access Denied</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                To use AR Try-On, please allow camera access in your browser settings and try again.
              </p>
              <Button variant="outline" onClick={startCamera}>
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {/* Error State */}
          {cameraState === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center mb-6">
                <X className="h-16 w-16 text-destructive" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Camera Error</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                We couldn't access your camera. Make sure your device has a camera and no other app is using it.
              </p>
              <Button variant="outline" onClick={startCamera}>
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {/* Camera Controls */}
          {cameraState === "active" && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <Button
                variant="glass"
                size="lg"
                onClick={toggleCamera}
                className="rounded-full"
              >
                <RefreshCw className="h-5 w-5" />
                Flip
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={handleAddToCart}
                className="rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - ${product.price.toFixed(2)}
              </Button>
            </div>
          )}
        </div>

        {/* Product Info Bar */}
        <div className="px-6 py-4 border-t border-border shrink-0 gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display font-semibold">{product.name}</h4>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARTryOnModal;
