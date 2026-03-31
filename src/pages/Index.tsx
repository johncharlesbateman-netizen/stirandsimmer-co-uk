import Layout from "@/components/Layout";
import ImageWithCaption from "@/components/ImageWithCaption";
import { Link } from "react-router-dom";

const heroImage = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920";

const sofiaImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=85",
    alt: "Fresh pasta with herbs",
    caption: "Fresh basil, San Marzano tomatoes",
    subcaption: "Warm afternoon light",
    aspectRatio: "landscape" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85",
    alt: "Artisan pizza",
    caption: "Wood-fired, 48-hour fermentation",
    subcaption: "Earthy tones, natural texture",
    aspectRatio: "portrait" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=85",
    alt: "Fresh salad composition",
    caption: "Garden vegetables, edible flowers",
    subcaption: "Morning dew, soft diffused light",
    aspectRatio: "square" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&q=85",
    alt: "Gourmet burger",
    caption: "Brioche, aged cheddar, caramelized onions",
    subcaption: "Controlled studio lighting",
    aspectRatio: "landscape" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=1200&q=85",
    alt: "Fresh croissants",
    caption: "French butter, 72 layers",
    subcaption: "Golden morning warmth",
    aspectRatio: "wide" as const,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', marginTop: '-5rem', width: '100vw' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Food photography hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl">
          <p 
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Food Photography
          </p>
          <h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 opacity-0 animate-fade-in leading-tight"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            Transforming ingredients into visual stories that sell
          </h1>
          <p 
            className="text-lg md:text-xl font-body tracking-wide opacity-0 animate-fade-in max-w-2xl mx-auto"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            Milan-based photographer crafting images that make you taste with your eyes.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
          <div className="w-px h-16 bg-primary-foreground/50 animate-pulse" />
        </div>
      </section>

      {/* Intro Text */}
      <section className="section-breathing">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <p className="heading-section text-muted-foreground leading-relaxed">
              I create images that make you taste with your eyes. Every photograph tells a story of 
              <span className="text-foreground"> craft</span>, 
              <span className="text-foreground"> passion</span>, and 
              <span className="text-foreground"> flavor</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric Gallery */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Row 1 - Large left, small right */}
            <div className="md:col-span-7">
              <ImageWithCaption
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                caption={galleryImages[0].caption}
                subcaption={galleryImages[0].subcaption}
                aspectRatio="landscape"
                priority
                floatDelay={0}
              />
            </div>
            <div className="md:col-span-5 md:pt-24">
              <ImageWithCaption
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                caption={galleryImages[1].caption}
                subcaption={galleryImages[1].subcaption}
                aspectRatio="portrait"
                floatDelay={1}
              />
            </div>

            {/* Row 2 - Full width breathing space then offset */}
            <div className="md:col-span-12 py-12" />
            
            <div className="md:col-span-4 md:col-start-2">
              <ImageWithCaption
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                caption={galleryImages[2].caption}
                subcaption={galleryImages[2].subcaption}
                aspectRatio="square"
                floatDelay={2}
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-16">
              <ImageWithCaption
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                caption={galleryImages[3].caption}
                subcaption={galleryImages[3].subcaption}
                aspectRatio="landscape"
                floatDelay={3}
              />
            </div>

            {/* Row 3 - Wide centered */}
            <div className="md:col-span-12 py-8" />
            
            <div className="md:col-span-10 md:col-start-2">
              <ImageWithCaption
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                caption={galleryImages[4].caption}
                subcaption={galleryImages[4].subcaption}
                aspectRatio="wide"
                floatDelay={4}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Sofia Section */}
      <section className="section-breathing border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Photo */}
            <div className="md:col-span-5">
              <div className="aspect-[3/4] overflow-hidden bg-muted floating-item">
                <img
                  src={sofiaImage}
                  alt="Sofia Martini"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-6 md:col-start-7">
              <p className="micro-caption mb-6">The Photographer</p>
              <h2 className="heading-editorial mb-6">Sofia Martini</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Milan-based food photographer with over 8 years of experience 
                capturing the essence of gastronomy. Specializing in natural light and 
                visual storytelling for award-winning brands and restaurants.
              </p>
              <Link
                to="/about"
                className="inline-block px-8 py-4 border border-foreground text-foreground text-sm tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-breathing border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="heading-editorial mb-6">Let's create something beautiful</h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            Interested in working together? I'd love to hear about your project.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-foreground text-background text-sm tracking-wider uppercase hover:opacity-80 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
