import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import Home from "./pages/Home";
import CommunityFeed from "./pages/CommunityFeed";
import Communities from "./pages/Communities";
import Community from "./pages/Community";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import ProfileDashboard from "./pages/ProfileDashboard";
import CommunitySettings from "./pages/CommunitySettings";
import ModerationDashboard from "./pages/ModerationDashboard";
import CommunityAnalytics from "./pages/CommunityAnalytics";
import ActivityCenter from "./pages/ActivityCenter";
import MessagingDashboard from "./pages/MessagingDashboard";
import CommunityMembers from "./pages/CommunityMembers";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<CommunityFeed />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/community/:id/members" element={<CommunityMembers />} />
            <Route path="/community/:id/settings" element={<CommunitySettings />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/edit/:id" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/profile/:userId?" element={<ProfileDashboard />} />
            <Route path="/moderation" element={<ModerationDashboard />} />
            <Route path="/analytics" element={<CommunityAnalytics />} />
            <Route path="/activity" element={<ActivityCenter />} />
            <Route path="/messages" element={<MessagingDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>;
export default App;