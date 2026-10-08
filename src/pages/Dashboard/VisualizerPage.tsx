import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AppShell } from "@/layouts/AppShell";
import { VisualizerRouter } from "@/components/visualizers/VisualizerRouter";
import { useDashboard } from "@/context/DashboardContext";
import { VISUALIZERS } from "@/data/visualizers";
import type { VisualizerId } from "@/types";

export function VisualizerPage() {
  const { id } = useParams<{ id: string }>();
  const { setSelectedVisualizer } = useDashboard();
  const isValid = VISUALIZERS.some((v) => v.id === id);

  useEffect(() => {
    if (isValid) setSelectedVisualizer(id as VisualizerId);
  }, [id, isValid, setSelectedVisualizer]);

  if (!isValid) return <Navigate to="/dashboard" replace />;
  if (id === "array") return <Navigate to="/visualizer/array" replace />;
  if (id === "linked-list") return <Navigate to="/visualizer/linked-list" replace />;
  if (id === "hashmap") return <Navigate to="/visualizer/hashmap" replace />;
  if (id === "dynamic-programming") return <Navigate to="/visualizer/dynamic-programming" replace />;
  if (id === "binary-search") return <Navigate to="/visualizer/binary-search" replace />;
  if (id === "two-pointer") return <Navigate to="/visualizer/two-pointer" replace />;

  return (
    <AppShell>
      <VisualizerRouter visualizer={id as VisualizerId} />
    </AppShell>
  );
}
