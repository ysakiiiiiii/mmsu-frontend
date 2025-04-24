import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrapper";
import { RenderMenu } from "./components/structure/Navbar/RenderNavigation";
import { RenderRoutes } from "./components/structure/Navbar/RenderRoutes";

function App() {
  return (
    <div
      className="h-screen overflow-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div style={{ height: "200vh" }}>
        <BrowserRouter>
          <AuthWrapper>
            <RenderMenu />
            <RenderRoutes />
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
