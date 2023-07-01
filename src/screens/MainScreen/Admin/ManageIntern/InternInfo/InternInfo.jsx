import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InternInfo.module.scss';
import { Close } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(styles);

const InternInfo = ({ show, student }) => {
    const [docx, setDocx] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleDocxFileChange = async (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        let base64 = await convertBase64(file);
        base64 = base64.replace(/^data:.*;base64,/, '');
        setDocx(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleConfirmInternJob = () => {
        axios
            .put(`/admin/student/request_job/${student.studentId}`, { docx, key: student.key })
            .then((res) => alert('Xác nhận thành công'))
            .then(() => show(false))
            .catch((err) => {
                alert(err.response.data.detail);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => show(false)} />
            <h3 className={cx('title-heading')}>THÔNG TIN THỰC TẬP</h3>
            <div className={cx('list-info')}>
                <h4 className={cx('list-heading')}>Thông tin sinh viên</h4>
                <div className={cx('list-detail', 'student')}>
                    <div className={cx('list-detail-item')}>
                        <Avatar src={student.studentImage} />
                    </div>
                    <span className={cx('list-detail-item')}>{student.studentName}</span>
                    <span className={cx('list-detail-item')}>{student.position}</span>
                    <div className={cx('list-detail-item')}>
                        <div className={cx('status')}>Đang chờ</div>
                    </div>
                </div>
            </div>
            <div className={cx('list-info')}>
                <h4 className={cx('list-heading')}>Thông tin giảng viên hướng dẫn</h4>
                <div className={cx('list-detail', 'student')}>
                    <div className={cx('list-detail-item')}>
                        <Avatar src={student.teacherImage} />
                    </div>
                    <span className={cx('list-detail-item')}>{student.teacherName}</span>
                    <span className={cx('list-detail-item')}>{student.departmentName}</span>
                    <span className={cx('list-detail-item')}>{student.teacherEmail}</span>
                </div>
            </div>
            <div className={cx('intern-info')}>
                <h4 className={cx('list-heading')}>Mẫu thông tin</h4>
                <div className={cx('intern-detail')}>
                    <input
                        className={cx('intern-input')}
                        type="text"
                        placeholder="File đính kèm thông tin giới thiệu thực tập"
                        value={fileName}
                        readOnly={true}
                    />
                    <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                        <span className={cx('gif-btn')}>Đính kèm</span>
                    </label>
                    <input type="file" id={cx('gif-input')} onChange={(e) => handleDocxFileChange(e)} />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('btn-submit')} onClick={() => handleConfirmInternJob()}>
                    Xác nhận
                </button>
                <button className={cx('btn-submit', 'btn-cancel')} onClick={() => {}}>
                    Hủy yêu cầu
                </button>
            </div>
        </div>
    );
};

export default InternInfo;
