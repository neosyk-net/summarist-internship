"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser, setAuthChecked } from "@/store/slices/authSlice";

function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(
        setUser(
          user
            ? { uid: user.uid, email: user.email, isAnonymous: user.isAnonymous }
            : null
        )
      );

      // prevents logged-out flash on refresh
      dispatch(setAuthChecked(true));
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
