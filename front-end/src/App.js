import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MangaListPage from "./pages/MangaListPage";
import MangaPage from "./pages/MangaPage";
import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/mangas" element={<MangaListPage />} />
            <Route path="/mangas/:mangaId" element={<MangaPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
