import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import ChainStores from '../Components/StoreManager/ChainStores/ChainStores';
import Commodity from "../Components/StoreManager/Commodity/Commodity";
import DetailsStore from "../Components/StoreManager/DetailsStore/DetailsStore";
import ListStore from "../Components/StoreManager/ListStore/ListStore";
import Money from "../Components/StoreManager/Money/Money";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: '/detaipawn',
    component: DetailsPawn
  },
  {
    path: '/chainstores',
    component: ChainStores
  },
  {
    path: '/commodity',
    component: Commodity
  },
  {
    path: '/detailsStore',
    component: DetailsStore
  },
  {
    path: '/liststore',
    component: ListStore
  },
  { 
    path: '/money',
    component: Money
  },
  

];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
