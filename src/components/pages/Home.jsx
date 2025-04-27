import React from "react";
import Hero from "../structure/Home/Hero";
import ProductSlider from "../structure/Home/ProductSlider";
import InfoCollection from "../structure/Home/InfoCollection";
import ContactSection from "../structure/Home/Contact";
import Footer from "../structure/Home/Footer";
import MMSUServices from "../structure/Home/Services";


export const Home = () => {
  return (
    <>
        <Hero />
        <MMSUServices/>
        <ProductSlider />
        <InfoCollection />
        <ContactSection />
        <Footer/>

    </>
  );
};
export default Home;
