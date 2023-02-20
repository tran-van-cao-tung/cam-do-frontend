import Home from "./../Components/Home/Home";
import DetailsPawn from "./../Components/DetailsPawn/DetailsPawn";
import WareHouse from "./../Components/WareHouse/WareHouse";

const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/detaipawn",
        component: DetailsPawn,
    },
    {
        path: "/warehouse",
        component: WareHouse,
    },
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
