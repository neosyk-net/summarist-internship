"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAuthModal } from "@/store/slices/authSlice";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { guestSignIn, signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function AuthModal() {
  const open = useAppSelector((s) => s.auth.authModalOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailAuth() {
    if (loading) return;

    setError(null);

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "register") {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }

      dispatch(closeAuthModal());
      dispatch(closeAuthModal());

      if (pathname === "/") {
        router.push("/for-you");
      } else {
        router.refresh();
      }
      // stay on the same page, but refresh UI if needed
    } catch (e: any) {
      setError(e?.message ?? "Auth failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGuest() {
    if (loading) return;

    setError(null);

    try {
      setLoading(true);
      await guestSignIn();

      dispatch(closeAuthModal());
      if (pathname === "/") {
        router.push("/for-you");
      } else {
        router.refresh();
      } // stay on same page
    } catch (e: any) {
      setError(e?.message ?? "Guest login failed.");
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setError(null);
    setPassword("");
    setMode((m) => (m === "login" ? "register" : "login"));
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={() => dispatch(closeAuthModal())}
    >
      <div
        className="relative w-full max-w-md rounded bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute right-4 top-3 text-2xl leading-none text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-6">
          <h2 className="mb-4 text-center text-lg font-bold text-[#032b41]">
            {mode === "login"
              ? "Log in to Summarist"
              : "Create your Summarist account"}
          </h2>

          {/* Guest */}
          <button
            className="relative w-full rounded bg-[#2f4f8f] py-3 font-medium text-white hover:opacity-95 disabled:opacity-60"
            onClick={handleGuest}
            disabled={loading}
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <FaUser size={18} />
            </span>
            Login as a Guest
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3 text-gray-400">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            className="relative w-full rounded bg-[#3b82f6] py-3 font-medium text-white hover:opacity-95 disabled:opacity-60"
            onClick={() => alert("Google login later (Firebase step)")}
            disabled={loading}
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded bg-white p-1">
              <Image
                src="/assets/google.png"
                alt="Google"
                width={18}
                height={18}
              />
            </span>
            Login with Google
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3 text-gray-400">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-500"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-500"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 text-center text-sm text-red-600">{error}</p>
          )}

          {/* Main action */}
          <button
            className="mt-4 w-full rounded bg-[#2bd97c] py-3 font-medium text-[#032b41] hover:bg-[#20ba68] disabled:opacity-60"
            onClick={handleEmailAuth}
            disabled={loading}
          >
            {loading
              ? mode === "register"
                ? "Creating account..."
                : "Logging in..."
              : mode === "register"
                ? "Create account"
                : "Login"}
          </button>

          <div className="mt-3 text-center text-sm">
            <button
              className="text-blue-500 hover:underline disabled:opacity-60"
              onClick={() => alert("Forgot password later (optional)")}
              disabled={loading}
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <div className="border-t bg-gray-50 p-4 text-center text-sm">
          <button
            className="text-blue-500 hover:underline disabled:opacity-60"
            onClick={toggleMode}
            disabled={loading}
          >
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}
