"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  PaperAirplaneIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  ClipboardDocumentIcon
} from "@heroicons/react/24/outline";

export default function DetectionSection() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  type DetectionResult = {
    label: "REAL" | "FAKE";
    confidence: number;
  };
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fungsi untuk deteksi menggunakan Hugging Face API
  const detectFakeNews = async (text: string) => {
    try {
      const response = await fetch("/api/detect-fake-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Gagal melakukan deteksi");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error detecting fake news:", err);
      throw err;
    }
  };

  // Fungsi untuk mendapatkan penjelasan dari DeepSeek API
  interface GetExplanationRequest {
    text: string;
    isReal: boolean;
    prompt: string;
  }

  interface GetExplanationResponse {
    explanation: string;
  }

  const getExplanation = async (
    text: string,
    isReal: boolean
  ): Promise<string> => {
    try {
      const response = await fetch("/api/explain-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          isReal,
          prompt: `Berikan penjelasan dalam bahasa Indonesia mengapa berita ini dikategorikan sebagai ${isReal ? 'FAKTA' : 'HOAKS'}. Jelaskan dengan detail dan berikan alasan yang masuk akal.`
        } as GetExplanationRequest),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan penjelasan");
      }

      const data: GetExplanationResponse = await response.json();
      return data.explanation;
    } catch (error) {
      console.error("Error getting explanation:", error);
      throw error;
    }
  };

  // Handler untuk submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError("Harap masukkan teks berita yang ingin diverifikasi");
      return;
    }

    if (inputText.trim().length < 10) {
      setError("Teks berita terlalu pendek. Minimal 10 karakter");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);
    setExplanation("");

    try {
      // Step 1: Deteksi fake news
      const detectionResult = await detectFakeNews(inputText);
      
      // Step 2: Dapatkan penjelasan
      const explanationText = await getExplanation(
        inputText, 
        detectionResult.label === "REAL"
      );

      setResult(detectionResult);
      setExplanation(explanationText);
      
    } catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.error("Error getting explanation:", error);
  throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk copy text
  const handleCopyExample = (text: string) => {
    setInputText(text);
  };

  const exampleTexts = [
    "Pemerintah mengumumkan kenaikan UMP sebesar 6.5% untuk tahun 2024 berdasarkan perhitungan inflasi dan pertumbuhan ekonomi",
    "Breaking: Ditemukan obat Covid-19 dari kunyit yang dapat menyembuhkan dalam 24 jam menurut penelitian rahasia",
    "Bank Indonesia memutuskan untuk mempertahankan suku bunga acuan di level 6.00% pada rapat dewan gubernur bulan ini"
  ];

  return (
    <section id="deteksi" className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex py-1 px-3 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800  rounded-full text-white/80 font-semibold mb-4">
            Mulai Deteksi
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
            Verifikasi Berita Sekarang
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Masukkan teks berita yang ingin kamu verifikasi. Sistem AI akan menganalisis dan memberikan hasil yang akurat
          </p>
        </motion.div>

        {/* Main Detection Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Text Input */}
              <div>
                <label className="block text-white/80 font-medium mb-3">
                  Masukkan Teks Berita
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste atau ketik teks berita yang ingin kamu verifikasi di sini..."
                  className="w-full h-40 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isLoading}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/50 text-sm">
                    {inputText.length}/2000 karakter
                  </span>
                  {inputText.length > 2000 && (
                    <span className="text-red-400 text-sm">
                      Teks terlalu panjang
                    </span>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
                >
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-400">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading || inputText.length > 2000}
                  className=" bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Verifikasi Berita
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Example Texts - Hanya tampil jika belum ada hasil */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <p className="text-white/60 text-center mb-4">
              Atau coba contoh berita ini:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exampleTexts.map((text, index) => (
                <button
                  key={index}
                  onClick={() => handleCopyExample(text)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 text-left transition-all duration-300 group"
                  disabled={isLoading}
                >
                  <div className="flex items-start gap-3">
                    <ClipboardDocumentIcon className="w-5 h-5 text-white/40 mt-0.5 group-hover:text-white/60" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {text.length > 80 ? `${text.substring(0, 80)}...` : text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {/* Result Header */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {result.label === "REAL" ? (
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-8 h-8 text-green-400" />
                    <span className="text-2xl font-semibold text-green-400">
                      FAKTA
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <XCircleIcon className="w-8 h-8 text-red-400" />
                    <span className="text-2xl font-semibold text-red-400">
                      HOAKS
                    </span>
                  </div>
                )}
              </div>

              {/* Confidence Score */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Tingkat Kepercayaan</span>
                  <span className="text-white font-semibold">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      result.label === "REAL"
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : "bg-gradient-to-r from-red-400 to-red-500"
                    }`}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              {/* Explanation */}
              {explanation && (
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <SparklesIcon className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Penjelasan AI
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {explanation}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Example Texts - Tampil setelah hasil */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <p className="text-white/60 text-center mb-4">
              Coba contoh berita lainnya:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exampleTexts.map((text, index) => (
                <button
                  key={index}
                  onClick={() => handleCopyExample(text)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 text-left transition-all duration-300 group"
                  disabled={isLoading}
                >
                  <div className="flex items-start gap-3">
                    <ClipboardDocumentIcon className="w-5 h-5 text-white/40 mt-0.5 group-hover:text-white/60" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {text.length > 80 ? `${text.substring(0, 80)}...` : text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}