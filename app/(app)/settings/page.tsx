"use client";

import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/authSlice";
import AuthModal from "@/components/auth/AuthModal";

import SettingsGuestImg from "@/public/assets/login.png"; // <-- your asset

export default function SettingsLoggedOutPage() {
  const dispatch = useAppDispatch();

  return (
    <main className="min-h-screen bg-white text-[#032b41]">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center">
        <Image
          src={SettingsGuestImg}
          alt="Settings"
          priority
          className="h-auto w-full max-w-[420px]"
        />

        <button
          type="button"
          onClick={() => dispatch(openAuthModal())}
          className="mt-10 inline-flex items-center justify-center rounded-md bg-[#2bd97c] px-10 py-3 text-sm font-semibold text-[#032b41] hover:opacity-90"
        >
          Login
        </button>
      </section>

      {/* Auth modal (Redux-controlled) */}
      <AuthModal />
    </main>
  );
}
