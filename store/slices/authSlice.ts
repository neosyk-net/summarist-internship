import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { uid: string; email: string | null } | null;

type AuthState = {
  user: User;
  authModalOpen: boolean;
  isSubscribed: boolean;
  plan: "basic" | "premium" | "premium-plus";
};

const initialState: AuthState = {
  user: null,
  authModalOpen: false,
  isSubscribed: false,
  plan: "basic",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal(state) {
      state.authModalOpen = true;
    },
    closeAuthModal(state) {
      state.authModalOpen = false;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setSubscription(
      state,
      action: PayloadAction<{ isSubscribed: boolean; plan: AuthState["plan"] }>
    ) {
      state.isSubscribed = action.payload.isSubscribed;
      state.plan = action.payload.plan;
    },
    logout(state) {
      state.user = null;
      state.isSubscribed = false;
      state.plan = "basic";
    },
  },
});

export const { openAuthModal, closeAuthModal, setUser, setSubscription, logout } =
  authSlice.actions;

export default authSlice.reducer;
