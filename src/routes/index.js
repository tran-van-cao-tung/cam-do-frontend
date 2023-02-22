import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import ChainStores from '../Components/StoreManager/ChainStores/ChainStores';
import Commodity from "../Components/StoreManager/Commodity/Commodity";
import DetailsStore from "../Components/StoreManager/DetailsStore/DetailsStore";
import ListStore from "../Components/StoreManager/ListStore/ListStore";
import Money from "../Components/StoreManager/Money/Money";
import AddList from "../Components/StoreManager/AddListStore/AddList";
import Addcommondity from "../Components/StoreManager/AddCommondity/Addcommondity";

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
    path: '/commodity/add',
    component: Addcommondity
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
    path: '/Addliststore/add',
    component: AddList
  },
  { 
    path: '/money',
    component: Money
  },
  

];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
