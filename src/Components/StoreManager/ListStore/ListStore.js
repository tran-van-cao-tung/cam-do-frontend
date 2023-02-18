import React from "react";
import "./liststore.css";

const ListStore = () => {
  return (
    <>
      <div className="liststore">
        <h1>Danh sách cửa hàng</h1>
        <div className="liststorebody">
          {/* Button  Add */}
          <button className="addliststore">Thêm mới cửa hàng</button>
          {/* Status */}
          <div className="status">
            <span>Tình Trạng</span>
            {/* From status  */}
            <div className="fromstatus">
              <input name="gender" type="radio" value="Tất cả" />
              <p>Tất cả</p>
              <input name="gender" type="radio" value="Đang hoạt động" />
              <p>Đang hoạt động</p>
              <input name="gender" type="radio" value="Đã tạm dừng" />
              <p>Đã tạm dừng</p>
            </div>
            {/* Search */}
            <div className="searchinput">
              <input
                type="text"
                class="searchTerm"
                placeholder="Tìm kiếm..."
              ></input>
            </div>
            {/* Button Search */}
            <span className="buttonsearch">
              <button>Tìm Kiếm</button>
            </span>
          </div>
        </div>
        {/* Table Store */}
        <div className="table">helo</div>
      </div>
    </>
  );
};

export default ListStore;
