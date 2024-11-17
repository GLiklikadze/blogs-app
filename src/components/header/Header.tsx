import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import LanguageSwitcher from "../theme/language-switcher";
import SearchElement from "../search";
import { CommandMenu } from "../CommandMenu";
import NavbarSearch from "../blogCard/NavbarSearch";

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">BitBlogs</h1>
        </Link>
        <nav className="flex space-x-4">
          <NavLink to="">Home</NavLink>
          <NavLink to="write">Write</NavLink>
          <NavLink to="about">About</NavLink>
        </nav>
        <div className="flex items-center space-x-6">
          <span>
            <NavbarSearch />
          </span>

          <Link to="login">
            <Button>Sing in</Button>
          </Link>
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
