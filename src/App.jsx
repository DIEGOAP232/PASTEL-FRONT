import Header from "./components/layout/Header/Header";
import AppRoutes from "./routes/AppRoutes";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      </>
  );
}

export default App;
