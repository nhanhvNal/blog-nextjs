"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import LoadingPage from "./LoadingPage";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/post", label: "Post" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await signIn();
      } catch {
        alert("Login error:");
      }
      setIsLoading(false);
    }, 1000);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <LoadingPage isLoading={isLoading} />
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 py-5 ">
        <div className="flex-grow max-w-4xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-bold text-white">
            <Link href="/">My Blog</Link>
          </div>
          <nav>
            <ul className="flex space-x-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-yellow-300 transition-all duration-300 font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4 relative">
            {session ? (
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-white text-blue-500 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">
                      {session.user?.name?.[0]}
                    </span>
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white text-blue-500 rounded-full px-6 py-2 shadow-md hover:shadow-xl active:scale-98 active:translate-y-0.5 transition-all duration-300 ease-in-out"
              >
                Login
              </button>
            )}

            {isDropdownOpen && session && (
              <div
                ref={dropdownRef}
                className="absolute top-8 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black transition-all transform opacity-0 animate-dropdown"
                style={{ transform: "translateY(0)" }}
              >
                <div className="p-4">
                  <p className="font-semibold">{session.user?.name}</p>
                  <button
                    onClick={() => signOut()}
                    className="mt-2 w-full text-left text-blue-500 hover:bg-gray-100 rounded-lg py-2 px-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
