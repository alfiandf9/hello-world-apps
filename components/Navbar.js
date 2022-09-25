import Link from "next/link";
import { useRouter } from "next/router";
import nookies from 'nookies';

export default function Navbar({ token }) {
  const router = useRouter();

  function handlerLogout(){
    localStorage.clear();
    nookies.destroy(null, 'token');
    nookies.destroy(null, 'expires_in');
    router.replace('/login');
  }

  return (
    <nav className="p-3 bg-gray-800 border-gray-700">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center text-xl self-center text-white">
            <p className="font-normal">hello</p>
            <span className=" font-semibold whitespace-nowrap">World</span>
          </a>
        </Link>

        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex justify-center items-center ml-3 rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:text-white focus:ring-gray-500"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white bg-blue-600 md:dark:bg-transparent" aria-current="page">
                Home
              </a>
            </li>
            {token ? (
              <li>
                <a
                  onClick={handlerLogout}
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 hover:cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <a
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 hover:cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
