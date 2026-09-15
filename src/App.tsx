import DownloadToday from "./components/DownloadToday";
import Navbar from "./components/Navbar";
import WaitlistModal from "./components/WaitlistModal";
import "./index.css";
import Features from "./sections/Features";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import ReadyToSave from "./sections/ReadyToSave";
import Works from "./sections/Works";
import { useDashboard, useWaitlistOpen } from "./zustand";


export function App() {
  const { downloadModal, setDownloadModal } = useDashboard();
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Works />
      <ReadyToSave />
      <Footer /> 
      <DownloadToday open={downloadModal} onClose={() => setDownloadModal(false)} />
    </main>
  );
}

export default App;
