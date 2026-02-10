"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser } from "@/store/slices/authSlice";

function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            isAnonymous: user.isAnonymous,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsub();
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener>{children}</AuthListener>
    </Provider>
  );
}
