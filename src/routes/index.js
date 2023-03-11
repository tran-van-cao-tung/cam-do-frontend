import Home from './../Components/Home/Home';
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import ChainStores from '../Components/StoreManager/ChainStores/ChainStores';
import Commodity from '../Components/StoreManager/Commodity/Commodity';
import DetailsStore from '../Components/StoreManager/DetailsStore/DetailsStore';
import ListStore from '../Components/StoreManager/ListStore/ListStore';
import Money from '../Components/StoreManager/Money/Money';
import AddList from '../Components/StoreManager/AddListStore/AddList';
import Addcommondity from '../Components/StoreManager/AddCommondity/Addcommondity';
import WareHouse from '../Components/WareHouse/ListWareHouse';
import AddWareHouse from '../Components/WareHouse/AddWareHouse';
import UpdateWareHouse from '../Components/WareHouse/UpdateWareHouse';
import AnnualReport from '../Components/Report/AnnualReport';
import ListEmployees from '../Components/DetailsEmployees/ListEmployees';
import AuthEmployees from '../Components/DetailsEmployees/AuthEmployees';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/detaipawn',
        component: DetailsPawn,
    },
    {
        path: '/chainstores',
        component: ChainStores,
    },
    {
        path: '/commodity',
        component: Commodity,
    },
    {
        path: '/commodity/add',
        component: Addcommondity,
    },
    {
        path: '/detailsStore',
        component: DetailsStore,
    },
    {
        path: '/liststore',
        component: ListStore,
    },
    {
        path: '/Addliststore/add',
        component: AddList,
    },
    {
        path: '/money',
        component: Money,
    },
    {
        path: '/warehouse',
        component: WareHouse,
    },
    {
        path: '/warehouse/add',
        component: AddWareHouse,
    },
    {
        path: '/warehouse/update',
        component: UpdateWareHouse,
    },
    {
        path: '/listemployees',
        component: ListEmployees,
    },
    {
        path: '/authemployees',
        component: AuthEmployees,
    },
    {
        path: '/reports/annual',
        component: AnnualReport,
    },
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
