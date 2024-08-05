import { TooltipProvider } from "@/components/ui";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: PageProps) {
    return (
        <ClerkProvider>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </ClerkProvider>
    )
}