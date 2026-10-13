
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import AdminBeforeAuth from "../../components/admin.before.auth";
import AdminPage from "../../components/admin";
import verifyAdminSession from "../../lib/verifyAdminSession";
import adminLogout from "../../serverFunc/adminLogout";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    verifyAdminSession()
      .then((result) => {
        if (active) setAuthenticated(result.authenticated);
      })
      .catch(() => {
        if (active) setAuthenticated(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await adminLogout();

    // Immediately switch to the before-auth page.
    setAuthenticated(false);

    await router.invalidate();
  };

  if (authenticated === null) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!authenticated) {
    return (
      <AdminBeforeAuth
        onLoginSuccess={() => setAuthenticated(true)}
      />
    );
  }

  return <AdminPage onLogout={handleLogout} />;
}
