'use client';
import Image from "next/image";
import Questionnaire from "../components/Questionnaire";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Image
              src="/images/Heart2Heart_white.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-8"
            />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-[#CA0808]">Home</h2>
              <p className="mt-2 text-gray-600">Explore our services and resources.</p>
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
          <div className="text-center mt-8 space-x-4">
            <button className="bg-[#CA0808] text-white px-6 py-2 rounded-lg hover:bg-red-800">Sign Up</button>
            <button className="bg-[#CA0808] text-white px-6 py-2 rounded-lg hover:bg-red-800">Sign In</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
