"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ChevronDownIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
   
} from "@heroicons/react/24/outline";

export default function PanduanSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Seberapa akurat sistem AI dalam mendeteksi hoaks?",
      answer: "Sistem AI kami memiliki tingkat akurasi yang tinggi, namun tidak 100% sempurna. AI menganalisis berdasarkan database faktual, pola konten, dan sumber terpercaya. Kami merekomendasikan untuk selalu melakukan verifikasi tambahan dari sumber resmi."
    },
    {
      id: 2,
      question: "Apakah sistem ini dapat mendeteksi semua jenis hoaks?",
      answer: "Sistem kami dapat mendeteksi berbagai jenis hoaks seperti berita palsu, manipulasi gambar, dan klaim yang tidak berdasar. Namun, hoaks yang sangat baru atau sophisticated mungkin memerlukan waktu lebih lama untuk dideteksi."
    },
    {
      id: 3,
      question: "Dari mana sumber database faktual yang digunakan?",
      answer: "Database kami menggunakan sumber terpercaya seperti lembaga pemerintah, organisasi fact-checking internasional, media mainstream yang kredibel, dan jurnal ilmiah. Database ini terus diperbarui secara berkala."
    },
    {
      id: 4,
      question: "Apakah data yang saya masukkan akan disimpan?",
      answer: "Kami tidak menyimpan konten berita yang Anda masukkan untuk verifikasi. Data hanya diproses sementara untuk analisis dan langsung dihapus setelah hasil ditampilkan demi menjaga privasi Anda."
    },
    {
      id: 5,
      question: "Bagaimana jika hasil verifikasi tidak sesuai dengan ekspektasi?",
      answer: "Hasil verifikasi didasarkan pada analisis objektif AI. Jika Anda tidak setuju dengan hasil, kami sarankan untuk melakukan fact-checking manual dari sumber-sumber resmi dan terpercaya."
    },
    {
      id: 6,
      question: "Apakah layanan ini berbayar?",
      answer: "Saat ini layanan verifikasi berita kami tersedia gratis untuk penggunaan dasar. Untuk fitur advanced atau penggunaan dalam skala besar, tersedia paket premium dengan fitur tambahan."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="panduan" className="py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex py-1 px-3 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 rounded-full text-white/80 font-semibold mb-4">
            Panduan & FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar sistem verifikasi berita kami
          </p>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-neutral-800/40 to-neutral-700/40 border border-gray-500/30 rounded-2xl p-8 mb-12 text-gray-300"
        >
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-amber-300 mb-3">
                Penting untuk Diketahui
              </h3>
              <div className="space-y-3 text-white/80">
                <p>
                  <strong>Disclaimer:</strong> Website ini merupakan alat bantu untuk verifikasi berita yang menggunakan teknologi AI. 
                  Hasil verifikasi <strong>tidak dapat dipercaya 100%</strong> dan tidak boleh dijadikan satu-satunya sumber kebenaran.
                </p>
                <p>
                  Kami sangat menyarankan untuk selalu melakukan verifikasi tambahan dari sumber-sumber resmi dan terpercaya 
                  seperti lembaga pemerintah, media mainstream yang kredibel, atau organisasi fact-checking yang diakui.
                </p>
                <p>
                  Gunakan hasil verifikasi ini sebagai <strong>panduan awal</strong>, bukan keputusan final dalam menentukan 
                  kebenaran suatu informasi.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <QuestionMarkCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="w-5 h-5 text-white/60" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="pl-10 pr-4">
                        <p className="text-white/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

    
         
      </div>
    </section>
  );
}