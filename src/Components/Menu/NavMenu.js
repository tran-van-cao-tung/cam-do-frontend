import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import menu1 from "../../asset/img/menu1.png";
import menu2 from "../../asset/img/menu2.png";
import menu3 from "../../asset/img/menu3.png";
import menu5 from "../../asset/img/menu5.png";
import menu6 from "../../asset/img/menu6.png";
import menu7 from "../../asset/img/menu7.png";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import API from "../../API"
const NavMenu = () => {
  const [show1, setShow1] = useState(
    JSON.parse(localStorage.getItem("show1")) || false
  );
  const [show2, setShow2] = useState(
    JSON.parse(localStorage.getItem("show2")) || false
  );
  const [show3, setShow3] = useState(
    JSON.parse(localStorage.getItem("show3")) || false
  );

  function getPermission() {
    console.log("check permission after login");
    // setEmployeeList(e.target.value);
    API({
      method: 'post',
      url: '/permission/showpermission',
      data: {
        userId: localStorage.getItem("userId"),
        nameUser: "string"
      }
    }).then((res) => {
      for (let i = 0; i < 5; i++) {
        sessionStorage.setItem("permis " + i, res.data[i].status);
        console.log('user permis:', res.data[i].status);
      }
    });
  }

  const clickShow = () => {
    setShow1(!show1);
  };
  const clickShow1 = () => {
    setShow2(!show2);
  };
  const clickShow2 = () => {
    setShow3(!show3);
  };

  useEffect(() => {
    localStorage.setItem("show1", JSON.stringify(show1));
    localStorage.setItem("show2", JSON.stringify(show2));
    localStorage.setItem("show3", JSON.stringify(show3));
  }, [show1, show2, show3]);
  const clickHide = () => {
    localStorage.setItem("show1", JSON.stringify(false));
    localStorage.setItem("show2", JSON.stringify(false));
    localStorage.setItem("show3", JSON.stringify(false));
    setShow1(false);
    setShow2(false);
    setShow3(false);
  };

  return (
    <div className="menu-conten" onLoad={getPermission}>
      <ul className="menu-text">
        <li onClick={clickHide}>
          <NavLink to="/" className="text-menu home">
            {" "}
            <img src={menu1} className="iconMenu" />
            <span>Trang chủ</span>
          </NavLink>
        </li>
        {/* Cầm đồ */}
        {(sessionStorage.getItem("permis 0") === "true" || (localStorage.getItem("userName") === "Admin")) &&
          <li>
            <NavLink to="/detaipawn" className="text-menu home">
              {" "}
              <img src={menu2} className="iconMenu" />
              <span>Cầm đồ</span>
              <MdKeyboardArrowRight className="arrow" />
            </NavLink>
          </li>
        }


        {/* Quản lý cửa hàng */}
        {(sessionStorage.getItem("permis 1") === "true" || (localStorage.getItem("userName") === "Admin")) &&
          <li >
            <a className="text-menu home" onClick={clickShow}>
              {" "}
              <img src={menu3} className="iconMenu" />
              <span>Quản lý cửa hàng</span>
              {
                show1 === true ? <MdKeyboardArrowDown className="arrow" /> :

                  <MdKeyboardArrowRight className="arrow" />
              }
            </a>

            {show1 && show1 ? (
              <ul className={`submenu ${show1}`}>
                <li className="subtext">
                  <NavLink to="/chainstores">&#128900; Chuỗi cửa hàng</NavLink>
                </li>
                <li className="subtext">
                  <NavLink to="/detailsStore/1" className="subtext">
                    &#128900; Chi tiết cửa hàng
                  </NavLink>
                </li>
                <li className="subtext">
                  <NavLink to="/liststore" className="subtext">
                    &#128900; Danh sách cửa hàng
                  </NavLink>
                </li>
                <li className="subtext">
                  <NavLink to="/commodity" className="subtext">
                    &#128900; Cấu hình hàng hóa
                  </NavLink>
                </li>
                <li className="subtext">
                  <NavLink to="/money" className="subtext">
                    &#128900; Nhập quỹ tiền mặt
                  </NavLink>
                </li>
              </ul>
            ) : (<></>)}
          </li>
        }

        {/* Quản lý kho */}
        {(sessionStorage.getItem("permis 2") === "true" || (localStorage.getItem("userName") === "Admin")) &&
          <li>
            <NavLink to="/warehouse" className="text-menu home">
              {" "}
              <img src={menu2} className="iconMenu" />
              <span>Quản lý kho</span>
            </NavLink>
          </li>
        }

        {/* Quản lý nhân viên */}
        {(sessionStorage.getItem("permis 3") === "true" || (localStorage.getItem("userName") === "Admin")) &&
          <li>
            <a className="text-menu home" onClick={clickShow1}>
              <img src={menu5} className="iconMenu" />
              <span>Quản lý nhân viên</span>
              {
                show2 === true ? <MdKeyboardArrowDown className="arrow" /> :

                  <MdKeyboardArrowRight className="arrow" />
              }
            </a>
            {
              show2 && (
                <ul className={`submenu ${show1}`}>
                  <li className="subtext">
                    <NavLink to="/listemployees">&#128900; Danh sách nhân viên</NavLink>
                  </li>
                  <li className="subtext">
                    <NavLink to="/authorization" className="subtext">
                      &#128900; Phân quyền nhân viên
                    </NavLink>
                  </li>

                </ul>
              )
            }
          </li>
        }


        {/* Quản lý khách hàng */}
        {(sessionStorage.getItem("permis 4") === "true" || (localStorage.getItem("userName") === "Admin")) &&
          <li>
            <NavLink to="/customer-manager" className="text-menu home">
              <img src={menu6} className="iconMenu" />
              <span>Quản lý khách hàng</span>
            </NavLink>
          </li>
        }

        {/* Báo cáo */}
        <li>
          <a className="text-menu home" onClick={clickShow2}>
            <img src={menu7} className="iconMenu" />

            <span>Báo cáo</span>
            {show3 === true ? (
              <MdKeyboardArrowDown className="arrow" />
            ) : (
              <MdKeyboardArrowRight className="arrow" />
            )}
          </a>
          {show3 && (
            <ul className={`submenu ${show3}`}>
              <li className="subtext">
                <NavLink to="/total-report">&#128900; Tổng giao dịch</NavLink>
              </li>
              <li className="subtext">
                <NavLink to="/report-years" className="subtext">
                  &#128900; Báo cáo năm
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
