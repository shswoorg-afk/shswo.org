import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import AdminBeforeAuth from "../../components/admin.before.auth";
import verifyAdminSession from "../../lib/verifyAdminSession"; 
import adminLogout from "../../serverFunc/adminLogout"; 

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check the cookie when the route loads.
  useState(() => {
    verifyAdminSession()
      .then((result) => setAuthenticated(result.authenticated))
      .catch(() => setAuthenticated(false));
  });

  if (authenticated === null) {
    return <div className="bg-black min-h-screen" />;
  }

  if (!authenticated) {
    return (
      <AdminBeforeAuth
        onLoginSuccess={() => {
          setAuthenticated(true);
          router.invalidate();
        }}
      />
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <button
        onClick={async () => {
          await adminLogout();
          setAuthenticated(false);
          await router.invalidate();
        }}
        className="mt-4 rounded-full bg-white text-black px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}