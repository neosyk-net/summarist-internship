"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuthModal, closeAuthModal } from "@/store/slices/authSlice";
import { useEffect } from "react";
import SelectedList from "@/components/for-you/SelectedList";
import RecommendedList from "@/components/for-you/RecommendedList";
import SuggestedList from "@/components/for-you/SuggestedList";

export default function ForYouPage() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.auth.authModalOpen);

  useEffect(() => {


  }, []);

  return (
    <div className="space-y-8">
      <SelectedList />
      <RecommendedList />
      <SuggestedList />
    </div>
  ) 
}
