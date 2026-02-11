"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroImg from "@/public/assets/pricing-top.png";
import { FileText, Sprout, Handshake } from "lucide-react";
import FaqAccordian from "@/components/marketing/FaqAccordian";
import Footer from "@/components/marketing/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSubscription, openAuthModal } from "@/store/slices/authSlice";

const faqs = [
  {
    q: "How does the free 7-day trial work?",
    a: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    q: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    a: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    q: "What's included in the Premium plan?",
    a: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    q: "Can I cancel during my trial or subscription?",
    a: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
];

export default function ChoosePlanPage() {
  const [selected, setSelected] = useState<"yearly" | "monthly">("yearly");
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const selectedCard = "border-[#2bd97c] bg-[#f4faf7]";
  const unselectedCard = "border-black/20 bg-[#f4faf7] hover:bg-black/[0.02]";

  useEffect(() => {
    if (user && !user.isAnonymous) {
      setAuthMessage(null);
    }
  }, [user]);

  useEffect(() => {
    const success = searchParams.get("success");
    const plan = searchParams.get("plan");

    if (success === "1" && plan) {
      dispatch(
        setSubscription({
          isSubscribed: true,
          plan: plan === "yearly" ? "premium-plus" : "premium",
        }),
      );

      router.replace("/for-you");
    }
  }, [searchParams, dispatch, router]);

  useEffect(() => {
    if (!authMessage) return;

    const timer = setTimeout(() => {
      setAuthMessage(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [authMessage]);

  async function handleCheckout() {
    if (!user || user.isAnonymous) {
      if (!authMessage) {
        setAuthMessage("You must create an account to subscribe.");
      }
      dispatch(openAuthModal());
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "Checkout failed");
      if (!data?.url) throw new Error("No checkout URL returned");

      window.location.href = data.url;
    } catch (e: any) {
      alert(e?.message ?? "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white text-[#032b41]">
      {/* HERO */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#032b41] text-white">
        {/* White base under the curve */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[100px] w-full bg-white " />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
            Get unlimited access to many amazing
            <br className="hidden md:block" />
            books to read
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-white/80">
            Turn ordinary moments into amazing learning opportunities
          </p>

          {/* Curved image container (simple + stable) */}
          <div className="mx-auto mt-10 w-full max-w-[430px] overflow-hidden rounded-t-[220px] bg-white pt-10">
            <Image
              src={HeroImg}
              alt="Choose plan hero"
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <FileText className="mb-4 h-8 w-8 text-[#032b41]" />
              <p className="font-semibold text-[#032b41]">
                Key ideas in few min
              </p>
              <p className="mt-1 text-sm text-[#032b41]/70">
                with many books to read
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Sprout className="mb-4 h-8 w-8 text-[#032b41]" />
              <p className="font-semibold text-[#032b41]">
                3 million people growing
              </p>
              <p className="mt-1 text-sm text-[#032b41]/70">
                with Summarist everyday
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Handshake className="mb-4 h-8 w-8 text-[#032b41]" />
              <p className="font-semibold text-[#032b41]">
                Precise recommendations
              </p>
              <p className="mt-1 text-sm text-[#032b41]/70">
                collections curated by experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS + CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pb-16 text-center">
          <h2 className="mb-8 text-3xl font-extrabold text-[#032b41]">
            Choose the plan that fits you
          </h2>

          <div className="space-y-6">
            {/* Yearly */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelected("yearly");
                setAuthMessage(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && setSelected("yearly")}
              className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-6 text-left transition ${
                selected === "yearly" ? selectedCard : unselectedCard
              }`}
            >
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black">
                {selected === "yearly" && (
                  <div className="h-2 w-2 rounded-full bg-black" />
                )}
              </div>

              <div>
                <p className="font-semibold">Premium Plus Yearly</p>
                <p className="text-xl font-bold">$99.99/year</p>
                <p className="text-sm text-black/60">
                  7-day free trial included
                </p>
              </div>
            </div>

            {/* divider */}
            <div className="flex items-center gap-3 text-sm text-black/40">
              <div className="h-px flex-1 bg-black/20" />
              or
              <div className="h-px flex-1 bg-black/20" />
            </div>

            {/* Monthly */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelected("monthly");
                setAuthMessage(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && setSelected("monthly")}
              className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-6 text-left transition ${
                selected === "monthly" ? selectedCard : unselectedCard
              }`}
            >
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black">
                {selected === "monthly" && (
                  <div className="h-2 w-2 rounded-full bg-black" />
                )}
              </div>

              <div>
                <p className="font-semibold">Premium Monthly</p>
                <p className="text-xl font-bold">$9.99/month</p>
                <p className="text-sm text-black/60">No trial included</p>
              </div>
            </div>
          </div>
          {authMessage && (
            <p className="mt-6 text-sm font-medium text-red-600 transition-opacity duration-300">
              {authMessage}
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 rounded-md bg-[#2bd97c] px-10 py-3 text-sm font-semibold text-[#032b41] hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? "Redirecting..."
              : selected === "yearly"
                ? "Start your free 7-day trial"
                : "Continue"}
          </button>

          <p className="mx-auto mt-3 max-w-xl text-xs text-[#032b41]/70">
            Cancel your trial at any time before it ends, and you won&apos;t be
            charged.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-20">
          <FaqAccordian items={faqs} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
