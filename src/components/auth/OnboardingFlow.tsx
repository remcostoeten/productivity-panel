"use client";

import { Button, Input, Label, Switch } from "@/components/ui";
import { updateUserInfo } from "@/core/server/server-actions/onboarding";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OnboardingFlow() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleSkip = () => {
    if (step < 3) setStep(step + 1);
    else {
      toast("Skipped onboarding", { icon: "⏭️" });
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleExit = () => {
    toast("Exited onboarding", { icon: "🚪" });
    router.push("/dashboard");
  };

  async function onSubmit(formData: FormData) {
    const result = await updateUserInfo(formData);
    if (result.success) {
      toast.success("Onboarding completed successfully!");
      router.push("/dashboard");
    } else {
      toast.error("Failed to update user information. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-section text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-section p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary">
                {greeting}, {user?.firstName}!
              </h2>
              <p className="mb-6">Welcome to AS App. Let's get you set up.</p>
              <Button onClick={() => setStep(2)} className="w-full group">
                Start Onboarding
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-section p-8 rounded-lg shadow-lg"
            >
              <form action={onSubmit}>
                <input type="hidden" name="id" value={user?.id} />
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      defaultValue={user?.firstName || ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      defaultValue={user?.lastName || ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                    <Input
                      id="profileImageUrl"
                      name="profileImageUrl"
                      defaultValue={user?.setProfileImage || ""}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showPreloader" className="cursor-pointer">
                      Show Preloader
                    </Label>
                    <Switch
                      id="showPreloader"
                      name="showPreloader"
                      defaultChecked={true}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="group"
                  >
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back
                  </Button>
                  <Button type="submit" className="group">
                    Complete Onboarding
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex justify-between">
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="text-muted hover:text-foreground transition-colors"
          >
            Skip
          </Button>
          <Button
            onClick={handleExit}
            variant="ghost"
            className="text-muted hover:text-foreground transition-colors"
          >
            <X className="mr-2" />
            Exit
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
