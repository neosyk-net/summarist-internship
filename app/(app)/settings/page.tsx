"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/authSlice";
import { auth } from "@/lib/firebase";
import AuthModal from "@/components/auth/AuthModal";

import SettingsGuestImg from "@/public/assets/login.png";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authChecked = useAppSelector((s) => s.auth.authChecked);
  const user = useAppSelector((s) => s.auth.user);
  const plan = useAppSelector((s) => s.auth.plan);

  // ✅ Prevent logged-out flash on refresh
  if (!authChecked) {
    return (
      <main className="w-full text-[#032b41]">
        <div className="mx-auto max-w-[900px] px-6 py-10">
          {/* Header stays */}
          <h1 className="text-[36px] font-bold">Settings</h1>
          <hr className="mt-4 border-t border-black/10" />

          {/* Spinner centered in content area */}
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#032b41]/20 border-t-[#2bd97c]" />
          </div>
        </div>
      </main>
    );
  }

  // Logged out view
  if (!user) {
    return (
      <main className="w-full text-[#032b41]">
        <div className="mx-auto max-w-[900px] px-6 py-10">
          <h1 className="text-[36px] font-bold">Settings</h1>
          <hr className="mt-4 border-t border-black/10" />

          <div className="mt-14 flex flex-col items-center text-center">
            <Image
              src={SettingsGuestImg}
              alt="Settings"
              priority
              className="h-auto w-full max-w-[420px]"
            />

            <p className="mt-8 text-[18px] font-semibold">
              Log in to your account to see your details.
            </p>

            <button
              type="button"
              onClick={() => dispatch(openAuthModal())}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#2bd97c] px-10 py-3 text-sm font-semibold text-[#032b41] hover:opacity-90"
            >
              Login
            </button>
          </div>
        </div>

        <AuthModal />
      </main>
    );
  }

  // Logged in view
  const emailLabel = user.isAnonymous ? "Signed in as guest" : user.email;

  return (
    <main className="w-full text-[#032b41]">
      <div className="mx-auto max-w-[900px] px-6 py-10">
        <h1 className="text-[36px] font-bold">Settings</h1>
        <hr className="mt-4 border-t border-black/10" />

        {/* Subscription */}
        <div className="py-8">
          <p className="text-sm font-bold">Your Subscription plan</p>
          <p className="mt-2 text-sm capitalize">{plan}</p>

          {plan === "basic" && (
            <button
              onClick={() => router.push("/choose-plan")}
              className="mt-4 rounded-md bg-[#2bd97c] px-6 py-2 text-sm font-semibold text-[#032b41] hover:opacity-90"
            >
              Upgrade to Premium
            </button>
          )}
        </div>

        <hr className="border-t border-black/10" />

        {/* Email */}
        <div className="py-8">
          <p className="text-sm font-bold">Email</p>
          <p className="mt-2 text-sm">{emailLabel}</p>
        </div>

        <hr className="border-t border-black/10" />
      </div>

      <AuthModal />
    </main>
  );
}
