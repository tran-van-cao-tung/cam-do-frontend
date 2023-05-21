import React, { useEffect, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link, useNavigate, useParams } from 'react-router-dom';
import callAPI from '../../API';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import BtnSave from '../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import PageHeader from '../../helpers/PageHeader';

function EditPackage() {
    const [listPackage, setListPackage] = useState([]);
    const history = useNavigate();
    const id = useParams();
    const handleInput = (e) => {
        setListPackage({ ...listPackage, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const slug = id.id;
        callAPI({
            method: 'get',
            url: `package/getPackageById/${slug}`,
        })
            .then((res) => {
                setListPackage(res.data);
            })
            .catch((err) => console.log('Err at API package'));
    }, [id.id]);

    const onSubmit = (e) => {
        e.preventDefault();
        const slug = id.id;
        const data = {
            packageId: slug,
            packageName: listPackage.packageName,
            packageInterest: listPackage.packageInterest,
            day: listPackage.day,
            paymentPeriod: listPackage.paymentPeriod,
            limitation: listPackage.limitation,
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
            Swal.fire({
                text: `Chỉnh sửa thành công!`,
                icon: 'success',
            }).then((result) => {});
        });
    };

    return (
        <div className="box_employee">
            <PageHeader title="Cập nhật gói vay" />

            <div className="wareh-content">
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
                        <div className="employee_input">
                            <span>
                                Số ngày trễ hạn <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="limitation"
                                onChange={(e) => handleInput(e)}
                                value={listPackage.limitation}
                            />
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
                                Phạt chuộc trước hạn <span>*</span>:
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
                        <div className="employee-btn">
                            <div className="employee_btn-group">
                                <Button type="submit">
                                    <BtnSave />
                                </Button>
                                <Button>
                                    <Link to="/package">
                                        <BtnCloseAnimation />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPackage;
