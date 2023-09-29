import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='' element={<Auth />} />
      </Routes>
    </Layout>
  );
}

export default App;
