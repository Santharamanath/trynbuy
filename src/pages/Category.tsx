import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts, ProductCategory, Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Eye, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
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
const categoryFallbackImages: Record<string, string> = {
  glasses: categoryGlasses,
  shoes: categoryShoes,
  hats: categoryHats,
  accessories: categoryGlasses,
};

// Get product image by name or fallback to category
const getProductImage = (product: Product): string => {
  return productImages[product.name] || categoryFallbackImages[product.category] || "/placeholder.svg";
};

const categoryInfo: Record<ProductCategory, { title: string; description: string }> = {
  glasses: {
    title: "Glasses",
    description: "Find your perfect frames with AR face scanning technology",
  },
  shoes: {
    title: "Shoes",
    description: "Step into style with virtual foot fitting",
  },
  hats: {
    title: "Hats",
    description: "Top off your look with AR hat try-on",
  },
  accessories: {
    title: "Accessories",
    description: "Complete your style with premium accessories",
  },
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, setIsOpen: openCart } = useCart();

  const [arProduct, setArProduct] = useState<Product | null>(null);
  const [isArOpen, setIsArOpen] = useState(false);

  const validCategory = category as ProductCategory;
  const info = categoryInfo[validCategory];

  const { data: products, isLoading, error } = useProducts(validCategory);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

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

  return (
    <>
      <Helmet>
        <title>{info.title} | TryNBuy - AR Virtual Try-On</title>
        <meta name="description" content={info.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <CartSheet />
        <ARTryOnModal 
          product={arProduct} 
          isOpen={isArOpen} 
          onClose={() => setIsArOpen(false)} 
        />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Back Button & Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Category Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Shop <span className="text-gradient">{info.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {info.description}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="gradient-card rounded-2xl p-4 animate-pulse">
                  <div className="aspect-square bg-muted rounded-xl mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Failed to load products</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}

          {/* Products Grid */}
          {products && products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.ar_enabled && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        AR Ready
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    )}

                    {/* Name */}
                    <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <p className="text-xl font-bold text-primary mb-4">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {product.ar_enabled && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleTryOn(product)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Try On
                        </Button>
                      )}
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 gradient-accent text-primary-foreground"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {products && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found in this category</p>
              <Button onClick={() => navigate("/")}>Browse Other Categories</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
