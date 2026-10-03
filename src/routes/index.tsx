import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useEffect(() => {
    gsap.to(".hello", {
      x: 100,
      duration: 1,
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="hello text-4xl font-bold">
        Welcome to TanStack Start
      </h1>

      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>

      <Link to="/hello">
        Go to hello
      </Link>
    </div>
  );
}