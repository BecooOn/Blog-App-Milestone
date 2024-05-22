import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";

import {
  persistStore,
  persistReducer,
  //* redux-persist'ten kaynaklı hataları gidermek için alltaki veriler import edildi
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage"; //? defaults to localStorage
import storage from "redux-persist/lib/storage/session" //? session storage

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer); //? persist edilecek reducer persistConFig den sonra yazılır. Normalde persistReducer şu şekşilde de yazılır; persistReducer(persistConfig, rootReducer), rootReducer burada bizim store alanımızdaki tüm reducerlerin toplamıdır. Eğer store da reducer da auth ve stock tek bir reducer olsaydı rootReducer olarak kullanıma devam ederdik; ancak biz sadece login verilerimizin kalıcı bellekte olmasını istediğimiz için rootReducer'ı sildik ve yerine authReducer'ı yazdık.

const store = configureStore({
  reducer: {
    auth: persistedReducer, //* Burada authReducer yerine persistedReducer yazdık; çünkü yukarıda kalıcı bellekte tutmak için oluşturmuş olduğumuz fonksiyonu burada auth a atamalıyız
    blog: blogReducer, //*tüm veriler için tek reducer
  },
//* redux-persist'ten kaynaklı hataları gidermek için middleware eklendi edildi
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", //! production da redux kapalı olması için
});

export const persistor = persistStore(store);
export default store;
