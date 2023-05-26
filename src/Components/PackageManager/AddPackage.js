import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link, useNavigate } from 'react-router-dom';
import callAPI from '../../API';
import Swal from 'sweetalert2';
import BtnCloseAnimation from '../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { Button } from '@mui/material';
import BtnSave from '../ButtonUI/BtnSave/BtnSave';
import PageHeader from '../../helpers/PageHeader';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';

function AddPackage({ showAddPagkage, setShowAddPagkage }) {
    const initialValues = {
        packageId: 0,
        packageName: '',
        packageInterest: '',
        paymentPeriod: '',
        day: '',
        limitation: '',
        punishDay1: '',
        punishDay2: '',
        liquitationDay: '',
        interestDiaryPenalty: '',
        ransomPenalty: '',
        interestDiaryPenalty: '',
        ransomPenalty: '',
    };

    const onSubmit = (data) => {
        callAPI({
            method: 'post',
            url: `package/createPackage`,
            data: data,
        }).then((res) => {
            Swal.fire({
                text: `Thêm thành công!`,
                icon: 'success',
            }).then((result) => {});
        });
    };
    const renderContent = () => (
        <Formik initialValues={initialValues} /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
            <Form>
                <div className="employeeAdd">
                    <div className="employee_input">
                        <span>
                            Tên gói vay <span>*</span>:
                        </span>
                        <Field id="packageName" name="packageName" />
                        {/* <input type="text" name='fullName' onChange={(e) => handleInput(e)} value={employeeInput.fullName} /> */}
                    </div>

                    <div className="employee_input">
                        <span>
                            Lãi suất <span>*</span>:
                        </span>
                        <Field id="packageInterest" name="packageInterest" />
                        {/* <input type="text" name='userName' onChange={(e) => handleInput(e)} value={employeeInput.userName} /> */}
                    </div>

                    <div className="employee_input">
                        <span>
                            Số ngày vay<span>*</span>:
                        </span>
                        <Field id="day" name="day" />
                        {/* <input type="text" name='email' onChange={(e) => handleInput(e)} value={employeeInput.email} /> */}
                    </div>
                    {/* <ErrorMessage name="email" className="alert alert-danger" component="div" /> */}
                    <div className="employee_input">
                        <span>
                            Kỳ lãi <span>*</span>:
                        </span>
                        <Field id="paymentPeriod" name="paymentPeriod" />
                        {/*  <input type="text" name='address' onChange={(e) => handleInput(e)} value={employeeInput.address} /> */}
                    </div>
                    {/* <ErrorMessage name="address" className="alert alert-danger" component="div" /> */}
                    <div className="employee_input">
                        <span>
                            Số ngày trễ hạn <span>*</span>:
                        </span>
                        <Field id="limitation" name="limitation" />
                        {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                    </div>
                    <div className="employee_input">
                        <span>
                            Ngày phạt đợt 1 <span>*</span>:
                        </span>
                        <Field id="punishDay1" name="punishDay1" />
                        {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                    </div>
                    <div className="employee_input">
                        <span>
                            Ngày phạt đợt 2 <span>*</span>:
                        </span>
                        <Field id="punishDay2" name="punishDay2" />
                        {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                    </div>
                    <div className="employee_input">
                        <span>
                            Phạt chuộc trước hạn (%) <span>*</span>:
                        </span>
                        <Field id="ransomPenalty" name="ransomPenalty" />
                        {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                    </div>
                    <div className="employee_input">
                        <span>
                            Phạt đóng lãi trễ (%)<span>*</span>:
                        </span>
                        <Field id="interestDiaryPenalty" name="interestDiaryPenalty" />
                        {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                    </div>
                    <div className="employee_input">
                        <span>
                            Thanh lý vào ngày<span>*</span>:
                        </span>
                        <Field id="liquitationDay" name="liquitationDay" />
                        {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                    </div>
                    {/* <ErrorMessage name="phone" className="alert alert-danger" component="div" /> */}
                </div>
            </Form>
        </Formik>
    );
    const handleCloseDialog = () => {
        setShowAddPagkage(false);
    };
    return (
        <CustomizeDiaglog
            open={showAddPagkage}
            onClose={handleCloseDialog}
            title="Thêm mới gói vay"
            content={renderContent()}
            action={
                <Button
                    type="submit"
                    onClick={(e) => onSubmit(e)}
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
            maxWidth={DIALOG_SIZE.md}
        />
    );
}

export default AddPackage;
