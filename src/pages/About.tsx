import Layout from "@/components/Layout";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Link } from "react-router-dom";

const brandImage = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=85";

const audienceTypes = [
  "Home Cooks",
  "Busy Families",
  "Health-Conscious Foodies",
  "Weekend Entertainers",
  "Beginner Chefs",
  "Meal Prep Enthusiasts",
];

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Delicious food spread" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80", alt: "Gourmet pasta" },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80", alt: "Fresh ingredients" },
  { src: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800&q=80", alt: "Pizza close-up" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", alt: "BBQ meat" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", alt: "Pancakes" },
  { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80", alt: "Salmon dish" },
];

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="section-breathing pb-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Main Content */}
            <div className="md:col-span-7">
              <h1 className="heading-display mb-12">About</h1>
              
              <div className="space-y-8 body-editorial text-muted-foreground">
                <p className="text-foreground text-xl md:text-2xl font-display leading-relaxed">
                  We create recipes the same way we enjoy food — with care, 
                  curiosity, and a love for fresh, honest ingredients.
                </p>
                
                <p>
                  Great Food Recipes is where culinary passion meets practical cooking. 
                  Every recipe is tested multiple times to ensure it works in your kitchen, 
                  with your tools, on your schedule.
                </p>
                
                <p>
                  From rustic comfort food to modern weeknight meals, our collection 
                  covers everything you need to bring incredible flavors to your table. 
                  We focus on seasonal ingredients, simple techniques, and bold flavors 
                  that make every meal memorable.
                </p>
                
                <p>
                  We believe cooking should be joyful, not stressful. That's why every 
                  recipe comes with clear instructions, helpful tips, and the confidence 
                  that it will taste amazing every single time.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4 md:col-start-9 space-y-12">
              {/* Portrait */}
              <div className="aspect-[3/4] bg-muted overflow-hidden">
                <img
                  src={brandImage}
                  alt="Great Food Recipes kitchen"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Client Types */}
              <div>
                <h3 className="micro-caption mb-6">I Work With</h3>
                <ul className="space-y-3">
                  {clientTypes.map((client) => (
                    <li key={client} className="text-sm text-muted-foreground">
                      {client}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div>
                <h3 className="micro-caption mb-4">Location</h3>
                <p className="text-sm text-muted-foreground">Based in Milan, Italy</p>
                <p className="text-sm text-muted-foreground">Available worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16">
        <InfiniteCarousel images={carouselImages} />
      </section>

      {/* Quote Section */}
      <section className="section-breathing border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <blockquote className="max-w-3xl">
            <p className="heading-editorial text-muted-foreground italic leading-relaxed">
              "Food is memory, identity, and pleasure. My camera tries to capture 
              all three in a single frame."
            </p>
            <footer className="mt-8">
              <p className="micro-caption">— Sofia Martini</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-breathing border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="heading-section mb-4">Have a project in mind?</h2>
              <p className="text-muted-foreground">
                I'd love to discuss how we can work together.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-foreground text-background text-sm tracking-wider uppercase hover:opacity-80 transition-opacity w-fit"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
