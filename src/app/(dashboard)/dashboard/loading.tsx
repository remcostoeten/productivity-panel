import { Center } from "@/components/atoms/Center";
import AbstractLoader from "@/components/effect/loaders/abstract-loader";

export default function Loading() {
  return (
    <Center as="main" fullScreen>
      <AbstractLoader />
    </Center>
  );
}
