import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import RebelBot from "@/components/RebelBot";
import Experience from "@/components/Experience";
import Languages from "@/components/Languages";
import TravelGlobe from "@/components/TravelGlobe";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <RebelBot />
      <Experience />
      <Languages />
      <TravelGlobe />
      <Community />
      <Footer />
    </>
  );
}
