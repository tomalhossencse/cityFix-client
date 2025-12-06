import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // google sign in
  const signInwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   password SignUp

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //password signIN
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout

  const userLogOut = () => {
    return signOut(auth);
  };
  const authInfo = {
    signInwithGoogle,
    signUp,
    userLogOut,
    signIn,
    user,
    loading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
