import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-[#8a2929] border-gray-200 h-16">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative h-full">
        {/* Logo on left - Unchanged */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse z-10">
          <Image
            src="/images/mini_logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Heart2Heart</span>
        </Link>

        {/* Centered Navigation Links - Unchanged */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 h-full items-center space-x-8">
          <Link 
            href="/" 
            className={`text-lg ${pathname === '/' ? 'text-red-200 font-bold' : 'text-white'} hover:text-[#ffcccc] hover:scale-105 transition-colors duration-200 font-bold`}
          >
            Home
          </Link>
          <Link 
            href="/chatbot" 
            className={`text-lg ${pathname === '/chatbot' ? 'text-red-200 font-bold' : 'text-white'} hover:text-[#ffcccc] hover:scale-105 transition-colors duration-200 font-bold`}
          >
            Chatbot
          </Link>
          <Link 
            href="/medication" 
            className={`text-lg ${pathname === '/medication' ? 'text-red-200 font-bold' : 'text-white'} hover:text-[#ffcccc] hover:scale-105 transition-colors duration-200 font-bold`}
          >
            Medication
          </Link>
          <Link 
            href="/todo" 
            className={`text-lg ${pathname === '/todo' ? 'text-red-200 font-bold' : 'text-white'} hover:text-[#ffcccc] hover:scale-105 transition-colors duration-200 font-bold`}
          >
            To-Do List
          </Link>
        </div>

        {/* Updated Auth Buttons on right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex gap-4">
          {session ? (
            // Show sign out button when authenticated
            <button
              onClick={() => signOut()}
              className="bg-white text-[#8a2929] px-6 py-2 rounded-full text-lg font-semibold 
                       hover:text-[#ff0000] transition-colors duration-200 shadow-sm
                       hover:shadow-md"
            >
              Sign Out
            </button>
          ) : (
            // Show sign in/sign up when not authenticated
            <>
              <Link
                href="/signin"
                className="bg-white text-[#8a2929] px-6 py-2 rounded-full text-lg font-semibold 
                         hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-white text-[#8a2929] px-6 py-2 rounded-full text-lg font-semibold 
                         hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md border-2 border-[#8a2929]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}