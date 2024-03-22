"use client";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
// import { AppStore, makeStore, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore>();
//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore();
//   }
//   let persistor = persistStore(storeRef.current)

//   return <Provider store={storeRef.current}>
//     <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
//   </Provider>;
// }
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
