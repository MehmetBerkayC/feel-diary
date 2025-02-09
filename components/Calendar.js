"use client";
import React, { useState } from "react";
import { gradients, baseRating, demoData } from "@/utils";

// Placeholder data
const months = {
	January: "Jan",
	February: "Feb",
	March: "Mar",
	April: "Apr",
	May: "May",
	June: "Jun",
	July: "Jul",
	August: "Aug",
	September: "Sep",
	Octember: "Oct",
	November: "Nov",
	December: "Dec",
};

const dayList = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const now = new Date();

export default function Calendar(props) {
	const { demo, data, handleSetMood } = props;

	const now = new Date();
	const currentMonth = now.getMonth();

	const [selectedMonth, setSelectedMonth] = useState(
		Object.keys(months)[currentMonth]
	);

	const [selectedYear, setSelectedYear] = useState(now.getFullYear());

	// console.log("Selected month: " + selectedMonth + "\n" + "Selected year: " + selectedYear);

	function handleIncrementMonth(value) {
		// value = +1 / -1
		// if we hit the bounds of the months, adjust the year displayed
	}
	// Generate gradient background

	//  Year-Month-Day format
	const monthNow = new Date(
		selectedYear,
		Object.keys(months).indexOf(selectedMonth),
		1
	);
	const firstDayOfMonth = monthNow.getDay();
	const daysInMonth = new Date(
		selectedYear,
		Object.keys(months).indexOf(selectedMonth) + 1, // get the next month
		0 // last day of the last month
	).getDate(); // Just gets the last day of the current month to find day count of the current month

	// console.log(monthNow, firstDayOfMonth, daysInMonth);

	const daysToDisplay = firstDayOfMonth + daysInMonth;
	const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0); //Add rows for each week

	// console.log("Num rows:" + numRows);

	// Generate calendar days
	return (
		<div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
			{[...Array(numRows).keys()].map((row, rowIndex) => {
				return (
					<div key={rowIndex} className="grid grid-cols-7 gap-1">
						{dayList.map((dayOfWeek, dayOfWeekIndex) => {
							let dayIndex =
								rowIndex * 7 +
								dayOfWeekIndex -
								(firstDayOfMonth - 1);

							let dayDisplay =
								dayIndex > daysInMonth
									? false
									: row === 0 &&
									  dayOfWeekIndex < firstDayOfMonth
									? false
									: true;

							let isToday = dayIndex === now.getDate();

							if (!dayDisplay) {
								return (
									<div
										className="bg-white"
										key={dayOfWeekIndex}
									></div>
								);
							}

							// Data is mood numbers in days, demo is fake data
							let color = demo
								? gradients.indigo[baseRating[dayIndex]]
								: dayIndex in data
								? gradients.indigo[data[dayIndex]]
								: "white";

							return (
								<div
									style={{ background: color }} // dynamic style support
									key={dayOfWeekIndex}
									className={
										"text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg" +
										(isToday
											? " border-indigo-400 "
											: " border-indigo-100 ") +
										(color === "white"
											? " text-indigo-400 "
											: " text-white ")
									}
								>
									<p>{dayIndex}</p>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
