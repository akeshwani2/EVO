import React from "react";
import Header from "@/app/components/ui/Header";
import Hero from "@/app/components/ui/Hero";
import Features from "@/app/components/ui/Features";
import CallToAction from "@/app/components/ui/CallToAction";
import Footer from "@/app/components/ui/Footer";

const page = () => {
  return (
    <div className="min-h-screen w-full text-white antialiased bg-black">
      <Header />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default page;
