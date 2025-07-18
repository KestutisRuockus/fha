import { useContext } from "react";
import ImagesContainer from "./components/Images/ImagesContainer";
import AppLayout from "./components/layout/AppLayout";
import "./index.css";
import { ViewContext } from "./context/ViewContext";
import FavouriteContainer from "./components/favourite/FavouriteContainer";

function App() {
  const viewContext = useContext(ViewContext);
  if (!viewContext) {
    throw new Error("must be used within a ViewProvider");
  }

  const { view } = viewContext;
  return (
    <AppLayout>
      {view === "images" && <ImagesContainer />}
      {view === "favourites" && <FavouriteContainer />}
    </AppLayout>
  );
}

export default App;
