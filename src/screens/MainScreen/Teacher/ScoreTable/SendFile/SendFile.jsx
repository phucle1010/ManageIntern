import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './SendFile.module.scss';
import { AttachFile, Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const SendFile = ({ show, student }) => {
    const [docx, setDocx] = useState(student?.fileScoreRating);
    const handleDocxFileChange = async (event) => {
        const file = event.target.files[0];
        let base64 = await convertBase64(file);
        base64 = base64.replace(/^data:.*;base64,/, '');
        console.log(base64);
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
    const sendFile = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .put('/teacher/student/file', {file: docx, id: student.studentLearnInternId} ,{headers:{'Authorization': token}})
            .then((res) => alert(res.data))
            .catch((err) => alert(err.response.data.details[0].message));
    }
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => show({})} />
            <h3 className={cx('main-heading')}>Thông tin đánh giá môn học</h3>
            <div>
                <h4 className={cx('title-heading')}>
                    Họ và tên: <span>{student.full_name}</span>
                </h4>
            </div>
            <div>
                <h4 className={cx('title-heading')}>
                    Mã số sinh viên: <span>{student.studentId}</span>
                </h4>
            </div>

            <div className={cx('intern-detail')}>
                <input
                    className={cx('intern-input')}
                    type="text"
                    placeholder="Phiếu đánh giá quá trình thực tập"
                    readOnly={true}
                    value={docx?'Đã gữi file đánh giá': 'Chưa gữi file đánh giá'}
                />
                <input type="file" id={cx('gif-input')} accept='.docx' onChange={(e) => handleDocxFileChange(e)} />
                <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                    <AttachFile className={cx('gif-btn')} />
                </label>
            </div>
            <div className={cx('btn-options')}>
                <button className={cx('btn-send')} onClick={() => sendFile()}>Gửi file</button>
            </div>
        </div>
    );
};

export default SendFile;
