import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import WritePageKa from "@/i18n/ka/pages/WritePageKa.json";
import WritePageEn from "@/i18n/en/pages/WritePageEn.json";
import ProfilePageKa from "@/i18n/ka/pages/ProfilePageKa.json";
import ProfilePageEn from "@/i18n/en/pages/ProfilePageEn.json";
import HomePageKa from "@/i18n/ka/pages/HomePage/HomePageKa.json";
import HomePageEn from "@/i18n/en/pages/HomePage/HomePageEn.json";
import AuthorPageKa from "@/i18n/ka/pages/AuthorPage.json";
import AuthorPageEn from "@/i18n/en/pages/AuthorPage.json";
import AboutPageKa from "@/i18n/ka/pages/AboutPage.json";
import AboutPageEn from "@/i18n/en/pages/AboutPage.json";
import BlogCardInfoKa from "@/i18n/ka/pages/HomePage/BlogCardInfoKa.json";
import BlogCardInfoEn from "@/i18n/en/pages/HomePage/BlogCardInfoEn.json";
import LoginPageKa from "@/i18n/ka/pages/LoginPageKa.json";
import LoginPageEn from "@/i18n/en/pages/LoginPageEn.json";
import RegisterPageKa from "@/i18n/ka/pages/RegisterPageKa.json";
import RegisterPageEn from "@/i18n/en/pages/RegisterPageEn.json";
import HeaderKa from "@/i18n/ka/components/HeaderKa.json";
import HeaderEn from "@/i18n/en/components/HeaderEn.json";
import customFileInputKa from "@/i18n/ka/components/customFileInputKa.json";
import customFileInputEn from "@/i18n/en/components/customFileInputEn.json";
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
        "author-page": AuthorPageKa,
        "about-page": AboutPageKa,
        "profile-page": ProfilePageKa,
        "write-page": WritePageKa,
        "file-input": customFileInputKa,
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
        "author-page": AuthorPageEn,
        "about-page": AboutPageEn,
        "profile-page": ProfilePageEn,
        "write-page": WritePageEn,
        "file-input": customFileInputEn,
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
