"use client";
import { auth, db } from "@/firebase";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext(); // Initialize context

// Custom hook to access auth context globally
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [userDataObj, setUserDataObj] = useState(null);
	const [loading, setLoading] = useState(true); // for first time render

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		// reset user states
		setUserDataObj(null);
		setCurrentUser(null);

		return signOut(auth);
	}

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, async (user) => {
			try {
				// Set user to our local context state
				setLoading(true);
				setCurrentUser(user);
				if (!user) {
					console.log("No user found.");
					return;
				}

				// if user exists, fetch data from firestore database
				console.log("Fetching user data!");
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);
				let firebaseData = {};

				if (docSnap.exists()) {
					console.log("Found user data!");
					firebaseData = docSnap.data();
					console.log(firebaseData);
				}

				setUserDataObj(firebaseData || {}); // Ensure it's always an object
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		});
		return unSubscribe; // unsubscribe when component unmounts
	}, []);

	// special syntax, value and the key is the same thats why i don't write currentUser: currentUser etc.
	const value = {
		currentUser,
		signup,
		login,
		logout,
		userDataObj,
		setUserDataObj,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
