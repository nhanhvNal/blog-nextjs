const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-8">
      <div className="max-w-9xl mx-auto px-6 text-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
        <div className="mt-4">
          <ul className="flex justify-center space-x-10">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white hover:text-yellow-300 transition-all duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
