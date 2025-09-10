import React, { useState } from "react";
import { Search, FileText, Download, CheckCircle } from "lucide-react";
// import img from "../assets/images/certificate.png";

const CertificateSearch = () => {
  const [nomorPeserta, setNomorPeserta] = useState("");
  const [valid, setValid] = useState(false);
  const [fileId, setFileId] = useState("");
  const [pesan, setPesan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const daftarPeserta = [
    { nama: "salis", fileId: "1A9N60-OYI0-DHl6ybLElJk6oAY6qeA80" },
    { nama: "ahmad", fileId: "1A9N60-OYI0-DHl6ybLElJk6oAY6qeA80" },
    { nama: "sholeh", fileId: "1A9N60-OYI0-DHl6ybLElJk6oAY6qeA80" },
    { nama: "003", fileId: "1A9N60-OYI0-DHl6ybLElJk6oAY6qeA80" },
    { nama: "004", fileId: "1A9N60-OYI0-DHl6ybLElJk6oAY6qeA80" },
  ];

  const typewriterWords = [
    "Masukkan nama atau nomor sertifikat yang telah diberikan kepada Anda",
    "Temukan dan unduh bukti keikutsertaan Anda dalam acara atau pelatihan",
    "Validasi keaslian sertifikat Anda dengan sistem pencarian terintegrasi",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 80;
    const currentWord = typewriterWords[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
      } else {
        setCurrentText(
          isDeleting
            ? currentWord.substring(0, currentText.length - 1)
            : currentWord.substring(0, currentText.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  const cariSertifikat = async () => {
    setIsLoading(true);
    const input = nomorPeserta.trim().toLowerCase();

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const peserta = daftarPeserta.find((p) => p.nama.toLowerCase() === input);

    if (peserta) {
      setFileId(peserta.fileId);
      setValid(true);
      setPesan("");
    } else {
      setValid(false);
      setPesan("Nama atau nomor peserta tidak ditemukan dalam database kami!");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      cariSertifikat();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-200 to-blue-300 font-sans">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Academy Capital Energy
                </h1>
                <p className="text-xs text-gray-500">Sertifikat Digital</p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <a
                href="https://academycapitalenergy.com/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium 
               text-xs px-3 py-1.5 
               md:text-base md:px-6 md:py-2 
               rounded-full transition-colors"
              >
                Back To Home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <p className="text-lg md:text-4xl font-bold text-blue-800 mb-2">
              Academy Capital Energy
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
              Cari Sertifikat Anda
            </h1>
          </div>

          {/* Typewriter Text */}
          <div className="h-16 flex items-center justify-center mb-8">
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl leading-relaxed">
              {currentText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 p-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap atau nomor sertifikat..."
                    value={nomorPeserta}
                    onChange={(e) => setNomorPeserta(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-6 py-4 text-lg text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                </div>
                <button
                  onClick={cariSertifikat}
                  disabled={isLoading || !nomorPeserta.trim()}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                    isLoading || !nomorPeserta.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mencari...</span>
                    </div>
                  ) : (
                    "Cari Sertifikat"
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {pesan && (
              <div className="mt-6 bg-red-50/90 backdrop-blur-sm border border-red-200/50 rounded-lg p-4">
                <p className="text-red-700 font-medium text-center">{pesan}</p>
              </div>
            )}
          </div>
        </div>

        {/* Result Section */}
        {valid && (
          <div className="mt-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
              {/* Success Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">
                    Sertifikat Ditemukan!
                  </h3>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="p-6">
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg overflow-hidden mb-6 border border-gray-200/50">
                  <iframe
                    title="Preview Sertifikat"
                    src={`https://drive.google.com/file/d/${fileId}/preview`}
                    allow="autoplay"
                    className="w-full h-[400px] md:h-[500px] border-0"
                  />
                </div>

                {/* Download Button */}
                <div className="text-center">
                  <a
                    href={`https://be-searchser-production.up.railway.app/download/${fileId}/${encodeURIComponent(
                      nomorPeserta.trim()
                    )}`}
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <Download className="w-5 h-5" />
                    <span>Unduh Sertifikat</span>
                  </a>
                  <p className="text-gray-600 text-sm mt-3">
                    File akan diunduh dalam format PDF berkualitas tinggi
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Pencarian Cepat
            </h3>
            <p className="text-gray-600 text-sm">
              Sistem pencarian yang responsif dan akurat untuk menemukan
              sertifikat Anda
            </p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Verifikasi Resmi
            </h3>
            <p className="text-gray-600 text-sm">
              Semua sertifikat telah diverifikasi dan tersimpan dengan aman di
              sistem kami
            </p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Unduh Mudah</h3>
            <p className="text-gray-600 text-sm">
              Download sertifikat dalam format PDF berkualitas tinggi kapan saja
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateSearch;
