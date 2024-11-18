import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button/button";
import { ModeToggle } from "./components/theme/mode-toggle";
import LanguageSwitcher from "./components/theme/language-switcher";
import NavbarSearch from "./components/search/NavbarSearch";
import { useTranslation, Trans } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="h-16 border-b border-primary">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">BitBlogs</h1>
        </Link>
        <nav className="flex space-x-4">
          <NavLink to="">{t("header-nav.nav-link-home")}</NavLink>
          <NavLink to="write">
            <Trans>header-nav.nav-link-write</Trans>
          </NavLink>
          <NavLink to="about">
            <Trans>header-nav.nav-link-about</Trans>
          </NavLink>
        </nav>
        <div className="flex items-center space-x-6">
          <span>
            <NavbarSearch />
          </span>
          <Link to="login">
            <Button>{t("header-nav.sign-in")}</Button>
          </Link>
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
