import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppFloatButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = "+212664685824";
  const { dir, t } = useLanguage();
  
  const message = t("whatsapp.newRegistration");

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`fixed bottom-6 z-50 ${dir === "rtl" ? "left-6" : "right-6"}`}
    >
      {/* Expanded card */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-80 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-3`}>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <ImWhatsapp className="w-6 h-6 text-white" />
              </div>
              <div className={dir === "rtl" ? "text-right" : "text-left"}>
                <h3 className="font-semibold text-gray-800">{t("whatsapp.float.title")}</h3>
                <p className="text-sm text-gray-600">{t("whatsapp.float.subtitle")}</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className={`text-sm text-gray-700 mb-2 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                {t("whatsapp.float.greeting")}
              </p>
              <div className={`flex items-center text-xs text-gray-500 ${dir === "rtl" ? "space-x-reverse" : ""} space-x-2`}>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{t("whatsapp.float.replyTime")}</span>
              </div>
            </div>

            <button
              onClick={openWhatsApp}
              className={`w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98] ${dir === "rtl" ? "space-x-reverse" : ""} space-x-2`}
            >
              <ImWhatsapp className="w-5 h-5" />
              <span>{t("whatsapp.float.startChat")}</span>
            </button>

            <p className="text-xs text-gray-500 text-center">
              {t("whatsapp.float.clickToChat")}
            </p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <div className="relative group">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative overflow-hidden"
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20"></div>

          <ImWhatsapp className="w-8 h-8 relative z-10" />

          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </button>

        {/* Tooltip */}
        {!isExpanded && (
          <div
            className={`absolute bottom-20 bg-gray-800 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none ${
              dir === "rtl" ? "left-0" : "right-0"
            }`}
          >
            {t("whatsapp.float.tooltip")}
            <div
              className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 ${
                dir === "rtl" ? "left-4" : "right-4"
              }`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}