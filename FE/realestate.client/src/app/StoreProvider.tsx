"use client";
import { store } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
// import { AppStore, makeStore, store } from "@/redux/store";
import { persistStore } from "redux-persist";
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
  //let persistor = persistStore(store);
  return <Provider store={store}>
    {children}
  </Provider>;
}
