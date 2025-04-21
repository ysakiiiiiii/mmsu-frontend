import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrapper";

function App() {
  return (
    <div
      className="h-screen overflow-auto"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      <div style={{ height: "200vh" }}>
        <BrowserRouter>
          <AuthWrapper />
        </BrowserRouter>
      </div>

      {/* Hide scrollbar in WebKit */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;
