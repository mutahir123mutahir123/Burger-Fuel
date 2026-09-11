import { CartProvider } from "@/features/cart/context/CartContext";
import { DrinkOrderProvider } from "@/features/drinks/context/DrinkOrderContext";
import { CartTray } from "@/features/cart/components/CartTray";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <DrinkOrderProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartTray />
      </DrinkOrderProvider>
    </CartProvider>
  );
}