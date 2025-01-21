import { Toaster } from "sonner";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <HomePage />
    </>
  );
}
