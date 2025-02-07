import Header from "../components/general/header/Header";
import Tables from "../components/main-waiter/gallery/Gallery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Footer from "../components/general/footer/Footer";
function MainWaiter() {
  return (
    <>
      <Header title="Select a table" showBackButton={false} />
      <Tables nextRoute={"/MenuWaiter"} />
      <Footer/>
    </>
  );
}

export default MainWaiter;
