import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import NewStudent from '../NewStudent/NewStudent';

const cx = classNames.bind(styles);

const StudentItem = ({ student }) => {
    const [viewStudent, setViewStudent] = useState(false);
    const [editStudent, setEditStudent] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <Avatar src={student.img} />
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{student.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{student.name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{student.class}</span>
                </div>
                <div className={cx('data-item')}>
                    <span
                        className={cx('title-heading', {
                            'graduted-status': student.status === 'Tốt nghiệp',
                            'studying-status': student.status === 'Đang học',
                            'stop-status': student.status === 'Nghỉ học',
                        })}
                    >
                        {student.status}
                    </span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility className={cx('view-icon')} onClick={() => setViewStudent(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Edit className={cx('edit-icon')} onClick={() => setEditStudent(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Delete className={cx('delete-icon')} />
                </div>
            </div>
            {viewStudent && <NewStudent close={setViewStudent} editable={false} />}
            {editStudent && <NewStudent close={setEditStudent} editable={true} />}
        </div>
    );
};

export default StudentItem;
