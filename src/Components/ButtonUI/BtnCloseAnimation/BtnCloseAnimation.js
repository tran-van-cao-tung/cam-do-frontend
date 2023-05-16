import React, { useEffect, useState } from 'react';

import './BtnCloseAnimation.scss';
import { Button } from '@mui/material';

function BtnCloseAnimation({
    setShowAddContract,
    setShowUpdateContract,
    showUpdateContract,
    showAddContract,
    showliquidation,
    setShowliquidation,
    showdetailContract,
    setshowdetailContract,
    showExpiration,
    setShowExpiration,
}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const onHandlePopup = () => {
        if (showUpdateContract === true) {
            setShowUpdateContract(false);
        } else if (showAddContract === true) {
            setShowAddContract(false);
        } else if (showliquidation === true) {
            setShowliquidation(false);
        } else if (showdetailContract === true) {
            setshowdetailContract(false);
        } else if (showExpiration === true) {
            setShowExpiration(false);
        }
    };
    return (
        <div className="">
            <Button
                sx={{
                    fontSize: '16px',
                    padding: '15px 30px',
                }}
                color="error"
                variant="contained"
                onClick={() => setShowConfirm(!showConfirm)}
            >
                Đóng
            </Button>
            {showConfirm && (
                <div className="confirmContainer" onClick={() => setShowConfirm(false)}>
                    <div className="btn-confirm" onClick={(e) => e.stopPropagation()}>
                        <p>Bạn có muốn thoát không?</p>
                        <div className="btnTrueFalse">
                            <button className="yes" onClick={onHandlePopup}>
                                Có
                            </button>
                            <button className="no" onClick={() => setShowConfirm(false)}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default BtnCloseAnimation;