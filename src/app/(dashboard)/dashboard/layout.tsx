import SiteHeader from "@/app/(marketing)/_components/marketing-header";

export default function DashboardLayout({ children }: PageProps) {
  return <>
  <SiteHeader/>
  <main className="mt-20">{children}</main></>;
}
