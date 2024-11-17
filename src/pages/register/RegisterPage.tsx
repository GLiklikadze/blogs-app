import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();
  return <div>{t("lang-version")}</div>;
};

export default RegisterPage;
