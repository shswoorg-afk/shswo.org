import { createFileRoute } from "@tanstack/react-router";
import NavBar from "../../components/navbar";
import Hero from "../../components/hero";
import Footer from "../../components/Footer";
export const Route = createFileRoute("/")({
  component: Entry,
  head : () =>(
    {
      meta : [
        {
          title : "SHSWO | Saving Humanity Social Work"
        }
      ]
    }
  )
});

function Entry() {
  return (
    <>
    <NavBar/>
    <Hero/>
    <Footer/>
    </>
  )
}
