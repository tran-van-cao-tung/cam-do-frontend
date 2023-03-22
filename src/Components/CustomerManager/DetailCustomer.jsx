import { Link } from "@mui/material";
import React, { useState } from "react";
import BanSomeOne from "./Popup/BanSomeOne";
import UpdateInfor from "./Popup/UpdateInfor";

const DetailCustomer = () => {
  const [showBanReason, setShowBanReason] = useState(false);

  return (
    <div className="details-pawn">
      <UpdateInfor setShowBanReason={setShowBanReason} />

      {showBanReason && (
        <Link to="/report-customer/update-report/ban-customer">
          <BanSomeOne setShowBanReason={setShowBanReason} />
        </Link>
      )}
    </div>
  );
};

export default DetailCustomer;
