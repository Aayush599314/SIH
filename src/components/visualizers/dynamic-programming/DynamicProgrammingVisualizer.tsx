import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Visualizer } from "./views/Visualizer";
import { Problems } from "./views/Problems";
import { Patterns } from "./views/Patterns";
import { Roadmap } from "./views/Roadmap";
import { Progress } from "./views/Progress";
import { problems, problemsById } from "./data/problems";
import { Code2, ListChecks, Grid3x3, Map, Trophy, ChevronDown } from "lucide-react";
import "./DynamicProgramming.css";

type DPTab = "visualizer" | "problems" | "patterns" | "roadmap" | "progress";

export function DynamicProgrammingVisualizer() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<DPTab>(problemId ? "visualizer" : "visualizer");
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    problemId && problemsById[problemId] ? problemId : "climbing-stairs"
  );

  useEffect(() => {
    if (problemId && problemsById[problemId]) {
      setSelectedProblemId(problemId);
      setActiveTab("visualizer");
    }
  }, [problemId]);

  const handleSelectProblem = (id: string) => {
    setSelectedProblemId(id);
    setActiveTab("visualizer");
    navigate(`/visualizer/dynamic-programming/${id}`);
  };

  const navTabs: { id: DPTab; label: string; icon: typeof Code2 }[] = [
    { id: "visualizer", label: "Visualizer", icon: Code2 },
    { id: "problems", label: "Problems Library", icon: ListChecks },
    { id: "patterns", label: "Patterns", icon: Grid3x3 },
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "progress", label: "Progress", icon: Trophy },
  ];

  const currentProblem = problemsById[selectedProblemId] || problemsById["climbing-stairs"];

  return (
    <div className="dp-scope w-full min-h-screen bg-bg text-gray-200">
      {/* Dynamic Programming Sub-Navigation Bar */}
      <div className="border-b border-bg-border bg-bg-card/70 backdrop-blur-md sticky top-14 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12 gap-2 flex-wrap">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "visualizer") {
                      navigate(`/visualizer/dynamic-programming/${selectedProblemId}`);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary-600/20 text-primary-400 border border-primary-500/30 font-semibold"
                      : "text-gray-400 hover:text-gray-200 hover:bg-bg-hover"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Problem Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-500 hidden md:inline">Problem:</span>
            <div className="relative">
              <select
                value={selectedProblemId}
                onChange={(e) => handleSelectProblem(e.target.value)}
                className="appearance-none bg-bg border border-bg-border hover:border-primary-500/40 text-gray-200 text-xs font-medium rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-500 cursor-pointer"
              >
                {problems.map((p) => (
                  <option key={p.metadata.id} value={p.metadata.id} className="bg-bg-card text-gray-200">
                    {p.metadata.title} ({p.metadata.difficulty})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="w-full">
        {activeTab === "visualizer" && (
          <Visualizer
            activeProblemId={currentProblem.metadata.id}
            onOpenProblems={() => setActiveTab("problems")}
          />
        )}
        {activeTab === "problems" && <Problems />}
        {activeTab === "patterns" && <Patterns />}
        {activeTab === "roadmap" && <Roadmap />}
        {activeTab === "progress" && <Progress />}
      </div>
    </div>
  );
}

export default DynamicProgrammingVisualizer;
