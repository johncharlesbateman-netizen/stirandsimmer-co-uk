import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">Stir & Simmer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delicious recipes crafted with love, flavour, and fresh ingredients.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4 md:pl-4 lg:pl-8">
            <h4 className="micro-caption">Navigate</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/recipes" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Recipes
              </Link>
              <Link to="/kitchen-atlas" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Kitchen Atlas
              </Link>
              <Link to="/guides" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Guides
              </Link>
              <Link to="/meal-planner" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Meal Planner
              </Link>
              <Link to="/about" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                About
              </Link>
              <Link to="/contact" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Contact
              </Link>
              <Link to="/privacy" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Privacy
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="micro-caption">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:hello@stirandsimmer.co.uk"
                className="block opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1"
              >
                hello@stirandsimmer.co.uk
              </a>
              <a
                href="https://www.instagram.com/stirandsimmeruk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>@stirandsimmeruk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Stir & Simmer. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
