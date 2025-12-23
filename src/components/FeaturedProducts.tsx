import { Button } from "@/components/ui/button";
import { ShoppingBag, Camera, Star } from "lucide-react";
import productGlasses from "@/assets/product-glasses.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productHat from "@/assets/product-hat.jpg";

const products = [
  {
    id: 1,
    name: "Aviator Pro",
    category: "Glasses",
    price: 189,
    rating: 4.9,
    image: productGlasses,
    arEnabled: true,
  },
  {
    id: 2,
    name: "Urban Stride",
    category: "Shoes",
    price: 249,
    rating: 4.8,
    image: productShoes,
    arEnabled: true,
  },
  {
    id: 3,
    name: "Classic Fedora",
    category: "Hats",
    price: 129,
    rating: 4.7,
    image: productHat,
    arEnabled: true,
  },
  {
    id: 4,
    name: "Round Frame Elite",
    category: "Glasses",
    price: 219,
    rating: 4.9,
    image: productGlasses,
    arEnabled: true,
  },
  {
    id: 5,
    name: "Sport Runner X",
    category: "Shoes",
    price: 299,
    rating: 4.8,
    image: productShoes,
    arEnabled: true,
  },
  {
    id: 6,
    name: "Panama Style",
    category: "Hats",
    price: 149,
    rating: 4.6,
    image: productHat,
    arEnabled: true,
  },
];

const FeaturedProducts = () => {
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
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* AR Badge */}
                {product.arEnabled && (
                  <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">AR Ready</span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button variant="hero" size="lg">
                    <Camera className="h-4 w-4" />
                    Try On
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-primary font-medium">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm text-foreground">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gradient">${product.price}</p>
                  <Button variant="glass" size="sm">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
