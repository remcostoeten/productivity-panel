import { Center } from "@/components/atoms/Center";
import RadarLoader from "@/components/effect/radar-loader";

export default function Loading() {
  return (
    <Center as="main" fullScreen>
      <RadarLoader />
    </Center>
  );
}
