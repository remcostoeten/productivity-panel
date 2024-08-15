import { Center } from "@/components/atoms/Center";
import SimpleSpinner from "@/components/effect/loaders/simple-spinner";

export default function Loading() {
  return (
    <Center as="main" fullScreen>
      <SimpleSpinner />
    </Center>
  );
}
