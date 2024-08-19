import SiteVisitStats from "@/components/auth/SiteVisitStats";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <SiteVisitStats />
    </div>
  );
}
