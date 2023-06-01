import React, { useState } from 'react';
import callAPI from '../../API';
import { Box, Button, Divider, Grid } from '@mui/material';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import { toast } from 'react-toastify';
import CustomizedInput from './CustomizedInput';
import { formatMoney } from '../../helpers/dateTimeUtils';

function AddPackage({ showAddPagkage, setShowAddPagkage, refresh }) {
    const [listPackage, setListPackage] = useState([]);

    const onSubmit = (e) => {
        const totalDays = parseInt(listPackage.daysPerPeriod) * parseInt(listPackage.paymentPeriod);
        const punishDay1 = parseInt(listPackage.punishDay1) + totalDays;
        const punishDay2 = parseInt(listPackage.punishDay2) + totalDays;
        const liquitationDay = parseInt(listPackage.liquitationDay) + totalDays;
        const data = {
            packageName: listPackage.packageName,
            packageInterest: listPackage.packageInterest,
            day: totalDays,
            paymentPeriod: listPackage.daysPerPeriod,
            limitation: 0,
            punishDay1: punishDay1,
            punishDay2: punishDay2,
            ransomPenalty: listPackage.ransomPenalty,
            interestDiaryPenalty: listPackage.interestDiaryPenalty,
            liquitationDay: liquitationDay,
            // interestDiaryPenalty: listPackage.interestDiaryPenalty,
            // ransomPenalty: listPackage.ransomPenalty,
        };
        console.log(data);
        callAPI({
            method: 'post',
            url: `package/createPackage`,
            data: data,
        }).then((res) => {
            refresh();
            toast.success('Thêm thành công!');
            setShowAddPagkage(false);
        });
    };

    const handleInput = (e, key) => {
        setListPackage((prev) => ({
            ...prev, [key]: e.target.value
        }));
    };

    function isNumberString(variable) {
        return variable != null && variable != '' && typeof variable === 'string' && !isNaN(variable);
    }

    function calculateTotalDays() {
        const total = (() => {
            if (isNumberString(listPackage.paymentPeriod) && isNumberString(listPackage.daysPerPeriod)) {
                return parseInt(listPackage.daysPerPeriod) * parseInt(listPackage.paymentPeriod)
            }
            return 0;
        })()
        return total;
    }

    console.log(listPackage);
    const renderContent = () => (
        <form /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
            {/* <div className="employeeAdd">
                <div className="employee_input">
                    <span>
                        Tên gói vay <span>*</span>:
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
                        Lãi suất <span>*</span>:
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
                        Số kỳ lãi <span>*</span>:
                    </span>
                    <input
                        type="text"
                        name="paymentPeriod"
                        onChange={(e) => handleInput(e)}
                        value={listPackage.paymentPeriod}
                    />
                </div>
                <div className="employee_input">
                    <span>
                        Số ngày mỗi kỳ <span>*</span>:
                    </span>
                    <input type="text" name="daysPerPeriod" onChange={(e) => handleInput(e)} value={listPackage.daysPerPeriod} />
                </div>
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
            </div> */}

            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12}>
                    <h4>Thông tin cơ bản</h4>
                </Grid>
                <Grid item xs={6}>
                    <CustomizedInput
                        type="text"
                        onChange={(e) => handleInput(e, 'packageName')}
                        value={listPackage.packageName}
                        label={"Tên gói vay"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomizedInput
                        type="number"
                        onChange={(e) => handleInput(e, 'packageInterest')}
                        value={listPackage.packageInterest}
                        label={"Lãi suất *"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h4>Thông tin kỳ lãi</h4>
                </Grid>
                <Grid item xs={6}>
                    <CustomizedInput
                        type="number"
                        onChange={(e) => handleInput(e, 'paymentPeriod')}
                        value={listPackage.paymentPeriod}
                        label={"Số kỳ lãi"}
                    />
                    <Box
                        fontSize={13}
                        marginTop={'8px'}
                    >
                        {'Tổng số ngày vay: ' + calculateTotalDays()}
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <CustomizedInput
                        type="number"
                        onChange={(e) => {
                            handleInput(e, 'daysPerPeriod');
                            if (isNumberString(e.target.value) && isNumberString(listPackage.punishDay1)) {
                                const punish2 = parseInt(e.target.value) + parseInt(listPackage.punishDay1);
                                const fakeEvent = {
                                    target: {
                                        value: punish2
                                    }
                                }
                                handleInput(fakeEvent, 'punishDay2')
                                const liquitationDay = punish2 + parseInt(e.target.value);
                                const fakeEvent2 = {
                                    target: {
                                        value: liquitationDay
                                    }
                                }
                                handleInput(fakeEvent2, 'liquitationDay')
                            } else {
                                const fakeEvent = {
                                    target: {
                                        value: ''
                                    }
                                }
                                handleInput(fakeEvent, 'punishDay2')
                                handleInput(fakeEvent, 'liquitationDay')
                            }
                        }}
                        value={listPackage.daysPerPeriod}
                        label={"Số ngày mỗi kỳ *"}
                    />

                </Grid>

                <Grid item xs={12}>
                    <h4>Thông tin chuộc đồ</h4>
                </Grid>
                <Grid item xs={6}>
                    <CustomizedInput
                        type="number"
                        onChange={(e) => {
                            handleInput(e, 'punishDay1');
                            if (isNumberString(e.target.value) && isNumberString(listPackage.daysPerPeriod)) {
                                const punishDay2 = parseInt(e.target.value) + parseInt(listPackage.daysPerPeriod);
                                const fakeEvent = {
                                    target: {
                                        value: punishDay2
                                    }
                                }
                                handleInput(fakeEvent, 'punishDay2')
                                const liquitationDay = punishDay2 + parseInt(listPackage.daysPerPeriod);
                                const fakeEvent2 = {
                                    target: {
                                        value: liquitationDay
                                    }
                                }
                                handleInput(fakeEvent2, 'liquitationDay')
                            } else {
                                const fakeEvent = {
                                    target: {
                                        value: ''
                                    }
                                }
                                handleInput(fakeEvent, 'punishDay2')
                                handleInput(fakeEvent, 'liquitationDay')
                            }
                        }}
                        value={listPackage.punishDay1}
                        label={"Ngày phạt đợt 1"}
                    />
                    <Box
                        fontSize={13}
                        marginTop={'8px'}
                    >
                        * Sau ngày hết hạn gói
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <CustomizedInput
                        type="number"
                        value={listPackage.punishDay2 ?? ''}
                        label={"Ngày phạt đợt 2 "}
                        disabled
                    />
                    <Box
                        fontSize={13}
                        marginTop={'8px'}
                    >
                        * Sau <b>ngày phạt đợt 1</b> một kỳ lãi
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <CustomizedInput
                        type="number"
                        onChange={(e) => handleInput(e, 'ransomPenalty')}
                        value={listPackage.ransomPenalty}
                        label={"Phạt chuộc (%)"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h4>Thông tin đóng lãi</h4>
                </Grid>

                <Grid item xs={12}>
                    <CustomizedInput
                        type="number"
                        onChange={(e) => handleInput(e, 'interestDiaryPenalty')}
                        value={listPackage.interestDiaryPenalty}
                        label={"Phạt đóng lãi trễ (%)"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h4>Thông tin thanh lý</h4>
                </Grid>

                <Grid item xs={12}>
                    <CustomizedInput
                        type="number"
                        value={listPackage.liquitationDay ?? ''}
                        label={"Ngày thanh lý"}
                        disabled
                    />
                    <Box
                        fontSize={13}
                        marginTop={'8px'}
                    >
                        * Sau <b>ngày phạt đợt 2</b> một kỳ lãi
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
    const handleCloseDialog = () => {
        setShowAddPagkage(false);
    };
    return (
        <CustomizeDiaglog
            open={showAddPagkage}
            onClose={handleCloseDialog}
            title="Thêm mới gói vay"
            content={
                <>
                    <Box height={16} />
                    {renderContent()}
                </>
            }
            action={
                <Button
                    onClick={(e) => onSubmit(e)}
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                        fontSize: '16px',
                        padding: '15px 30px',
                    }}
                    startIcon={<Save />}
                >
                    Lưu Lại
                </Button>
            }

            maxWidth={DIALOG_SIZE.lg}
        />
    );
}

export default AddPackage;
