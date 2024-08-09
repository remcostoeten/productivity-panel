import { Center } from "./components/atoms/Center";
import SpinneCodepen from "./components/effect/spinner-codepen";

export default function Loading() {
  return (
    <Center as="main" fullScreen>
      <SpinneCodepen />
    </Center>
  );
}
