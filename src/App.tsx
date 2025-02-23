import { Toaster } from "sonner";
import Router from "./routes/routes";
import Theme from "./theme/theme-provider";

function App() {
  return (
    <>
      <Theme>
        <Router />
        <Toaster richColors position="top-right" />
      </Theme>
    </>
  );
}

export default App;
