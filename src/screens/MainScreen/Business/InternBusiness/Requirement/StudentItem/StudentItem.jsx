import React from 'react';
import classNames from 'classnames/bind';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles);

const StudentItem = ({ student, order, setChosedStudent }) => {
    return (
        <div className={cx('student-item')}>
            <span className={cx('student-info')}>{order + 1}</span>
            <div className={cx('student-info')}>
                <Avatar className={cx('avt')} src={student.img} />
            </div>
            <span className={cx('student-info')}>{student.name}</span>
            <span className={cx('student-info')}>{student.school}</span>
            <span className={cx('student-info')}>{student.position}</span>
            <div className={cx('student-info')}>
                <button className={cx('btn-submit')}>Xác nhận</button>
            </div>
        </div>
    );
};

export default StudentItem;
