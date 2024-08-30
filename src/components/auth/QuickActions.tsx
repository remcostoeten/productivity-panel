"use client";

import {
  Button
} from '@/components/ui/';
import SettingsModal from "@/app/dashboard/settings/_components/modal/SettingsModal";

import { getUserProfile } from "@/core/server/server-actions/userActions";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "~/src/core/types/user-profile.types";

export default function QuickActions() {
    const [isOpen, setIsOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            if (!profile) {
                console.error("User profile not found");
                return;
            }
            setUserProfile(profile);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    };

    const handleOpenModal = () => {
        setIsOpen(true);
        fetchUserProfile();
    };

    return (
        <>
            <Button
                className="fixed bottom-16 size-[40px] bg-input right-4  border border-orange-700/20 rounded-full hover:bg-dark-section--lighter/70 p-3"
                onClick={() => setIsSettingsOpen(true)}
            >
                <SettingsIcon className="h-6 w-6 text-white" />
            </Button>
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </>
    );
}
