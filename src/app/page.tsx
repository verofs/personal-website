import Navigation from "@/components/Navigation";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import SocialSidebar from "@/components/SocialSidebar";
import HomeSections from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ParticleBackground />
      <SocialSidebar />
      <Navigation />
      <HomeSections />
    </>
  );
}
