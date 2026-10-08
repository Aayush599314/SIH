import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/Landing";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import { DashboardPage } from "@/pages/Dashboard";
import { VisualizerPage } from "@/pages/Dashboard/VisualizerPage";
import { HashMapVisualizerPage } from "@/pages/HashMapVisualizerPage";
import { LinkedListVisualizerPage } from "@/pages/LinkedListVisualizerPage";
import { DynamicProgrammingVisualizerPage } from "@/pages/DynamicProgrammingVisualizerPage";
import { BinarySearchVisualizerPage } from "@/pages/BinarySearchVisualizerPage";
import { TwoPointerVisualizerPage } from "@/pages/TwoPointerVisualizerPage";
import { ArrayVisualizerPage } from "@/pages/ArrayVisualizerPage";
import { NotFoundPage } from "@/pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";

/**
 * Single source of truth for the app's URL structure:
 *
 *   /            → Landing page (public)
 *   /login       → Login page   (public-only — redirects away if signed in)
 *   /register    → Register page(public-only — redirects away if signed in)
 *   /dashboard   → Dashboard    (protected  — redirects to /login if signed out)
 *   /playground/:id → A single visualizer, still inside the dashboard shell (protected)
 *   /visualizer/linked-list → Dedicated standalone LinkedList playground
 *   /visualizer/hashmap → Dedicated standalone HashMap playground
 *   /visualizer/dynamic-programming → Dedicated standalone Dynamic Programming playground
 *   /404, *      → Not found
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playground/:id"
        element={
          <ProtectedRoute>
            <VisualizerPage />
          </ProtectedRoute>
        }
      />

      {/* Dedicated standalone visualizer routes */}
      <Route path="/visualizer/array" element={<ArrayVisualizerPage />} />
      <Route path="/visualizer/linked-list" element={<LinkedListVisualizerPage />} />
      <Route path="/visualizer/hashmap" element={<HashMapVisualizerPage />} />
      <Route path="/visualizer/dynamic-programming" element={<DynamicProgrammingVisualizerPage />} />
      <Route path="/visualizer/dynamic-programming/:problemId" element={<DynamicProgrammingVisualizerPage />} />
      <Route path="/visualizer/binary-search" element={<BinarySearchVisualizerPage />} />
      <Route path="/visualizer/binary-search/:problemId" element={<BinarySearchVisualizerPage />} />
      <Route path="/visualizer/two-pointer" element={<TwoPointerVisualizerPage />} />
      <Route path="/visualizer/two-pointer/:problemId" element={<TwoPointerVisualizerPage />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

