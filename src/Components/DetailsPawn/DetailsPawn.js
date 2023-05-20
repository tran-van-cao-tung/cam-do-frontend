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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isAvailableArray } from '../../helpers/utils';
// import './DetailPawn.css';
const DetailsPawn = () => {
    const [showAddContract, setShowAddContract] = useState(false);
    const [showUpdateContract, setShowUpdateContract] = useState(false);
    const [showliquidation, setShowliquidation] = useState(false);
    const [showdetailContract, setshowdetailContract] = useState(false);
    const [showExpiration, setShowExpiration] = useState(false);
    const [showContractId, setShowContractId] = useState();

    const [contracts, setContracts] = useState([]);
    const { currentBranchId } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        searchText: '',
        status: -1,
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `contract/getAll/0/${currentBranchId}`,
            }).then((res) => {
                setContracts(res.data);
            });
        }
    }, [currentBranchId]);

    useEffect(() => {
        const contractId = searchParams.get('contractId');
        if (contractId != null) {
            setshowdetailContract(true);
            setShowContractId(contractId);
            navigate('/detaipawn');
        }
    }, [])
    const filteredContracts = useMemo(() => {
        if (!isAvailableArray(contracts)) {
            return [];
        }
        return contracts
            .filter((contract) => {
                if(!filters.searchText){
                    return true;
                }
                if (contract.customerName?.includes(filters.searchText)) {
                    return true;
                }
                if (contract.cccd?.includes(filters.searchText)) {
                    return true;
                }
                return false;
            }).filter((contract) => {
                if (filters.status == -1) {
                    return true;
                }
                // console.log(contract.status === filters.status);
                return contract.status === filters.status;
            })
    }, [filters, contracts])

    return (
        <div className="details-pawn">
            <div>
                <HeaderPawn setShowAddContract={setShowAddContract} />
            </div>
            <div className="btnDetailPawn">
                <BtnDetails filters={filters} setFilters={setFilters} />
            </div>

            <TablePawn
                className="tableComponent"
                setShowUpdateContract={setShowUpdateContract}
                setShowliquidation={setShowliquidation}
                setshowdetailContract={setshowdetailContract}
                setShowContractId={setShowContractId}
                setShowExpiration={setShowExpiration}
                filteredContracts={filteredContracts}
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
