import { useEffect } from "react";
import { useAuth } from "./features/auth/model/useAuth";
import { AppRouter } from "./app/router/AppRouter";
import type { AuthState } from "./features/auth/model/auth.types";
import { Toaster } from "sonner";

export default function App() {

  const auth: AuthState = useAuth();

  useEffect(() => {

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;

    const isDevelopment = import.meta.env.DEV;

    if (!standalone && !isDevelopment) {
      return
    }

    let startY = 0;
    let currentY = 0;

    function handleTouchStart (event: TouchEvent) {

      if (window.scrollY > 0) {
        return;
      }

      startY = event.touches[0].clientY;
      currentY = startY;

    };

    function handleTouchMove (event: TouchEvent) {

      if (!startY) {
        return;
      }

      currentY = event.touches[0].clientY;

    };

    function handleTouchEnd () {

      if (!startY) {
        return
      }

      const distance = currentY - startY;

      if (distance > window.innerHeight / 3 && window.scrollY <= 0) {
        window.location.reload();
      }

      startY = 0;
      currentY = 0;

    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    document.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    document.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRouter auth={auth} />
    </>
  );
}