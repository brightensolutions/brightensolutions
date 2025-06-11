import { Footer } from "@/components/_user/footer";
import { Navbar } from "@/components/_user/navbar";
import type React from "react";
import BottomChat from "@/components/chat/bottom-chat"
import WhatsAppButton from "@/components/_user/whatsapp-button";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        {/* <BottomChat/> */}
        <WhatsAppButton/>
        </body>
        <Footer/>
    </html>
  );
}
