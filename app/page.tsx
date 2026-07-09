import { FortuneSection } from "@/components/fortune-section";
import { SajuSection } from "@/components/saju-section";
import { WeatherSection } from "@/components/weather-section";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center gap-6 p-4 pt-6 sm:p-6 lg:p-12 2xl:max-w-6xl">
      <WeatherSection />
      <FortuneSection />
      <SajuSection />
    </div>
  );
}