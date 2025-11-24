import Header from "./components/layout/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
      </>
  );
}

export default App;
