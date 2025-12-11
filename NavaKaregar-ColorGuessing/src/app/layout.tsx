import "@/assets/styles/global.css";
import { Suspense } from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading ...</div>}>{children}</Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
