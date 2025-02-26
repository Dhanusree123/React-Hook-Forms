import { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const UsersPage = lazy(() => import("../pages/users/Users"));
const EditUsersPage = lazy(() => import("../pages/users/EditUsersPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const AddUsersPage = lazy(() => import("../pages/users/AddUsersPage"));
const ResourcesPage = lazy(() => import("../pages/resources/ResourcesPage"));
const AddResourcePage = lazy(
  () => import("../sections/resources/add-resource")
);
const EditResourcePage = lazy(
  () => import("../sections/resources/edit-resource")
);

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
        {
          path: "user/:id/edit",
          element: <EditUsersPage />,
        },
        {
          path: "user/new",
          element: <AddUsersPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "resources",
          element: <ResourcesPage />,
        },
        {
          path: "resource/new",
          element: <AddResourcePage />,
        },
        {
          path: "resource/:id/edit",
          element: <EditResourcePage />,
        },
      ],
    },
  ]);
};

export default Router;
