import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path:'/detaipawn',
    component:DetailsPawn
  }
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
