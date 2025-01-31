import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const PublicLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </main>
  );
};

export default PublicLayout;
