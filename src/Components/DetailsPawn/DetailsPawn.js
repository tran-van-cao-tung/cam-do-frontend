import React, { useContext, useEffect, useMemo, useState } from 'react';
import BtnDetails from './BtnDetails';
import API from '../../API';
import HeaderPawn from './HeaderPawn';
import TablePawn from './TablePawn';
import AddContract from './PopUp/AddContract';
import UpdateContract from './PopUp/UpdateContract';
import Liquidation from './PopUp/Liquidation';
import DetailContract from './PopUp/DetailContract';
import Expiration from './PopUp/Expiration';
import { AuthContext } from '../../helpers/AuthContext';
// import './DetailPawn.css';
const DetailsPawn = () => {
    const [showAddContract, setShowAddContract] = useState(false);
    const [showUpdateContract, setShowUpdateContract] = useState(false);
    const [showliquidation, setShowliquidation] = useState(false);
    const [showdetailContract, setshowdetailContract] = useState(false);
    const [showExpiration, setShowExpiration] = useState(false);
    const [showContractId, setShowContractId] = useState();

    const [rowsContract, setContract] = useState([]);
    const { authState, currentBranchId } = useContext(AuthContext);
    
    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `contract/getAll/0/${currentBranchId}`,
            }).then((res) => {
                console.log(res.data);
                setContract(res.data);
            });
        }
    }, [currentBranchId, setContract]);

    const filteredContracts = useMemo(()=>{

    }, [])

    return (
        <div className="details-pawn">
            <div>
                <HeaderPawn setShowAddContract={setShowAddContract} />
            </div>
            <div className="btnDetailPawn">
                <BtnDetails rowsContract={rowsContract} setContract={setContract} />
            </div>

            <TablePawn
                className="tableComponent"
                setShowUpdateContract={setShowUpdateContract}
                setShowliquidation={setShowliquidation}
                setshowdetailContract={setshowdetailContract}
                setShowContractId={setShowContractId}
                setShowExpiration={setShowExpiration}
                setContract={setContract}
                rowsContract={rowsContract}
            />
            {showAddContract && (
                <AddContract showAddContract={showAddContract} setShowAddContract={setShowAddContract} />
            )}
            {showUpdateContract && (
                <UpdateContract showUpdateContract={showUpdateContract} setShowUpdateContract={setShowUpdateContract} />
            )}
            {showliquidation && (
                <Liquidation showliquidation={showliquidation} setShowliquidation={setShowliquidation} />
            )}
            {showdetailContract && (
                <DetailContract
                    showdetailContract={showdetailContract}
                    setshowdetailContract={setshowdetailContract}
                    showContractId={showContractId}
                />
            )}
            {showExpiration && (
                <Expiration
                    showExpiration={showExpiration}
                    setShowExpiration={setShowExpiration}
                    showContractId={showContractId}
                />
            )}
        </div>
    );
};

export default DetailsPawn;
