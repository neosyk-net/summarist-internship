import Sidebar from "@/components/app/Sidebar";
import Topbar from "@/components/app/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="sticky top-0 h-screen w-64">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
