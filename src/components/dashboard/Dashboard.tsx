import { PlaygroundHero } from "./PlaygroundHero";
import { PlaygroundPreview } from "./PlaygroundPreview";
import { StatsPanel } from "./StatsPanel";
import { RecentPlaygrounds } from "./RecentPlaygrounds";
import { DailyChallenge } from "./DailyChallenge";
import { ActivityFeed } from "./ActivityFeed";
import { AIAssistantPanel } from "./AIAssistantPanel";

export function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 p-5 sm:p-7">
        {/* Top: greeting + hero playground + stats */}
        <section id="playground" className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1">
            <PlaygroundHero />
            <PlaygroundPreview />
          </div>
          <div className="w-full lg:w-[260px] lg:pt-[52px]">
            <StatsPanel />
          </div>
        </section>

        {/* Lower: recent / challenge / activity */}
        <section id="algorithms" className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <RecentPlaygrounds />
          <div id="challenge">
            <DailyChallenge />
          </div>
          <ActivityFeed />
        </section>

        {/* AI Assistant */}
        <section>
          <AIAssistantPanel />
        </section>
      </div>
    </div>
  );
}
