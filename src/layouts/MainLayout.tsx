import SiteFooter from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="mx-auto w-full max-w-300 px-4 py-6 md:px-6 my-4">
        <Outlet />
      </main>

      <SiteFooter className="mt-8" />
    </div>
  );
}
