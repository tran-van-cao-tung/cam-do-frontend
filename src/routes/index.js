import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import ListEmployees from "../Components/DetailsEmployees/ListEmployees";
import AuthEmployees from "../Components/DetailsEmployees/AuthEmployees";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path:'/detaipawn',
    component:DetailsPawn
  },
  {
    path:'/listemployees',
    component:ListEmployees
  },
  {
    path:'/authemployees',
    component:AuthEmployees
  },
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
