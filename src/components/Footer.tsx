import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">Great Food Recipes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Delicious recipes crafted with love, flavour, and fresh ingredients.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="micro-caption">Navigate</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/recipes" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Recipes
              </Link>
              <Link to="/about" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                About
              </Link>
              <Link to="/contact" className="text-sm editorial-link w-fit opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="micro-caption">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <p className="opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-default">hello@greatfoodrecipes.co.uk</p>
              <a 
                href="https://www.instagram.com/Great.Food.Recipes/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Great Food Recipes. All rights reserved.
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
