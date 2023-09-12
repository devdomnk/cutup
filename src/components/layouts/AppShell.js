import { AppShell } from "@mantine/core";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function AppShellFunction({ children }) {
  let location = useLocation();

  return (
    <AppShell
      padding={0}
      header={
        <Header
          links={[
            { label: "Startseite", link: "/" },
            { label: "Produkte", link: "/produkte" },
            { label: "Konfigurator", link: "/konfigurator" },
          ]}
        />
      }
      footer={
        <Footer
          links={[
            { label: "Kontakt", link: null },
            { label: "Hilfe", link: "/hilfe" },
            { label: "Geschäftsbedingungen", link: null },
          ]}
        />
      }
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
      })}
    >
      {children}
    </AppShell>
  );
}
