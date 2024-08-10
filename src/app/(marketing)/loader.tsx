import { Center } from "@/components/atoms/Center";
import SpinnerCodepen from "@/components/atoms/SpinnerCodepen"; // Adjust the import path as necessary

export default function Loading() {
  return (
    <Center as="main" fullScreen>
      <SpinnerCodepen />
    </Center>
  );
}
