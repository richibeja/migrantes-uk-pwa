"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { checkCloudCode, markCloudCodeUsed } from "@/lib/firebaseCodes";
import { useI18n } from "@/components/I18nProvider";

function ActivatePage() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showMessage = (msg: string, type: "success" | "error" | "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleActivateByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = (code || "").trim().toUpperCase();
    if (!normalized) {
      showMessage(t('activate.msg.required'), "error");
      return;
    }

    setIsLoading(true);
    try {
      // Respaldo universal
      let valid = normalized === "GANAFACIL";
      let isCloud = false;

      if (!valid) {
        try {
          const res = await checkCloudCode(normalized);
          if (!res.exists) {
            showMessage(t('activate.msg.invalid'), "error");
            return;
          }
          if (res.used) {
            showMessage(t('activate.msg.used'), "error");
            return;
          }
          valid = true;
          isCloud = true;
        } catch {
          showMessage(t('activate.msg.verifyError'), "error");
          return;
        }
      }

      if (!valid) {
        showMessage("Código no válido", "error");
        return;
      }

      // Crear sesión activa por 30 días
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      localStorage.setItem(
        "ganaFacilUser",
        JSON.stringify({
          id: `code_${Date.now()}`,
          username: null,
          isAdmin: false,
          isActivated: true,
          status: "active",
          plan: "basic",
          expiresAt,
          activatedWith: normalized,
          createdAt: new Date(),
        })
      );

      // Marcar código como usado si viene de la nube
      if (isCloud) {
        try {
          await markCloudCodeUsed(normalized, "code-user");
        } catch {}
      }

      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{t('activate.title')}</h1>
          <p className="text-gray-400">{t('activate.subtitle')}</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              messageType === "success"
                ? "bg-green-900/50 border border-green-500 text-green-200"
                : messageType === "error"
                ? "bg-red-900/50 border border-red-500 text-red-200"
                : "bg-blue-900/50 border border-blue-500 text-blue-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <form onSubmit={handleActivateByCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('activate.label.code')}
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder={t('activate.placeholder.code')}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('activate.loading') : t('activate.btn')}
            </button>
          </form>
        </div>

        <div className="text-center">
          <a
            href={`https://wa.me/19295909116?text=${encodeURIComponent(
              "Hola, necesito ayuda con Migrantes UK"
            )}`}
            target="_blank"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            {t('activate.whatsapp')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ActivatePage), { ssr: false });
