import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-12 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>© 2023 BitBlogs. {t("footer-component.all-rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
