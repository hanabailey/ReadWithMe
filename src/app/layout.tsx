import "./globals.css";
import { Inter, Dancing_Script, Open_Sans, Poppins } from "next/font/google";
import { BookClubContextProvider } from "./context/bookClubData";
import { BookClubUserContextProvider } from "./context/bookClubUserData";

const inter = Inter({ subsets: ["latin"] });

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open_sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Read With me",
  description: "Designed for Reading",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancing.variable}`}>
        <BookClubContextProvider><BookClubUserContextProvider>{children}</BookClubUserContextProvider></BookClubContextProvider>
      </body>
    </html>
  );
}
