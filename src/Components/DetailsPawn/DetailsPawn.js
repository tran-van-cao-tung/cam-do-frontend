import React, { useEffect, useState } from "react";
import BtnDetails from "./BtnDetails";
import ContentPawn from "./ContentPawn";

import HeaderPawn from "./HeaderPawn";
import TablePawn from "./TablePawn";
import AddContract from './PopUp/AddContract';
import UpdateContract from "./PopUp/UpdateContract";
import Liquidation from "./PopUp/Liquidation";
import DetailContract from "./PopUp/DetailContract"

const DetailsPawn = () => {

  const [showAddContract, setShowAddContract] = useState(false)
  const [showUpdateContract, setShowUpdateContract] = useState(false)
  const [showliquidation, setShowliquidation] = useState(false)
  const [showdetailContract, setshowdetailContract] = useState(false)
  const [showContractId,setShowContractId] = useState();

  /* useEffect(()=>{
    console.log(showContractId)
  },[showContractId]) */

  return (
    <div className="details-pawn">
      <div>
        <HeaderPawn setShowAddContract={setShowAddContract} />
      </div>
      <div>
        <ContentPawn />
        <BtnDetails />
      </div>

      <TablePawn setShowUpdateContract={setShowUpdateContract} setShowliquidation={setShowliquidation} setshowdetailContract={setshowdetailContract} 
      setShowContractId={setShowContractId}/>
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
        showdetailContract && <DetailContract  setshowdetailContract={setshowdetailContract}
        showContractId={showContractId} />
      }
    </div>

  );
};

export default DetailsPawn;