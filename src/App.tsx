import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import RequireAdmin from "./components/RequireAdmin";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Styleguide from "./pages/Styleguide";
import Contact from "./pages/Contact";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import CategoryPage from "./pages/CategoryPage";
import Collections from "./pages/Collections";
import MealPlanner from "./pages/MealPlanner";
import AdminNewRecipe from "./pages/AdminNewRecipe";
import AdminEditRecipe from "./pages/AdminEditRecipe";
import AdminSeoStatus from "./pages/AdminSeoStatus";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import ExitIntentPopup from "./components/ExitIntentPopup";

const queryClient = new QueryClient();

// Legacy slugs that were renamed entirely (old slug -> current slug).
// Applied AFTER normalising punctuation, so keys here are the normalised form.
const legacyRecipeSlugMap: Record<string, string> = {
  "sirloin-steak-with-peppercorn-sauce": "steak-au-poivre-and-french-fries-with-green-salad",
  "keema-rice": "savoury-rice",
  "creme-br-l-e": "creme-brle",
};

// Normalise a slug to match the canonical DB slug format:
// lowercase, URL-decoded, strip diacritics/punctuation (commas, ampersands,
// accented characters), collapse repeated dashes.
const normaliseSlug = (slug: string) => {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  return decoded
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const getCanonicalRecipeSlug = (slug?: string) => {
  if (!slug) return "";
  const normalised = normaliseSlug(slug);
  return legacyRecipeSlugMap[normalised] ?? normalised;
};

const RecipeDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();

  return <RecipeDetail key={slug ?? "recipe-detail"} />;
};

const LegacyRecipeRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/recipes/${getCanonicalRecipeSlug(slug)}`} replace />;
};

const CanonicalRecipeSlugRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const canonicalSlug = getCanonicalRecipeSlug(slug);

  if (!slug || canonicalSlug === slug) {
    return <RecipeDetail key={slug ?? "recipe-detail"} />;
  }

  return <Navigate to={`/recipes/${canonicalSlug}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/category/:slug" element={<CategoryPage />} />
            <Route path="/recipes-1/:slug" element={<LegacyRecipeRedirect />} />
            <Route path="/recipes-1-1/:slug" element={<LegacyRecipeRedirect />} />
            <Route path="/recipes/:slug" element={<CanonicalRecipeSlugRedirect />} />
            {/* Legacy top-level recipe URLs with no current equivalent → send to recipes listing */}
            <Route path="/pork-curry-with-" element={<Navigate to="/recipes" replace />} />
            <Route path="/lamb-and-apricot-biryani" element={<Navigate to="/recipes" replace />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<Collections />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin/recipes/new"
              element={<RequireAdmin><AdminNewRecipe /></RequireAdmin>}
            />
            <Route
              path="/admin/recipes/:slug/edit"
              element={<RequireAdmin><AdminEditRecipe /></RequireAdmin>}
            />
            <Route
              path="/admin/seo"
              element={<RequireAdmin><AdminSeoStatus /></RequireAdmin>}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
