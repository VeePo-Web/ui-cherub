import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load pages for code splitting
const Waitlist = lazy(() => import("./pages/Waitlist"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Index = lazy(() => import("./pages/Index"));
const Discover = lazy(() => import("./pages/Discover"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const MyEvents = lazy(() => import("./pages/MyEvents"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const EditEvent = lazy(() => import("./pages/EditEvent"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loading fallback - matches design system
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/event/:id" element={<Index />} />
        <Route path="/event/:id/edit" element={<EditEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </TooltipProvider>
);

export default App;
