import React, { useEffect, useState } from 'react';

import './BtnCloseAnimation.scss';
import { Button } from '@mui/material';

function ButtonCloseAnimation({ onCancel, onConfirm }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleCancel = () => {
        setShowConfirm(false);
        onCancel();
    };
    const handleConfirm = () => {
        setShowConfirm(false);
        onConfirm();
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
                            <button className="yes" onClick={handleConfirm}>
                                Có
                            </button>
                            <button className="no" onClick={handleCancel}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ButtonCloseAnimation;
