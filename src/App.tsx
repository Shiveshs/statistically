// import ChartsExample from "./components/charts/chartsExample";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CountryPage from "./components/pages/CountryPage";
import Header from "./components/header/Header";
import "./globals.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-gray-800 text-white'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/country/:country' element={<CountryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
