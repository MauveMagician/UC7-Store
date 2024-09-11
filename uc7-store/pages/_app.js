import React from "react";
import { UserContextProvider } from "@/context/UserContext";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Caverna do Guerreiro",
  description: "Uma loja de produtos medievais",
};

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
