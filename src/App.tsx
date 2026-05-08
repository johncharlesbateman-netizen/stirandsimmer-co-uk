import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

import Entry from "./pages/pass/Entry";
import Signup from "./pages/pass/Signup";
import Signin from "./pages/pass/Signin";
import ProfileSetup from "./pages/pass/ProfileSetup";
import Home from "./pages/pass/Home";
import Challenges from "./pages/pass/Challenges";
import Verify from "./pages/pass/Verify";
import Unlock from "./pages/pass/Unlock";
import Secrets from "./pages/pass/Secrets";
import Profile from "./pages/pass/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Entry />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/verify/:id" element={<Verify />} />
            <Route path="/unlock/:id" element={<Unlock />} />
            <Route path="/secrets" element={<Secrets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
