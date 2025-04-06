import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/post", label: "Post" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Get in Touch" },
];

const Navbar = () => (
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
);

export default Navbar;
