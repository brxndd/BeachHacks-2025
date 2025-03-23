import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Questionnaire from "../components/Questionnaire";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <Image
              src="/images/Heart.png"
              alt="Logo"
              width={150}  // Smaller default size
              height={150}  // Smaller default size
              className="object-contain mt-32 md:mt-40 lg:mt-48 md:w-48 md:h-48 lg:w-56 lg:h-56"
            />
          </div>


          <div className="text-[#CA0808] flex justify-center items-center flex-col">
            <h1 className="text-5xl font-bold mt-8 md:text-6xl lg:text-7xl">HEART2HEART </h1>
            <p className="text-xl mb-32 italic">Small Steps, Big Impact</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-[#CA0808]">Daily Checklist</h2>
              <p className="mt-2 text-gray-600">Explore our services and re</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-[#CA0808]">Chatbot</h2>
              <p className="mt-2 text-gray-600">Interact with our AI-powered chatbot.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-[#CA0808]">Tracker</h2>
              <p className="mt-2 text-gray-600">Track your health metrics with ease.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
