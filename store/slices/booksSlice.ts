import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Book = {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: "audio" | "text" | "audio & text";
  status: "selected" | "recommended" | "suggested";
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
};

type BooksState = {
  selected: Book | null;
  recommended: Book[];
  suggested: Book[];
};

const initialState: BooksState = {
  selected: null,
  recommended: [],
  suggested: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<Book | null>) {
      state.selected = action.payload;
    },
    setRecommended(state, action: PayloadAction<Book[]>) {
      state.recommended = action.payload;
    },
    setSuggested(state, action: PayloadAction<Book[]>) {
      state.suggested = action.payload;
    },
  },
});

export const { setSelected, setRecommended, setSuggested } = booksSlice.actions;
export default booksSlice.reducer;
