import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HomePageKa from "@/i18n/ka/pages/HomePage/HomePageKa.json";
import HomePageEn from "@/i18n/en/pages/HomePage/HomePageEn.json";
import BlogCardInfoKa from "@/i18n/ka/pages/HomePage/BlogCardInfoKa.json";
import BlogCardInfoEn from "@/i18n/en/pages/HomePage/BlogCardInfoEn.json";
import LoginPageKa from "@/i18n/ka/pages/LoginPageKa.json";
import LoginPageEn from "@/i18n/en/pages/LoginPageEn.json";
import RegisterPageKa from "@/i18n/ka/pages/RegisterPageKa.json";
import RegisterPageEn from "@/i18n/en/pages/RegisterPageEn.json";
import HeaderKa from "@/i18n/ka/components/HeaderKa.json";
import HeaderEn from "@/i18n/en/components/HeaderEn.json";
import modeToggleKa from "@/i18n/ka/components/modeToggleKa.json";
import modeToggleEn from "@/i18n/en/components/modeToggleEn.json";
import footerKa from "@/i18n/ka/components/footerKa.json";
import footerEn from "@/i18n/en/components/footerEn.json";

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      translation: {
        "login-page": LoginPageKa,
        "register-page": RegisterPageKa,
        "header-nav": HeaderKa,
        "mode-toggle": modeToggleKa,
        "footer-component": footerKa,
        "home-page": HomePageKa,
        "card-info": BlogCardInfoKa,
      },
    },
    en: {
      translation: {
        "login-page": LoginPageEn,
        "register-page": RegisterPageEn,
        "header-nav": HeaderEn,
        "mode-toggle": modeToggleEn,
        "footer-component": footerEn,
        "home-page": HomePageEn,
        "card-info": BlogCardInfoEn,
      },
    },
  },
  lng: "ka",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
