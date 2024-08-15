import { Center } from "@/components/atoms/Center";
import SimpleSpinner from "@/components/effect/SimpleSpinner";

export default function Loading() {
  return (
    <Center as="main" fullScreen>
      <SimpleSpinner />
    </Center>
  );
}
