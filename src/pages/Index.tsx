import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ARFeatureSection from "@/components/ARFeatureSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TryNBuy - AR Virtual Try-On Shopping Experience</title>
        <meta
          name="description"
          content="Experience the future of online shopping with TryNBuy's AR-powered virtual try-on technology. Try glasses, shoes, and hats before you buy."
        />
        <meta name="keywords" content="AR shopping, virtual try-on, online glasses, shoes, hats, augmented reality" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <CategorySection />
          <FeaturedProducts />
          <ARFeatureSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
