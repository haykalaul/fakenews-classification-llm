"use client";

import design1 from "@/assets/design-example-1.png";
import design2 from "@/assets/design-example-2.png";
import Image from "next/image";
import Pointer from "@/components/PointerHome";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import cursorYouImage from "@/assets/cursor-you.svg";

export default function Hero() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate();
  const [leftPointerScope, leftPointerAnimate] = useAnimate();
  const [rightDesignScope, rightDesignAnimate] = useAnimate();
  const [rightPointerScope, rightPointerAnimate] = useAnimate();

  useEffect(() => {
    leftDesignAnimate([
      [leftDesignScope.current, { opacity: [1] }, { duration: 0.5 }],
      [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ]);
    leftPointerAnimate([
      [leftPointerScope.current, { opacity: [1] }, { duration: 0.5 }],
      [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
      [
        leftPointerScope.current,
        { x: 0, y: [0, 16, 0] },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ]);
    rightDesignAnimate([
      [rightDesignScope.current, { opacity: [1] }, { duration: 0.5 }],
      [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ]);
    rightPointerAnimate([
      [rightPointerScope.current, { opacity: [1] }, { duration: 0.5 }],
      [rightPointerScope.current, { x: 175, y: 0 }, { duration: 0.5 }],
      [
        rightPointerScope.current,
        { x: 0, y: [0, 20, 0] },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ]);
  }, []);

  const scrollToDeteksi = () => {
    const deteksiSection = document.getElementById('deteksi');
    if (deteksiSection) {
      deteksiSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="hero"
      className="mt-18 mb-8 md:mb-16  sl:mb-auto overflow-x-clip"
      style={{ cursor: `url(${cursorYouImage.src}), auto` }}
    >
      <div className="container relative">
        {/* Left Design */}
        <motion.div
          ref={leftDesignScope}
          initial={{ opacity: 0, y: -100, x: -100 }}
          drag
          className="absolute -left-32 top-16 hidden lg:block"
        >
          <Image src={design1} draggable="false" alt="design1" />
        </motion.div>

        {/* Left Pointer */}
        <motion.div
          ref={leftPointerScope}
          initial={{ opacity: 0, y: -100, x: -200 }}
          className="absolute left-56 top-96 lg:block hidden"
        >
          <Pointer name="Beneran" />
        </motion.div>

        {/* Right Design */}
        <motion.div
          ref={rightDesignScope}
          initial={{ opacity: 0, y: 100, x: 100 }}
          drag
          className="absolute -right-64 -top-16 hidden lg:block"
        >
          <Image src={design2} alt="design2" draggable="false" />
        </motion.div>

        {/* Right Pointer */}
        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, y: 100, x: 275 }}
          className="absolute right-80 -top-4 lg:block hidden"
        >
          <Pointer name="Bohongan" color="red" />
        </motion.div>

        {/* Content */}
      

        <h1 className="text-6xl md:text-7xl sl:text-6xl font-medium text-center mt-1">
          Beneran Nih?
        </h1>

        <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto leading-relaxed">
          Bantu kamu membedakan mana berita yang valid dan mana yang cuma hoaks.  
          Jangan sampai termakan informasi palsu — cek dulu sebelum percaya.  
          Masukkan isi berita yang kamu ragu, dan biarkan sistem kami memverifikasi keasliannya dengan analisis cerdas berbasis AI.  
          Gratis, cepat, dan akurat.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            onClick={scrollToDeteksi}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span>Cek Berita Sekarang</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}