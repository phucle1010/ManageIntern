import React from 'react';
import classNames from 'classnames/bind';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';
import { Edit } from '@mui/icons-material';

const cx = classNames.bind(styles);

const StudentItem = ({ student, order, setChosedStudent }) => {
    return (
        <div className={cx('student-item')}>
            <span className={cx('student-info')}>{order + 1}</span>
            <div className={cx('student-info')}>
                <Avatar className={cx('avt')} src={student.image} />
            </div>
            <span className={cx('student-info')}>{student.full_name}</span>
            <span className={cx('student-info')}>{student.job_name}</span>
            <span className={cx('student-info')}>{new Date(student.start_date).toISOString().slice(0, 10)}</span>
            <div className={cx('student-info')}>
                <span
                    className={cx('status', {
                        interning: /*student.internStatus ===*/ 'interning',
                    })}
                >
                    {/*student.internStatus === 'interning' &&*/ 'Đang thực tập'}
                </span>
            </div>
            <div className={cx('student-info')}>
                <Edit className={cx('btn-option')} onClick={() => setChosedStudent(student)} />
            </div>
        </div>
    );
};

export default StudentItem;
