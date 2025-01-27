import { Outlet, ScrollRestoration } from "react-router";
import Header from "../components/Header";

const PublicLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </main>
  );
};

export default PublicLayout;
