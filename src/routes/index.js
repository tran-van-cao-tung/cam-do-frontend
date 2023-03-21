import Home from "./../Components/Home/Home";
import DetailsPawn from "./../Components/DetailsPawn/DetailsPawn";
import UpdateContract from "./../Components/DetailsPawn/PopUp/UpdateContract";
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
    path: "/",
    component: Home,
  },
  {
    path: "/detaipawn",
    component: DetailsPawn,
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
