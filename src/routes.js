import AdminPage from "./pages/AdminPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import ShowPage from "./pages/ShowPage";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/blogs",
    component: ListPage,
  },
  {
    path: "/admin",
    component: AdminPage,
  },
  {
    path: "/blogs/create",
    component: CreatePage,
  },
  {
    path: "/blogs/:id/edit",
    component: EditPage,
  },
  {
    path: "/blogs/:id",
    component: ShowPage,
  },
];

export default routes;
