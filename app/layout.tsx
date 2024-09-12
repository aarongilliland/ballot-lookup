import '@/app/ui/global.css';
import { belleza } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${belleza.className} antialiased`}>{children}</body>
    </html>
  );
}