"use client";

import { useRouter } from "next/navigation";
import RepositoryCreationComponent from "./RepositoryCreation/RepositoryCreationComponent";

export default function IntroFlow() {
  const router = useRouter();

  function handleChangeRoute() {
    router.push("/dashboard/notes/my-folders");
  }

  return (
    <>
      <RepositoryCreationComponent onComplete={handleChangeRoute} />
    </>
  );
}
