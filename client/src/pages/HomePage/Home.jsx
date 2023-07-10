import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Items from "./Items";
import Footer from "./Footer";
import './Home.css'

export default function Home() {
  return (
    <>
      <NavBar search={true} />

      <section className="layout">
        <Header />    
        <Items />     
      </section>

      <Footer />
    </>
  );
}


