import { createFileRoute } from "@tanstack/react-router";
import NavBar from "../../components/navbar";
import Hero from "../../components/hero";
import Footer from "../../components/Footer";
import { getCurrentUser } from "../../serverFunc/auth";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const user = await getCurrentUser();

    return { user };
  },

  component: Entry,

  head: () => ({
    meta: [
      {
        title: "SHSWO | Saving Humanity Social Work",
      },
    ],
  }),
});

function Entry() {
  const { user } = Route.useRouteContext();

  return (
    <>
      <NavBar user={user} />
      <Hero />
      <Footer />
    </>
  );
}