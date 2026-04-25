import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
import MealPlanner from "./pages/MealPlanner";
import AdminNewRecipe from "./pages/AdminNewRecipe";
import AdminEditRecipe from "./pages/AdminEditRecipe";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RecipeDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();

  return <RecipeDetail key={slug ?? "recipe-detail"} />;
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
            <Route path="/recipes/:slug" element={<RecipeDetailRoute />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin/recipes/new"
              element={<RequireAdmin><AdminNewRecipe /></RequireAdmin>}
            />
            <Route
              path="/admin/recipes/:slug/edit"
              element={<RequireAdmin><AdminEditRecipe /></RequireAdmin>}
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
