"use server";

import { adminDb } from "@/firebase-admin";
import { liveblocks } from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export const createNewDocument = async () => {
  await auth.protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({ title: "New Doc" });

  const userCollectionRef = adminDb.collection("users");
  userCollectionRef
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      createAt: new Date(),
      role: "owner",
      roomId: docRef.id,
      userId: sessionClaims?.email,
    });

  return { docId: docRef.id };
};

export const deleteDocument = async (roomId: string) => {
  await auth.protect();

  console.log("deleteDocument", roomId);

  const deleteRoomInDocumentsCollection = async () => {
    adminDb.collection("documents").doc(roomId).delete();
  };
  const deleteRoomInUsersCollection = async () => {
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    query.docs.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
  };

  try {
    await deleteRoomInDocumentsCollection();

    await deleteRoomInUsersCollection();

    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);

    return { success: false };
  }
};

export const inviteUserToDocument = async (roomId: string, email: string) => {
  await auth.protect();

  console.log("inviteUserToDocument", roomId, email);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const removeUserFromDocument = async (roomId: string, email: string) => {
  await auth.protect();

  console.log("removeUserFromDocument", roomId, email);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
