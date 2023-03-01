import React, { useState } from "react";
import BtnDetails from "./BtnDetails";
import ContentPawn from "./ContentPawn";

import HeaderPawn from "./HeaderPawn";
import TablePawn from "./TablePawn";
import AddContract from './PopUp/AddContract';
import UpdateContract from "./PopUp/UpdateContract";
import Liquidation from "./PopUp/Liquidation";
const DetailsPawn = () => {
const [showAddContract,setShowAddContract] = useState(false)
const [showUpdateContract,setShowUpdateContract] = useState(false)
const [showliquidation,setShowliquidation] = useState(false)



  return (
   
      <div className="details-pawn">
        <div>
          <HeaderPawn setShowAddContract={setShowAddContract}/>
        </div>
        <div>
          <ContentPawn />
          <BtnDetails />
        </div>
      <TablePawn setShowUpdateContract={setShowUpdateContract} setShowliquidation={setShowliquidation}/>
      {
        showAddContract && <AddContract setShowAddContract={setShowAddContract}/>
      }
      {
        showUpdateContract && <UpdateContract setShowUpdateContract={setShowUpdateContract}/>
      }
      {
        showliquidation && <Liquidation setShowliquidation={setShowliquidation}/>
      }
      
      </div>
      
  );
};

export default DetailsPawn;
