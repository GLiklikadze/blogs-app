import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import PageContainer from "../page-container/PageContainer";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Layout;
