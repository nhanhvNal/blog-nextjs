import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {" "}
      <Header />
      {children}
      <Footer />
    </>
  );
}
