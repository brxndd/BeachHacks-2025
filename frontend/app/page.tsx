'use client';
import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Questionnaire from "../components/Questionnaire";
import Link from 'next/link'

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
              width={150}
              height={150}
              className="object-contain h-screen md:w-48 md:h-48 lg:w-56 lg:h-56 animate-heartbeat overflow-hidden"
            />
          </div>
        
          <div className="text-[#8a2929] flex justify-center items-center flex-col ">
            <h1 className="text-5xl font-bold mt-8 md:text-6xl lg:text-7xl">HEART2HEART </h1>
            <p className="text-xl mb-4 italic">Small Steps, Big Impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            <Link href="/todo">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-[#8a2929]">Daily Checklist</h2>
                <p className="mt-2 text-gray-600">Tailored tasks to do everyday. </p>
              </div>
            </Link>

            <Link href="/chatbot">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-[#8a2929]">Chatbot</h2>
                <p className="mt-2 text-gray-600">Interact with our AI-powered chatbot.</p>
              </div>
             </Link>

            
            <Link href="/medication">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-[#8a2929]">Tracker</h2>
                <p className="mt-2 text-gray-600">Track your health metrics with ease.</p>
              </div>
            </Link>

           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
