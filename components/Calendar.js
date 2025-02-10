"use client";
import React, { useState } from "react";
import { gradients, baseRating, demoData } from "@/utils";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

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

const monthsArray = Object.keys(months);

const dayList = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export default function Calendar(props) {
	// 3.28
	const { demo, completeData, handleSetMood } = props;

	const now = new Date();
	const currentMonth = now.getMonth();

	const [selectedMonth, setSelectedMonth] = useState(
		monthsArray[currentMonth]
	);

	const [selectedYear, setSelectedYear] = useState(now.getFullYear());

	// console.log("Selected month: " + selectedMonth + "\n" + "Selected year: " + selectedYear);

	const numericMonth = Object.keys(months).indexOf(selectedMonth);
	const data = completeData?.[selectedYear]?.[numericMonth] || {};
	// console.log(
	// 	"This months data: ",
	// 	completeData?.[selectedYear]?.[numericMonth]
	// );

	function handleIncrementMonth(value) {
		// value = +1 / -1
		// if we hit the bounds of the months, adjust the year displayed
		const incrementedMonthNumber = value + numericMonth;

		if (incrementedMonthNumber < 0) {
			// set month value = 11 and decrement the year
			setSelectedYear((current) => current - 1);
			setSelectedMonth(monthsArray[monthsArray.length - 1]);
		} else if (incrementedMonthNumber > 11) {
			// set month value = 0 and increment the year
			setSelectedYear((current) => current + 1);
			setSelectedMonth(monthsArray[0]);
		} else {
			setSelectedMonth(monthsArray[incrementedMonthNumber]);
		}
	}
	// Generate gradient background

	//  Year-Month-Day format
	const monthNow = new Date(
		selectedYear,
		monthsArray.indexOf(selectedMonth),
		1
	);

	const firstDayOfMonth = monthNow.getDay();

	const daysInMonth = new Date(
		selectedYear,
		monthsArray.indexOf(selectedMonth) + 1, // get the next month
		0 // last day of the last month
	).getDate(); // Just gets the last day of the current month to find day count of the current month

	// console.log(monthNow, firstDayOfMonth, daysInMonth);

	const daysToDisplay = firstDayOfMonth + daysInMonth;
	const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0); //Add rows for each week

	// console.log("Num rows:" + numRows);

	// Data might not be available

	// Generate calendar days
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-3 gap-4">
				<button
					onClick={() => handleIncrementMonth(-1)}
					className="ml-auto duration-200 hover:opacity-60 text-indigo-400 bg-slate-200 p-1 w-[32px] border border-indigo-400 border-solid rounded-full"
				>
					<i className="fa-solid fa-chevron-left"></i>
				</button>
				<p
					className={
						"text-center capitalize whitespace-nowrap textGradient " +
						fugaz.className
					}
				>
					{selectedMonth}, {selectedYear}
				</p>
				<button
					onClick={() => handleIncrementMonth(1)}
					className="mr-auto duration-200 hover:opacity-60 text-indigo-400 bg-slate-200 p-1 w-[32px] border border-indigo-400 border-solid rounded-full"
				>
					<i className="fa-solid fa-chevron-right"></i>
				</button>
			</div>
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
		</div>
	);
}
