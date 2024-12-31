import { FormEvent, useTransition } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export const useDocTitle = (docId: string) => {
  const [data] = useDocumentData(doc(db, "documents", docId));
  const [isUpdating, startTransition] = useTransition();

  const updateDocTitle = (e: FormEvent, input: string) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", docId), { title: input });
      });
    }
  };

  return { docTitle: data ? data.title : "", updateDocTitle, isUpdating };
};
