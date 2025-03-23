import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-[#CA0808] border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/images/mini_logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Heart2Heart</span>
        </Link>
        <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href="/" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/chatbot" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Chatbot</Link>
            </li>
            <li>
              <Link href="/tracker" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Tracker</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
