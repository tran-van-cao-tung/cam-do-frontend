import React, { useEffect, useState } from "react";
import BtnDetails from "./BtnDetails";
import ContentPawn from "./ContentPawn";

import HeaderPawn from "./HeaderPawn";
import TablePawn from "./TablePawn";
import AddContract from './PopUp/AddContract';
import UpdateContract from "./PopUp/UpdateContract";
import Liquidation from "./PopUp/Liquidation";
import DetailContract from "./PopUp/DetailContract"
import Expiration from "./PopUp/Expiration";
import callAPI from "../../API";
const DetailsPawn = () => {

  const [showAddContract, setShowAddContract] = useState(false)
  const [showUpdateContract, setShowUpdateContract] = useState(false)
  const [showliquidation, setShowliquidation] = useState(false)
  const [showdetailContract, setshowdetailContract] = useState(false)
  const [showExpiration, setShowExpiration] = useState(false);
  const [showContractId, setShowContractId] = useState();



  const [searchedProduct,setSearchedProduct] = useState();
  const [rowsContract, setContract] = useState([]);
  console.log(rowsContract)
  console.log(searchedProduct)

  return (
    <div className="details-pawn">
      <div>
        <HeaderPawn setShowAddContract={setShowAddContract} />
      </div>
      <div>
        <ContentPawn />
        <BtnDetails rowsContract={rowsContract} setContract={setContract} />
      </div>

      <TablePawn setShowUpdateContract={setShowUpdateContract} setShowliquidation={setShowliquidation} setshowdetailContract={setshowdetailContract}
        setShowContractId={setShowContractId} setShowExpiration={setShowExpiration} setContract={setContract} rowsContract={rowsContract}/>
      {
        showAddContract && <AddContract setShowAddContract={setShowAddContract} />
      }
      {
        showUpdateContract && <UpdateContract setShowUpdateContract={setShowUpdateContract} />
      }
      {
        showliquidation && <Liquidation setShowliquidation={setShowliquidation} />
      }
      {
        showdetailContract && <DetailContract setshowdetailContract={setshowdetailContract}
          showContractId={showContractId} />
      }
      {
        showExpiration && <Expiration setShowExpiration={setShowExpiration}
          showContractId={showContractId} />
      }
    </div>

  );
};

export default DetailsPawn;