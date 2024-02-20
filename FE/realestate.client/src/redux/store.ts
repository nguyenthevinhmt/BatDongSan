import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "@/app/(auth)/auth/_services/auth.service";
import registerSlice from "./slices/registerSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerReducer from "./slices/registerSlice";
// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whiteList: ["auth"]
// };
// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   register: registerReducer,
//   [authApi.reducerPath]: authApi.reducer,
// });
// const persistedReducers = persistReducer(authPersistConfig, rootReducer)
// export const makeStore = () => configureStore({
//   reducer:  persistedReducers,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware),
// });
// export const store = configureStore({
//   reducer:  persistedReducers,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware),
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppStore = ReturnType<typeof makeStore>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = AppStore['dispatch']
// // setupListeners(store.dispatch);
// export const storeWrapper = createWrapper<AppStore>(makeStore)
// // export const storesWrapper = createWrapper(store)
export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const storesWrapper = createWrapper(store)
