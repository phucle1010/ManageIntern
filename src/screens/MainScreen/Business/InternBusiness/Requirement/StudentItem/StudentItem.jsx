import React from 'react';
import classNames from 'classnames/bind';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(styles);

const StudentItem = ({ student, order, setChosedStudent }) => {
    const token = JSON.parse(localStorage.getItem('user_token'));
    const jobId = student.job_id;
    const aceptRequest = () => {
        axios
            .post(`/business/job/request/${jobId}`, {studentId: student.id, keyInternJob: student.keyInternJob}, {headers: {
                'Authorization': token,
            }})
            .then((res) => alert('Thanh cong'))
            .catch((err) => console.log(err));
    }
    return (
        <div className={cx('student-item')}>
            <span className={cx('student-info')}>{order + 1}</span>
            <div className={cx('student-info')}>
                <Avatar className={cx('avt')} src={student.image} />
            </div>
            <span className={cx('student-info')}>{student.full_name}</span>
            <span className={cx('student-info')}>UIT</span>
            <span className={cx('student-info')}>{student.job_name}</span>
            <div className={cx('student-info')}>
                <button className={cx('btn-submit')} onClick={() => aceptRequest()}>Xác nhận</button>
            </div>
        </div>
    );
};

export default StudentItem;
