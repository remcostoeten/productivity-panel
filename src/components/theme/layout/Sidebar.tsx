import { Button } from "@/components/ui/button";
import { sidebarItems } from "@/core/data/dashboard-menu-items";

export default function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center py-4 bg-[#0D0D0C] border-r border-[#1A1A1A]">
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-[#FF4800] to-[#FF6C00] rounded-lg flex items-center justify-center text-white font-bold text-xl">
          Z
        </div>
      </div>
      <nav className="flex flex-col items-center gap-6">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="iconTooltip"
            size="icon"
            className="bg-[#1A1A1A] text-[#646464] hover:bg-[#252525] hover:text-white"
            tooltipContent={item.label}
          >
            <item.icon size={20} />
          </Button>
        ))}
      </nav>
    </aside>
  );
}
