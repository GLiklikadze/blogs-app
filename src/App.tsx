import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import { ThemeProvider } from "./components/header/components/theme/theme-provider";
import { supabase } from "./supabase/supabaseClient";
import { useAuthContext } from "./context/hooks/useAuthContext";

import AppRoutes from "./routes/appRoutes";

function App() {
  const { handleSetUserId } = useAuthContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUserId(session?.user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetUserId(session?.user);
    });

    return () => subscription.unsubscribe();
  }, [handleSetUserId]);

  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
