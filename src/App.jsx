import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrapper";
import { RenderMenu } from "./components/structure/Navbar/RenderMenu";
import { RenderRoutes } from "./components/structure/Navbar/RenderRoutes";
import { StoreProvider } from "./context/StoreContext"; // Import the StoreProvider

function App() {
  return (
    <div
      className="h-screen overflow-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div>
        <BrowserRouter>
          <AuthWrapper>
            <StoreProvider>
              <RenderMenu />
              <RenderRoutes />
            </StoreProvider>
          </AuthWrapper>
        </BrowserRouter>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;
