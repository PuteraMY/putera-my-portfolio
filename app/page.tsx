import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
export default function HomePage() {
  return <><Header/><main id="main-content"><Hero/><Projects/><Skills/><About/><Contact/></main><Footer/><BackToTop/></>;
}
