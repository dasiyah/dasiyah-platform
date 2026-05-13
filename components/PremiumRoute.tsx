"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSubscription } from "@/lib/getSubscription";

export default function PremiumRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const subscription = await getSubscription();

      if (subscription !== "premium") {
        router.push("/upgrade");
        return;
      }

      setAllowed(true);
      setChecking(false);
    };

    checkAccess();
  }, [router]);

  if (checking) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Checking premium access...</p>
      </main>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}