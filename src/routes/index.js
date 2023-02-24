import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import ListEmployees from "../Components/DetailsEmployees/listEmployees/ListEmployees";
import AddEmployee from "../Components/DetailsEmployees/addEmployee/AddEmployee";
import EditEmployee from "../Components/DetailsEmployees/editEmployee/EditEmployee";
import AuthEmployee from "../Components/DetailsEmployees/authEmployee/AuthEmployee";

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
    path:'/addemployee',
    component:AddEmployee
  },
  {
    path:'/editemployee/:id',
    component:EditEmployee
  },
  {
    path:'/authorization',
    component:AuthEmployee
  },
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
