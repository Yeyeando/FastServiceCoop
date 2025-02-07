import Footer from "../components/general/footer/Footer";
import Header from "../components/general/header/Header";
import ReporteUsuarios from "../components/reports/userTable";
import ContainsGraphics from "../components/reports/ContainsGraphics";
function Report() {
  return (
    <>
      <Header title="Report" showBackButton={false} />
      <ReporteUsuarios />
      <ContainsGraphics />
      <Footer />
    </>
  );
}

export default Report;
