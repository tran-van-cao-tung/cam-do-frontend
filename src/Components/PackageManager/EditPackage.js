import React, { useEffect, useState } from 'react';

import callAPI from '../../API';

import { Button } from '@mui/material';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import { toast } from 'react-toastify';

function EditPackage({ showEditPagkage, setShowEditPagkage, refresh }) {
    const id = localStorage.getItem('PagekageId');
    const [listPackage, setListPackage] = useState([]);

    const handleInput = (e) => {
        setListPackage({ ...listPackage, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        callAPI({
            method: 'get',
            url: `package/getPackageById/${id}`,
        })
            .then((res) => {
                setListPackage(res.data);
            })
            .catch((err) => console.log('Err at API package'));
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            packageId: id,
            packageName: listPackage.packageName,
            packageInterest: listPackage.packageInterest,
            day: listPackage.day,
            paymentPeriod: listPackage.paymentPeriod,
            limitation: 0,
            punishDay1: listPackage.punishDay1,
            punishDay2: listPackage.punishDay2,
            ransomPenalty: listPackage.ransomPenalty,
            interestDiaryPenalty: listPackage.interestDiaryPenalty,
            liquitationDay: listPackage.liquitationDay,
            interestDiaryPenalty: listPackage.interestDiaryPenalty,
            ransomPenalty: listPackage.ransomPenalty,
        };
        callAPI({
            method: 'put',
            url: `package/updatePackage`,
            data: data,
        }).then((res) => {
            refresh();
            toast.success(`Chỉnh sửa thành công!`);
            setShowEditPagkage(false);
        });
    };
    const renderContent = () => (
        <form /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
            <div className="employeeAdd">
                <div className="employee_input">
                    <span>
                        Tiền gói vay <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="packageName"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.packageName}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Lãi suất <span>*</span> (%):
                    </span>
                    <input
                        type="text"
                        name="packageInterest"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.packageInterest}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Số ngày vay <span>*</span>:
                    </span>
                    <input type="text" name="day" onChange={(e) => handleInput(e)} value={listPackage.day} />
                </div>
                <div className="employee_input">
                    <span>
                        Kỳ lãi <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="paymentPeriod"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.paymentPeriod}
                    />
                </div>
                {/* <div className="employee_input">
                    <span>
                        Số ngày trễ hạn <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="limitation"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.limitation}
                    />
                </div> */}
                <div className="employee_input">
                    <span>
                        Ngày phạt đợt 1 <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="punishDay1"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.punishDay1}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Ngày phạt đợt 2 <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="punishDay2"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.punishDay2}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Phạt chuộc sớm <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="ransomPenalty"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.ransomPenalty}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Phạt đóng lãi trễ (%)<span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="interestDiaryPenalty"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.interestDiaryPenalty}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Thanh lý vào ngày<span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="liquitationDay"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.liquitationDay}
                    />
                </div>
            </div>
        </form>
    );
    const handleCloseDialog = () => {
        setShowEditPagkage(false);
    };
    return (
        <CustomizeDiaglog
            open={showEditPagkage}
            onClose={handleCloseDialog}
            title="Cập Nhật Gói Vay"
            content={renderContent()}
            action={
                <Button
                    onClick={(e) => onSubmit(e)}
                    variant="contained"
                    color="success"
                    sx={{
                        fontSize: '16px',
                        padding: '15px 30px',
                    }}
                    type="submit"
                    startIcon={<Save />}
                >
                    Lưu Lại
                </Button>
            }
            maxWidth={DIALOG_SIZE.lg}
        />
    );
}

export default EditPackage;
