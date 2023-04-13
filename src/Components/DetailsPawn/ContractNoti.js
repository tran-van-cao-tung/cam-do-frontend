import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./DetaisPawn.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import subwallet from "../../asset/img/subwallet.png";
import note from "../../asset/img/note.png";
import moment from "moment";
import cash from "../../asset/img/cash.png";
import wallet from "../../asset/img/wallet.png";
const ContractNoti = () => {
    
    return (
      <div className="details-pawn">
      <h1 className="header">Thông báo thu nợ hôm nay</h1>
      <div>
      
      </div>
    </div>
    );
};

export default ContractNoti;
