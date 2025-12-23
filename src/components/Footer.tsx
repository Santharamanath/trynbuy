import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "Glasses", href: "#glasses" },
      { name: "Shoes", href: "#shoes" },
      { name: "Hats", href: "#hats" },
      { name: "New Arrivals", href: "#" },
      { name: "Sale", href: "#" },
    ],
    support: [
      { name: "AR Help", href: "#" },
      { name: "Size Guide", href: "#" },
      { name: "Shipping", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Contact", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="inline-block">
              <span className="text-3xl font-display font-bold text-gradient">TryNBuy</span>
            </a>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">
              The future of online shopping with AR-powered virtual try-on technology.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                hello@trynbuy.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                123 Fashion Ave, New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <h4 className="font-display font-semibold text-foreground mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-muted-foreground text-sm">
                Get the latest updates on new products and upcoming sales.
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 h-12 px-4 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 TryNBuy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
