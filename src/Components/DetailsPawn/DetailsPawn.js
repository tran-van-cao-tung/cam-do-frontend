import React, { useState } from 'react';
import BtnDetails from './BtnDetails';
import ContentPawn from './ContentPawn';

import HeaderPawn from './HeaderPawn';
import TablePawn from './TablePawn';
import AddContract from './PopUp/AddContract';
const DetailsPawn = () => {
    const [showAddContract, setShowAddContract] = useState(false);

    return (
        <div className="details-pawn">
            <div>
                <HeaderPawn setShowAddContract={setShowAddContract} />
            </div>
            <div>
                <ContentPawn />
                <BtnDetails />
            </div>
            <TablePawn />
            {showAddContract && <AddContract setShowAddContract={setShowAddContract} />}
        </div>
    );
};

export default DetailsPawn;
