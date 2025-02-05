import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
	title: "FeelDiary - Dashboard",
};

export default function DashboardPage() {
	const isAuthenticated = true; // Dahsboard is only for authenticated users

	let children = <Login />;

	if (isAuthenticated) {
		children = <Dashboard />;
	}

	return <Main>{children}</Main>;
}
