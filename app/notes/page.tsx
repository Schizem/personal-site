import { Suspense } from "react";
import { getAllNotes } from "@/lib/mdx";
import NotesClient from "./NotesClient";

export const metadata = { title: "Notes" };

export default function NotesPage() {
  const allNotes = getAllNotes();
  return (
    <Suspense>
      <NotesClient allNotes={allNotes} />
    </Suspense>
  );
}
