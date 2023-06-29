import React from 'react';
import classNames from 'classnames/bind';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';
import { Edit } from '@mui/icons-material';

const cx = classNames.bind(styles);

const StudentItem = ({ student, order, setChosedStudent }) => {
    const formattedDate = () => {
        const date = new Date(Date.parse(student.start_date));
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()}`;
    };

    return (
        <div className={cx('student-item')}>
            <span className={cx('student-info')}>{order + 1}</span>
            <div className={cx('student-info')}>
                <Avatar className={cx('avt')} src={student.image} />
            </div>
            <span className={cx('student-info')}>{student.full_name}</span>
            <span className={cx('student-info')}>{student.job_name}</span>
            <span className={cx('student-info')}>{formattedDate()}</span>
            <div className={cx('student-info')}>
                <span
                    className={cx('status', {
                        interning: student.is_interning.data[0] === 1,
                    })}
                >
                    {student.is_interning.data[0] === 1 && 'Đang thực tập'}
                </span>
            </div>
            <div className={cx('student-info')}>
                <Edit className={cx('btn-option')} onClick={() => setChosedStudent(student)} />
            </div>
        </div>
    );
};

export default StudentItem;
