"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const heightHeader = 20;

  useEffect(() => {
    setIsScrolled(window.scrollY > heightHeader);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > heightHeader);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heightHeader]);

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

      <div className="relative bg-gradient-to-r py-8 from-blue-600 to-teal-500 p text-center text-white overflow-hidden">
        <div
          className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6 flex justify-center items-center z-50 transition-all  ${
            isScrolled
              ? "bg-gradient-to-r top-0 from-blue-600 to-teal-500 py-6 max-w-full text-center text-white mt-[-15px]"
              : "bg-transparent"
          }`}
        >
          <div
            className={`flex justify-between items-center gap-8${
              isScrolled ? " max-w-6xl" : ""
            }`}
          >
            <div className="text-3xl font-bold text-white">
              <Link href="/" aria-label="Go to Home Page">
                Tech Insights Blog
              </Link>
            </div>
            <Navbar />
            <div className="flex items-center space-x-4 relative">
              {session ? (
                <UserAvatar
                  imageUrl={session.user?.image}
                  name={session.user?.name}
                  onClick={toggleDropdown}
                />
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-white text-blue-500 rounded-full px-6 py-2 shadow-md hover:shadow-xl active:scale-98 active:translate-y-0.5 transition-all duration-300 ease-in-out"
                >
                  Sign In
                </button>
              )}

              {isDropdownOpen && session && (
                <div
                  ref={dropdownRef}
                  className="absolute z-[2] top-8 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black transition-all transform opacity-0 animate-dropdown"
                  style={{
                    transform: "translateY(0)",
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  <div className="p-4 grid gap-4">
                    <p className="font-semibold text-lg">
                      Hello {session.user?.name}
                    </p>
                    <Button
                      className="w-full"
                      label="Dashboard"
                      color="lime"
                      onClick={() => {
                        router.push("/dashboard");
                        setIsDropdownOpen(false);
                      }}
                    />
                    <Button
                      className="w-full"
                      label="Logout"
                      color="teal"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
