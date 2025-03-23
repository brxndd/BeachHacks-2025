import Image from "next/image";
import Questionnaire from "../components/Questionnaire";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {

  return (
    <div>
      <NavBar />
      <Questionnaire />
      <Footer />
    </div>
  );
}
