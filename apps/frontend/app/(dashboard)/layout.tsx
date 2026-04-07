import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { ModeToggle } from "@/components/dark-toggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* Jangan pake h-screen di sini */}
      <SidebarInset className="bg-background">
        {/* HEADER STICKY */}
        <div className="bg-background/80 sticky top-0 z-50 flex items-center justify-between border-b p-4 backdrop-blur-sm">
          {/* Left */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </div>

        {/* CONTENT SCROLLS */}
        <main className="px-6 py-6 pb-10">
          <div className="mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
