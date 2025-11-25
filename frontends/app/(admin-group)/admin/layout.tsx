import { Sidebar } from "@/components/common/sidebar";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
