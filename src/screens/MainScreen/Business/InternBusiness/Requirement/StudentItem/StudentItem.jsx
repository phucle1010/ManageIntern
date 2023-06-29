import React from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles);

const StudentItem = ({ student, order, loadData, isSubmitable, getSubmitHistory }) => {
    const token = JSON.parse(localStorage.getItem('user_token'));
    const jobId = student.job_id;

    const formattedDate = () => {
        const date = new Date(Date.parse(student.submit_date));
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()}`;
    };

    const aceptRequest = async () => {
        await axios
            .post(
                `/business/job/request/${jobId}`,
                { studentId: student.id, keyInternJob: student.keyInternJob },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            )
            .then((res) => {
                alert('Xác nhận yêu cầu thành công');
                loadData();
                getSubmitHistory();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('student-item')}>
            <span className={cx('student-info')}>{order + 1}</span>
            <div className={cx('student-info')}>
                <Avatar className={cx('avt')} src={student.image} />
            </div>
            <span className={cx('student-info')}>{student.full_name}</span>
            <span className={cx('student-info')}>{student.school_name}</span>
            <span className={cx('student-info')}>{student.job_name}</span>
            <div className={cx('student-info')}>
                {isSubmitable ? (
                    <button className={cx('btn-submit')} onClick={() => aceptRequest()}>
                        Xác nhận
                    </button>
                ) : (
                    <span>{formattedDate()}</span>
                )}
            </div>
        </div>
    );
};

export default StudentItem;
