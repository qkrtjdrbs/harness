import { ComponentExample } from "@/components/component-example";
import { WeatherSection } from "@/components/weather-section";

export default function Page() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl justify-center p-4 pt-6 sm:p-6 lg:p-12 2xl:max-w-6xl">
        <WeatherSection />
      </div>
      <ComponentExample />
    </>
  );
}