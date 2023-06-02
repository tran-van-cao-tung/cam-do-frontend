import React, { useContext, useEffect, useMemo, useState } from 'react';

import API from '../../API';

import TablePawn from './TablePawn';
import AddContract from './PopUp/AddContract';
import UpdateContract from './PopUp/UpdateContract';
import Liquidation from './PopUp/Liquidation';
import DetailContract from './PopUp/DetailContract';
import Expiration from './PopUp/Expiration';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isAvailableArray } from '../../helpers/utils';
import { Grid } from '@mui/material';
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
    const fetchCallAPI = () => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `contract/getAll/0/${currentBranchId}`,
            }).then((res) => {
                setContracts(res.data);
            });
        }
    };
    useEffect(() => {
        fetchCallAPI();
    }, [currentBranchId]);

    useEffect(() => {
        const contractId = searchParams.get('contractId');
        if (contractId != null) {
            setshowdetailContract(true);
            setShowContractId(contractId);
            navigate('/detaipawn');
        }
    }, []);
    const filteredContracts = useMemo(() => {
        if (!isAvailableArray(contracts)) {
            return [];
        }
        return contracts
            .filter((contract) => {
                if (!filters.searchText) {
                    return true;
                }
                if (contract.customerName?.includes(filters.searchText)) {
                    return true;
                }
                if (contract.cccd?.includes(filters.searchText)) {
                    return true;
                }
                return false;
            })
            .filter((contract) => {
                if (filters.status == -1) {
                    return true;
                }
                // console.log(contract.status === filters.status);
                return contract.status === filters.status;
            });
    }, [filters, contracts]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TablePawn
                    setShowUpdateContract={setShowUpdateContract}
                    setShowliquidation={setShowliquidation}
                    setshowdetailContract={setshowdetailContract}
                    setShowContractId={setShowContractId}
                    setShowExpiration={setShowExpiration}
                    filteredContracts={filteredContracts}
                    contracts={contracts}
                    filters={filters}
                    setFilters={setFilters}
                    setShowAddContract={setShowAddContract}
                />
            </Grid>
            {showAddContract && (
                <AddContract
                    refresh={fetchCallAPI}
                    showAddContract={showAddContract}
                    setShowAddContract={setShowAddContract}
                />
            )}
            {showUpdateContract && (
                <UpdateContract
                    refresh={fetchCallAPI}
                    contracts={contracts}
                    showUpdateContract={showUpdateContract}
                    setShowUpdateContract={setShowUpdateContract}
                />
            )}
            {showliquidation && (
                <Liquidation showliquidation={showliquidation} setShowliquidation={setShowliquidation} />
            )}
            {showdetailContract && (
                <DetailContract
                    showdetailContract={showdetailContract}
                    setshowdetailContract={setshowdetailContract}
                    showContractId={showContractId}
                    contracts={contracts}
                />
            )}
            {showExpiration && (
                <Expiration
                    refresh={fetchCallAPI}
                    showExpiration={showExpiration}
                    setShowExpiration={setShowExpiration}
                    showContractId={showContractId}
                />
            )}
        </Grid>
    );
};

export default DetailsPawn;
