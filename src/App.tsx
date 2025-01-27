import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./Redux/store";
import { router } from "./Routes/Routes";

function App() {
  return (
    // <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </Provider>
    // </PersistGate>
  );
}

export default App;
