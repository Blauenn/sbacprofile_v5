import { useEffect, Suspense, lazy } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Functions //
import { fetch_user_info } from "./functions/fetch/fetch_user.function";
import { student_access_only } from "./functions/permission_check.function";
// Contexts providers //
import { StudentsContextProvider } from "./contexts/Profiles/Students/Student.context";
import { StudentsFiltersContextProvider } from "./contexts/Profiles/Students/Student_filters.context";
import { TeachersContextProvider } from "./contexts/Profiles/Teachers/Teacher.context";
import { TeachersFiltersContextProvider } from "./contexts/Profiles/Teachers/Teacher_filters.context";
import { ClubsContextProvider } from "./contexts/Clubs/Clubs.context";
import { ClassroomContextProvider } from "./contexts/Classroom.context";
import { LeaveNoticesContextProvider } from "./contexts/forms/LeaveNotice.context";
import { ClubsFiltersContextProvider } from "./contexts/Clubs/Club_filters.context";
// Contexts //
import { useContext_Account } from "./contexts/Account.context";
// Components //
import Sidebar from "./components/Miscellaneous/Sidebar/Sidebar.component";
import Loading from "./components/Miscellaneous/Loading.component";
import PageNotFound from "./components/Miscellaneous/PageNotFound.component";

// Pages //
const Admin_Students = lazy(() => import("./pages/Admin/Admin_Students.page"));
const Admin_Teachers = lazy(() => import("./pages/Admin/Admin_Teachers.page"));
const Admin_Clubs = lazy(() => import("./pages/Admin/Admin_Clubs.page"));
const Admin_Classrooms = lazy(() => import("./pages/Admin/Admin_Classrooms.page"));
const Admin_LeaveNotices = lazy(() => import("./pages/Admin/Forms/Admin_LeaveNotices.page"));

const Head_Students = lazy(() => import("./pages/Head/Head_Students.page"));
const Head_Teachers = lazy(() => import("./pages/Head/Head_Teachers.page"));
const Head_Clubs = lazy(() => import("./pages/Head/Head_Clubs.page"));
const Head_LeaveNotices = lazy(() => import("./pages/Head/Forms/Head_LeaveNotices.page"));

const Dashboard = lazy(() => import("./pages/Dashboard.page"));
const Students = lazy(() => import("./pages/Students.page"));
const Teachers = lazy(() => import("./pages/Teachers.page"));
const Clubs = lazy(() => import("./pages/Clubs.page"));

const Student_Club = lazy(() => import("./pages/Club/Student_Club.page"));
const Teacher_Club = lazy(() => import("./pages/Club/Teacher_Club.page"));

const Student_LeaveNotices = lazy(() => import("./pages/Forms/Student_LeaveNotices.page"));
const Teacher_LeaveNotices = lazy(() => import("./pages/Forms/Teacher_LeaveNotices.page"));

const Settings = lazy(() => import("./pages/Settings.page"));

const Login = lazy(() => import("./pages/Login.page"));

const App = () => {
	const location = useLocation();

	const {
		accessToken,
		isLoggedIn,
		setAccessToken,
		userInfo,
		setUserInfo,
		setIsLoggedIn,
	} = useContext_Account();

	useEffect(() => {
		const storedAccessToken = localStorage.getItem("accessToken");

		if (storedAccessToken) {
			setAccessToken(storedAccessToken);
			setIsLoggedIn(true);
			if (accessToken || !userInfo.status) {
				fetch_user_info(accessToken, setUserInfo);
			} else {
				setIsLoggedIn(false);
			}
		} else {
			setIsLoggedIn(false);
		}
	}, [accessToken]);

	return isLoggedIn ? (
		<div className="flex flex-row text-neutral">
			<div className="z-20">
				<Sidebar />
			</div>

			<div className="relative z-10 w-full my-16 me-8 ms-20 sm:my-20 sm:me-20 sm:ms-32 lg:me-28 lg:ms-40">
				<AnimatePresence>
					<Suspense fallback={<Loading />}>
						<Routes location={location} key={location.pathname}>
							{/* No URL */}
							<Route path="" element={<Navigate to="/dashboard" replace />} />
							<Route path="/login" element={<Navigate to="/dashboard" replace />} />
							{/* Page not found */}
							<Route path="*" element={<PageNotFound />}></Route>

							{/* Admin only */}
							{/* Admin classrooms */}
							<Route
								path="/admin/classrooms"
								element={
									<ClassroomContextProvider>
										<TeachersContextProvider>
											<Admin_Classrooms />
										</TeachersContextProvider>
									</ClassroomContextProvider>
								}
							></Route>
							{/* Admin students */}
							<Route
								path="/admin/students"
								element={
									<StudentsFiltersContextProvider>
										<StudentsContextProvider>
											<Admin_Students />
										</StudentsContextProvider>
									</StudentsFiltersContextProvider>
								}
							></Route>
							{/* Admin teachers */}
							<Route
								path="/admin/teachers"
								element={
									<TeachersFiltersContextProvider>
										<TeachersContextProvider>
											<Admin_Teachers />
										</TeachersContextProvider>
									</TeachersFiltersContextProvider>
								}
							></Route>
							{/* Admin clubs */}
							<Route
								path="/admin/clubs"
								element={
									<ClubsFiltersContextProvider>
										<ClubsContextProvider>
											<TeachersContextProvider>
												<Admin_Clubs />
											</TeachersContextProvider>
										</ClubsContextProvider>
									</ClubsFiltersContextProvider>
								}
							></Route>
							{/* Admin leave notices */}
							<Route
								path="/admin/leaveNotices"
								element={
									<LeaveNoticesContextProvider>
										<Admin_LeaveNotices />
									</LeaveNoticesContextProvider>
								}
							></Route>

							{/* Head only */}
							{/* Head students */}
							<Route
								path="/majors/students"
								element={
									<StudentsFiltersContextProvider>
										<StudentsContextProvider>
											<Head_Students />
										</StudentsContextProvider>
									</StudentsFiltersContextProvider>
								}
							></Route>
							{/* Head teachers */}
							<Route
								path="/majors/teachers"
								element={
									<TeachersFiltersContextProvider>
										<TeachersContextProvider>
											<Head_Teachers />
										</TeachersContextProvider>
									</TeachersFiltersContextProvider>
								}
							></Route>
							{/* Head clubs */}
							<Route
								path="/majors/clubs"
								element={
									<ClubsFiltersContextProvider>
										<ClubsContextProvider>
											<TeachersContextProvider>
												<Head_Clubs />
											</TeachersContextProvider>
										</ClubsContextProvider>
									</ClubsFiltersContextProvider>
								}
							></Route>
							{/* Head leave notices */}
							<Route
								path="/majors/leaveNotices"
								element={
									<LeaveNoticesContextProvider>
										<StudentsContextProvider>
											<Head_LeaveNotices />
										</StudentsContextProvider>
									</LeaveNoticesContextProvider>
								}
							></Route>

							{/* Dashboard */}
							<Route
								path="/dashboard"
								element={<Dashboard />}
							></Route>

							{/* Students */}
							<Route
								path="/students"
								element={
									<StudentsFiltersContextProvider>
										<StudentsContextProvider>
											<Students />
										</StudentsContextProvider>
									</StudentsFiltersContextProvider>
								}
							></Route>
							{/* Teachers */}
							<Route
								path="/teachers"
								element={
									<TeachersFiltersContextProvider>
										<TeachersContextProvider>
											<Teachers />
										</TeachersContextProvider>
									</TeachersFiltersContextProvider>
								}
							></Route>
							{/* Clubs */}
							<Route
								path="/clubs"
								element={
									<ClubsFiltersContextProvider>
										<ClubsContextProvider>
											<StudentsContextProvider>
												<TeachersContextProvider>
													<Clubs />
												</TeachersContextProvider>
											</StudentsContextProvider>
										</ClubsContextProvider>
									</ClubsFiltersContextProvider>
								}
							></Route>
							{/* Club */}
							<Route
								path="/club"
								element={
									<ClubsContextProvider>
										<StudentsContextProvider>
											<TeachersContextProvider>
												{student_access_only(userInfo.result.profile_position) ? (
													<Student_Club />
												) : (
													<Teacher_Club />
												)}
											</TeachersContextProvider>
										</StudentsContextProvider>
									</ClubsContextProvider>
								}
							></Route>

							{/* Leave notices */}
							<Route
								path="/leaveNotices"
								element={
									<LeaveNoticesContextProvider>
										<StudentsContextProvider>
											{
												student_access_only(userInfo.result.profile_position) ? (
													<Student_LeaveNotices />
												) : (
													<ClassroomContextProvider>
														<Teacher_LeaveNotices />
													</ClassroomContextProvider>
												)
											}
										</StudentsContextProvider>
									</LeaveNoticesContextProvider>
								}
							></Route>

							{/* Settings */}
							<Route
								path="/settings"
								element={
									<Settings />
								}
							></Route>
						</Routes>
					</Suspense>
				</AnimatePresence>
			</div>
		</div>
	) : (
		<div className="absolute inset-x-0 inset-y-0 flex items-center justify-center sm:inset-y-auto sm:mt-4">
			<Routes>
				<Route path="*" element={<Navigate to="/login" replace />} />
				<Route
					path="/login"
					element={
						<Login
							setAccessToken={setAccessToken}
							setUserInfo={setUserInfo}
							setIsLoggedIn={setIsLoggedIn}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
