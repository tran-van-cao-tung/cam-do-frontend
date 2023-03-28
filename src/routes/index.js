import Home from "./../Components/Home/Home";
import DetailsPawn from './../Components/DetailsPawn/DetailsPawn';
import UpdateContract from './../Components/DetailsPawn/PopUp/UpdateContract';
import Login from "../Components/Login/Login";
//Employee
import ListEmployees from "../Components/DetailsEmployees/listEmployees/ListEmployees";
import AddEmployee from "../Components/DetailsEmployees/addEmployee/AddEmployee";
import EditEmployee from "../Components/DetailsEmployees/editEmployee/EditEmployee";
import AuthEmployee from "../Components/DetailsEmployees/authEmployee/AuthEmployee";

//Store
import ChainStores from "../Components/StoreManager/ChainStores/ChainStores";
import Commodity from "../Components/StoreManager/Commodity/Commodity";
import Addcommondity from "../Components/StoreManager/AddCommondity/Addcommondity";
import AddList from "../Components/StoreManager/AddListStore/AddList";
import DetailsStore from "../Components/StoreManager/DetailsStore/DetailsStore";
import EditCommondity from "../Components/StoreManager/EditCommondity/EditCommondity";
import EditListStore from "../Components/StoreManager/EditListStore/EditListStore";
import ListStore from "../Components/StoreManager/ListStore/ListStore";
import Money from "../Components/StoreManager/Money/Money";

//Warehouse
import AddWareHouse from "../Components/WareHouse/AddWareHouse";
import WareHouse from "../Components/WareHouse/ListWareHouse/WareHouse";
import EditWarehouse from "../Components/WareHouse/EditWareHouse/EditWarehouse";
import ViewProduct from "../Components/WareHouse/ViewProduct/ViewProduct";

//Customer + Report
import CustomerManager from "../Components/CustomerManager/CustomerManager";
import UpdateInfor from "../Components/CustomerManager/Popup/UpdateInfor";
import DetailCredit from "../Components/CustomerManager/Popup/DetailCredit";
import BadReportCustomer from "../Components/CustomerManager/BadReportCustomer";
import UpdateReport from "../Components/CustomerManager/Popup/UpdateReport";
import BanSomeOne from "../Components/CustomerManager/Popup/BanSomeOne";
import ReportTotal from "../Components/Report/ReportTotal";
import ReportYear from "../Components/Report/ReportYear";

const publicRoutes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: Home,
    },
    {
        path: '/detaipawn',
        component: DetailsPawn
    },
    {
        path: "/chainstores",
        component: ChainStores,
    },
    {
        path: "/commodity",
        component: Commodity,
    },
    {
        path: "/commodity/edit",
        component: EditCommondity,
    },
    {
        path: "/commodity/add",
        component: Addcommondity,
    },
    {
        path: "/detailsStore",
        component: DetailsStore,
    },
    {
        path: "/liststore",
        component: ListStore,
    },
    {
        path: "/Addliststore/add",
        component: AddList,
    },
    {
        path: '/editliststore/edit/:id',
        component: EditListStore,
    },
    {
        path: "/money",
        component: Money,
    },
    {
        path: "/warehouse",
        component: WareHouse,
    },
    {
        path: "/warehouse/add",
        component: AddWareHouse,
    },
    {
        path: '/listemployees',
        component: ListEmployees
    },
    {
        path: '/addemployee',
        component: AddEmployee
    },
    {
        path: '/editemployee/:id',
        component: EditEmployee
    },
    {
        path: '/authorization',
        component: AuthEmployee
    },
    {
        path: '/editwarehouse/edit/:id',
        component: EditWarehouse
    },
    {
        path: "/viewproduct",
        component: ViewProduct,
      },
    {
        path: "/customer-manager",
        component: CustomerManager,
      },
      {
        path: "/report-customer",
        component: BadReportCustomer,
      },
      {
        path: "/report-customer/update-report",
        component: UpdateReport,
      },
      {
        path: "/report-customer/update-report/ban-customer",
        component: BanSomeOne,
      },
      {
        path: "/customer-manager/updateinfo",
        component: UpdateInfor,
      },
      {
        path: "/customer-manager/updateinfo/detail-credit",
        component: DetailCredit,
      },
      {
        path: "/total-report",
        component: ReportTotal,
      },
      {
        path: "/report-years",
        component: ReportYear,
      },
];

const privateRoutes = [];
export { privateRoutes, publicRoutes };
