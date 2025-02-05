import { Fugaz_One, Open_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const openSans = Open_Sans({
	subsets: ["latin"],
});

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
	title: "FeelDiary",
	description: "Keep up with your emotions, throughout the whole year!",
};

export default function RootLayout({ children }) {
	const header = (
		<header className="p-4 sm:p-8 flex items-center justify-between gap-4">
			<h1
				className={
					"text-base sm:text-lg textGradient " + fugaz.className
				}
			>
				FeelDiary
			</h1>
			<div className="flex items-center justify-between">
				PLACEHOLDER - Call to Action Button || Stats
			</div>
		</header>
	);

	const footer = (
		<footer className="p-4 sm:p-8 grid place-items-center">
			<p className={"text-indigo-500 " + fugaz.className}>
				Created with ❤️
			</p>
		</footer>
	);
	return (
		<html lang="en">
			<body
				className={
					"w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800" +
					`${geistSans.variable} ${geistMono.variable} antialiased ` +
					openSans.className
				}
			>
				{header}
				{children}
				{footer}
			</body>
		</html>
	);
}
