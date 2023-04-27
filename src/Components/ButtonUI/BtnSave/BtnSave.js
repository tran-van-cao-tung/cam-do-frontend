import React from 'react';
import './BtnSave.scss';
const BtnSave = () => {
    const onHandleSubmit = () => {};
    return (
        <div>
            <button className="btnSave" type="submit" onClick={onHandleSubmit}>
                Lưu
            </button>
        </div>
    );
};

export default BtnSave;
