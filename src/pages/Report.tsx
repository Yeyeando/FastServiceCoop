// Report.tsx
import Footer from "../components/general/footer/Footer";
import Header from "../components/general/header/Header";
import ReporteUsuarios from "../components/reports/UserTable";
import ContainsGraphics from "../components/reports/ContainsGraphics";
import CreatePDF from "../components/reports/CreatePDF";

function Report() {
  return (
    <>
      <Header title="Report" showBackButton={false} />
      <div id="report-container">
        <ReporteUsuarios />
        <ContainsGraphics />
      </div>
      <CreatePDF />
      <Footer />
    </>
  );
}

export default Report;
