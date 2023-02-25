import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import UpdateContract from './../Components/DetailsPawn/PopUp/UpdateContract';

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path:'/detaipawn',
    component:DetailsPawn
  },
  
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
