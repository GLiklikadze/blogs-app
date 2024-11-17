import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LoginPageKa from "@/i18n/ka/pages/LoginPageKa.json";
import LoginPageEn from "@/i18n/en/pages/LoginPageEn.json";

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      translation: {
        "login-page": LoginPageKa,
      },
    },
    en: {
      translation: {
        "login-page": LoginPageEn,
      },
    },
  },
  lng: "ka",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
