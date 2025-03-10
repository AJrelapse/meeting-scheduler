import { Toaster } from "../components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "CSI Meet Scheduler",
  description: "Schedule your next meeting with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-apple">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
