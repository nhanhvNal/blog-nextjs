import Header from "@/components/common/Header";
import "./globals.css";
import '../assets/css/main.css';
import SessionProvider from "@/shared/providers/SessionProvider";
import Footer from "@/components/common/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={"h-full"}>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
