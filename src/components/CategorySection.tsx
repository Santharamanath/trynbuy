import { Link } from "react-router-dom";
import { Eye, Footprints, Crown } from "lucide-react";
import productGlasses from "@/assets/product-glasses.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productHat from "@/assets/product-hat.jpg";

const categories = [
  {
    id: "glasses",
    title: "Glasses",
    description: "Find your perfect frames with AR face scanning",
    icon: Eye,
    image: productGlasses,
    count: "150+ styles",
  },
  {
    id: "shoes",
    title: "Shoes",
    description: "Step into style with virtual foot fitting",
    icon: Footprints,
    image: productShoes,
    count: "200+ pairs",
  },
  {
    id: "hats",
    title: "Hats",
    description: "Top off your look with AR hat try-on",
    icon: Crown,
    image: productHat,
    count: "100+ designs",
  },
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-background" id="categories">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections and experience AR-powered virtual try-on for each category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-3xl gradient-card shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-primary">{category.count}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
