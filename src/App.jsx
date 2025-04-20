import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import AuthPage from "./pages/AuthPage"
import ProfilePage from "./pages/ProfilePage"
import ArchitectProfilePage from "./pages/ArchitectProfilePage"
import BudgetPage from "./pages/BudgetPage"
import SearchPage from "./pages/SearchPage"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/busca" element={<SearchPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/perfil/orcamentos" element={<BudgetPage />} />
          <Route path="/perfil/*" element={<ProfilePage />} />
          <Route path="/arquiteto/:id" element={<ArchitectProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
