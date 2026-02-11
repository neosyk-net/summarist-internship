"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/authSlice";
import { logOut } from "@/lib/auth";
import Image from "next/image";

import {
  FiHome,
  FiBookmark,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiUserPlus,
  FiArrowLeftCircle,
} from "react-icons/fi";

const topNav = [
  { href: "/for-you", label: "For you", icon: FiHome },
  { href: "/library", label: "My Library", icon: FiBookmark, disabled: true },
  { href: "#", label: "Highlights", icon: FiEdit3, disabled: true },
  { href: "#", label: "Search", icon: FiSearch, disabled: true },
];

const bottomNav = [
  { href: "/settings", label: "Settings", icon: FiSettings },
  { href: "#", label: "Help & Support", icon: FiHelpCircle, disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <aside className="flex h-full w-full flex-col bg-white px-2 pb-5">
      {/* LOGO HEADER (matches Topbar height + border) */}
      <div className="flex h-16 items-center">
        <Link href="/" className="flex items-center px-3">
          <Image
            src="/assets/logo.png"
            alt="Summarist"
            width={160}
            height={64}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* TOP NAV */}
      <nav className="mt-6 space-y-3">
        {topNav.map((item) => {
          const Icon = item.icon;
          const active =
            !item.disabled && item.href !== "#" && pathname === item.href;

          const base =
            "flex items-center gap-4 rounded px-3 py-2 text-base font-medium transition";
          const activeStyles =
            "bg-[#f1f6f4] text-[#032b41] border-l-4 border-[#2bd97c]";
          const inactiveStyles = "text-[#032b41]/80 hover:bg-[#f1f6f4]";
          const disabledStyles = "cursor-not-allowed opacity-60";

          if (item.disabled) {
            return (
              <div
                key={item.label}
                className={`${base} ${inactiveStyles} ${disabledStyles}`}
              >
                <Icon size={18} />
                {item.label}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`${base} ${active ? activeStyles : inactiveStyles}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM NAV + LOGOUT */}
      <div className="mt-auto space-y-4 pt-6">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const disabled = item.disabled ? "cursor-not-allowed opacity-60" : "";

          if (item.disabled) {
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded px-3 py-2 text-base font-medium text-[#032b41]/80 ${disabled}`}
              >
                <Icon size={18} />
                {item.label}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded px-3 py-2 text-base font-medium text-[#032b41]/80 hover:bg-[#f1f6f4]"
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={async () => {
            // If no user OR guest user -> open auth modal
            if (!user || user.isAnonymous) {
              dispatch(openAuthModal());
              return;
            }

            // Real user -> logout
            await logOut();
          }}
          className="flex w-full items-center gap-3 rounded px-3 py-2 text-base font-medium text-[#032b41]/80 hover:bg-[#f1f6f4]"
        >
          {!user || user.isAnonymous ? (
            <FiUserPlus size={18} />
          ) : (
            <FiArrowLeftCircle size={18} />
          )}
          {!user || user.isAnonymous ? "Log in" : "Log out"}
        </button>
      </div>
    </aside>
  );
}
