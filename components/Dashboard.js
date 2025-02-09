"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
	const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
	const [data, setData] = useState({});

	function countValues() {
		let count = 0;
		Object.values(data).forEach((entry) => {
			count += entry.feelings.length;
		});
		return count;
	}

	async function handleSetMood(mood) {
		const now = new Date();
		const day = now.getDay();
		const month = now.getMonth();
		const year = now.getFullYear();

		try {
			const newData = { ...userDataObj };
			// If the data doesn't exist make it
			if (!newData?.[year]) {
				newData[year] = {};
			}

			if (!newData?.[year]?.[month]) {
				newData[year][month] = {};
			}

			newData[year][month][day] = mood;

			// update the current state,
			setData(newData);
			// update the global state,
			setUserDataObj(newData);
			// update the firebase,
			const docRef = doc(db, "users", currentUser.uid);
			const res = await setDoc(
				docRef,
				{
					[year]: {
						[month]: {
							[day]: mood,
						},
					},
				},
				{ merge: true } // add on to the previous data don't overwrite
			);
		} catch (error) {
			console.log("Failed to set data:", error.message);
		}
	}
	// 1.13 m
	const statuses = {
		num_days: 14,
		time_remaining: "13:14:25",
		date: new Date().toDateString(),
	};

	const moods = {
		"&*@$%?": "😭",
		Sad: "😞",
		Neutral: "😐",
		Good: "🙂",
		Excellent: "😊",
	};

	useEffect(() => {
		if (!currentUser && !userDataObj) {
			console.log("No user or data found."); // not logged in
			return;
		}

		setData(userDataObj);
	}, [currentUser, userDataObj]); // check whenever these have new values and run the useEffect

	// Dahsboard is only for authenticated users
	if (!currentUser) {
		return <Login />;
	}

	// Show loading screen
	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
				<div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
					{Object.keys(statuses).map((status, statusIndex) => {
						return (
							<div
								key={statusIndex}
								className=" flex flex-col gap-1 sm:gap-2"
							>
								<p className="font-medium uppercase text-xs md:text-sm truncate">
									{status.replace("_", " ")}
								</p>
								<p
									className={
										"text-base sm:text-lg truncate " +
										fugaz.className
									}
								>
									{statuses[status]}
								</p>
							</div>
						);
					})}
				</div>
				<h4
					className={
						"text-5xl sm:text-6xl md:text-7xl text-center " +
						fugaz.className
					}
				>
					How do you <span className="textGradient">feel</span> today?
				</h4>
				<div className="flex items-stretch flex-wrap gap-4">
					{Object.keys(moods).map((mood, moodIndex) => {
						return (
							<button
								onClick={() => {
									const currentMoodValue = moodIndex + 1;
									handleSetMood(currentMoodValue);
								}}
								className={
									"p-3 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 flex flex-col gap-2 text-center items-center flex-1"
								}
								key={moodIndex}
							>
								<p className="p-2 text-4xl sm:text-5xl md:text-6xl">
									{moods[mood]}
								</p>
								<p
									className={
										"text-indigo-500 text-xs sm:text-sm md:text-base " +
										fugaz.className
									}
								>
									{mood}
								</p>
							</button>
						);
					})}
				</div>
				<Calendar data={data} handleSetMood={handleSetMood} />
			</div>
		</>
	);
}
