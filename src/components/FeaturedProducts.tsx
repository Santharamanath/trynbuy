import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Camera, Star, Eye } from "lucide-react";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ARTryOnModal from "@/components/ARTryOnModal";

// Product images
import classicAviator from "@/assets/products/classic-aviator.jpg";
import modernWayfarer from "@/assets/products/modern-wayfarer.jpg";
import sportShield from "@/assets/products/sport-shield.jpg";
import vintageRound from "@/assets/products/vintage-round.jpg";
import catEye from "@/assets/products/cat-eye.jpg";
import urbanRunner from "@/assets/products/urban-runner.jpg";
import leatherOxford from "@/assets/products/leather-oxford.jpg";
import streetSneaker from "@/assets/products/street-sneaker.jpg";
import athleticTraining from "@/assets/products/athletic-training.jpg";
import fedoraClassic from "@/assets/products/fedora-classic.jpg";

// Category fallbacks
import categoryGlasses from "@/assets/category-glasses.jpg";
import categoryShoes from "@/assets/category-shoes.jpg";
import categoryHats from "@/assets/category-hats.jpg";

// Product name to image mapping
const productImages: Record<string, string> = {
  "Classic Aviator": classicAviator,
  "Modern Wayfarer": modernWayfarer,
  "Sport Shield": sportShield,
  "Vintage Round": vintageRound,
  "Cat Eye Elegance": catEye,
  "Urban Runner Pro": urbanRunner,
  "Classic Leather Oxford": leatherOxford,
  "Street Style Sneaker": streetSneaker,
  "Athletic Training X": athleticTraining,
  "Fedora Classic": fedoraClassic,
};

// Fallback images based on category
const categoryImages: Record<string, string> = {
  glasses: categoryGlasses,
  shoes: categoryShoes,
  hats: categoryHats,
  accessories: categoryGlasses,
};

// Get product image by name or fallback to category
const getProductImage = (product: Product): string => {
  return productImages[product.name] || categoryImages[product.category] || "/placeholder.svg";
};

const FeaturedProducts = () => {
  const { data: products, isLoading } = useProducts();
  const { addItem, setIsOpen: openCart } = useCart();
  const { toast } = useToast();
  
  const [arProduct, setArProduct] = useState<Product | null>(null);
  const [isArOpen, setIsArOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    openCart(true);
  };

  const handleTryOn = (product: Product) => {
    setArProduct(product);
    setIsArOpen(true);
  };

  // Get featured products (first 6 products)
  const featuredProducts = products?.slice(0, 6) || [];

  return (
    <section className="py-24 gradient-hero" id="products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Featured <span className="text-gradient-gold">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Try on our bestsellers with AR technology
            </p>
          </div>
          <Link to="/category/glasses">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gradient-card rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-muted rounded-xl mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {featuredProducts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* AR Badge */}
                  {product.ar_enabled && (
                    <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">AR Ready</span>
                    </div>
                  )}

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {product.ar_enabled && (
                      <Button variant="hero" size="lg" onClick={() => handleTryOn(product)}>
                        <Camera className="h-4 w-4" />
                        Try On
                      </Button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary font-medium capitalize">{product.category}</span>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm text-foreground">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gradient">${product.price.toFixed(2)}</p>
                    <Button variant="glass" size="sm" onClick={() => handleAddToCart(product)}>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && featuredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products available yet</p>
            <Link to="/category/glasses">
              <Button>Browse Categories</Button>
            </Link>
          </div>
        )}
      </div>

      {/* AR Modal */}
      <ARTryOnModal 
        product={arProduct} 
        isOpen={isArOpen} 
        onClose={() => setIsArOpen(false)} 
      />
    </section>
  );
};

export default FeaturedProducts;
