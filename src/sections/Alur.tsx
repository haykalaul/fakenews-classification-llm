"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  DocumentTextIcon, 
  CpuChipIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      id: 1,
      icon: DocumentTextIcon,
      title: "Masukkan Berita",
      description: "Copy-paste judul atau isi berita yang ingin kamu verifikasi",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      id: 2,
      icon: CpuChipIcon,
      title: "Analisis AI",
      description: "Sistem AI menganalisis konten dengan database faktual terpercaya",
      color: "from-purple-500 to-pink-500",
      delay: 0.4
    },
    {
      id: 3,
      icon: CheckCircleIcon,
      title: "Hasil Verifikasi",
      description: "Dapatkan hasil apakah berita tersebut fakta atau hoaks dengan penjelasan",
      color: "from-green-500 to-emerald-500",
      delay: 0.6
    }
  ];

  return (
<section id="alur" className="py-27 bg-gradient-to-b from-neutral-950 to-neutral-900">
  <div className="container" ref={ref}>
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <div className="inline-flex py-1 px-3 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 rounded-full text-white/80 font-semibold mb-3">
        Cara Kerja
      </div>
      <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
        Bagaimana Cara Kerjanya?
      </h2>
      <p className="text-xl text-white/60 max-w-2xl mx-auto">
        Proses verifikasi berita yang mudah dan cepat dalam 3 langkah sederhana
      </p>
    </motion.div>

    {/* Steps */}
    <div className="relative">
      {/* Connection Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-20 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hidden lg:block"
        style={{ transformOrigin: "left", transform: "translateX(-50%)" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: step.delay }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mx-auto`}
              >
                <step.icon className="w-7 h-7 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: step.delay + 0.3 }}
                className="text-center mb-2"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full text-white/60 text-sm font-semibold">
                  {step.id}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: step.delay + 0.4 }}
                className="text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-snug text-sm">
                  {step.description}
                </p>
              </motion.div>
            </div>

            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: step.delay + 0.8 }}
                className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
              >
                <ArrowRightIcon className="w-6 h-6 text-white/30" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>

    {/* Example Results */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1 }}
      className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <XCircleIcon className="w-6 h-6 text-red-400" />
          <span className="text-red-400 font-semibold">HOAKS</span>
        </div>
        <h4 className="text-white font-medium mb-2">
          &ldquo;Vaksin COVID-19 Mengandung Microchip&rdquo;
        </h4>
        <p className="text-white/60 text-sm">
          Informasi ini telah diverifikasi sebagai hoaks oleh berbagai lembaga kesehatan internasional.
        </p>
      </div>

      <div className="bg-blue-500/10 border border-green-500/20 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircleIcon className="w-6 h-6 text-blue-400" />
          <span className="text-blue-400 font-semibold">FAKTA</span>
        </div>
        <h4 className="text-white font-medium mb-2">
          &ldquo;Indonesia Berhasil Turunkan Angka Kemiskinan&rdquo;
        </h4>
        <p className="text-white/60 text-sm">
          Data resmi dari BPS menunjukkan penurunan tingkat kemiskinan di Indonesia pada tahun 2023.
        </p>
      </div>
    </motion.div>
  </div>
</section>

  );
}