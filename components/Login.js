"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegister, setIsRegister] = useState(false);
	const [authenticating, setAuthenticating] = useState(false);

	const authContext = useAuth();
	// console.log(authContext); // Check if this logs an object
	const { signup, login } = authContext;
	async function handleSubmit() {
		console.log("Submit triggered");
		// Check for valid inputs
		if (!email || !password || password.length < 6) {
			return;
		}

		setAuthenticating(true);

		// const { signup, login } = useAuth();

		// TODO: Check email formatting
		try {
			if (isRegister) {
				console.log("Signing up a new user.", email, password);
				await signup(email, password);
			} else {
				console.log("Logging in existing user.", email, password);
				await login(email, password);
			}
		} catch (error) {
			// TODO: Add an error state and inform user
			console.log(error.message);
		} finally {
			setAuthenticating(false);
		}
	}

	return (
		<>
			<div className="flex flex-col flex-1 justify-center items-center gap-4 ">
				<h3
					className={
						"text-4xl sm:text-5xl md:text-6xl " + fugaz.className
					}
				>
					{isRegister ? "Register" : "Log In"}
				</h3>
				<p>You're one step away!</p>
				<input
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
						// console.log(email); // debug
					}}
					className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none "
					placeholder="Email"
					required
				></input>
				<input
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
						// console.log(password); // debug
					}}
					className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none "
					placeholder="Password"
					type="password"
					required
				></input>
				{/* use &#39 if ' is causing problems */}
				<div className="max-w-[400px] w-full mx-auto">
					<Button
						clickHandler={handleSubmit}
						text={authenticating ? "Submitting" : "Submit"}
						full
					/>
				</div>
				<p className="text-center">
					{isRegister
						? "Already have an account? "
						: "Don't have an account? "}
					<button
						onClick={() => {
							setIsRegister(!isRegister);
						}}
						className="text-indigo-600"
					>
						{isRegister ? "Sign In" : "Sign Up"}
					</button>
				</p>
			</div>
		</>
	);
}
