import React, { useEffect, useState } from 'react';

import './BtnCloseAnimation.scss';

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
            <button className="btnClose" onClick={() => setShowConfirm(!showConfirm)}>
                Đóng
            </button>
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
