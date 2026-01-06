import { auth } from "../firebase/firebase";

export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};
