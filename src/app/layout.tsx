import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "올인원 에이전트 관식이",
  description: "관세 관련 지식을 알려주는 국세청 챗봇입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="bg-gray-200">
        <div className="relative mx-auto flex h-screen max-w-[430px] min-w-[330px] flex-col justify-between bg-gray-100 shadow">
          <main>{children}</main>
          <Toaster position="bottom-center" className="!mb-16" />
        </div>
      </body>
    </html>
  );
}
