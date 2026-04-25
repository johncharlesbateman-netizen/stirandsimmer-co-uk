import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate("/admin/recipes/new", { replace: true });
    }
  }, [session, loading, navigate]);

  const handleGoogleSignIn = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({
        title: "Sign-in failed",
        description: result.error.message ?? "Please try again",
        variant: "destructive",
      });
    }
    // If redirected, browser handles it. Otherwise session is set and useEffect routes us.
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-6 py-20 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-6 py-20">
        <p className="micro-caption mb-2">Admin</p>
        <h1 className="font-display text-4xl mb-3">Sign in</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Sign in with your Google account to manage recipes.
        </p>
        <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
          Continue with Google
        </Button>
      </div>
    </Layout>
  );
};

export default Auth;
