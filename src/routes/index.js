import Home from "./../Components/Home/Home";
import DetailsPawn from "./../Components/DetailsPawn/DetailsPawn";
import WareHouse from "./../Components/WareHouse/ListWareHouse";
import AddWareHouse from "./../Components/WareHouse/AddWareHouse";

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
    {
        path: "/warehouse/add",
        component: AddWareHouse,
    },
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
