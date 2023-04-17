import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherItem.module.scss';
import { Avatar } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

import NewTeacher from '../NewTeacher';

const cx = classNames.bind(styles);

const TeacherItem = ({ teacher }) => {
    const [viewTeacher, setViewTeacher] = useState(false);
    const [editTeacher, setEditTeacher] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <Avatar src={teacher.img} />
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{teacher.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{teacher.name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{teacher.department}</span>
                </div>
                <div className={cx('data-item')}>
                    <span
                        className={cx('title-heading', {
                            'stop-status': teacher.status === 'Hết dạy',
                            'teaching-status': teacher.status === 'Đang dạy',
                        })}
                    >
                        {teacher.status}
                    </span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility className={cx('view-icon')} onClick={() => setViewTeacher(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Edit className={cx('edit-icon')} onClick={() => setEditTeacher(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Delete className={cx('delete-icon')} />
                </div>
            </div>
            {viewTeacher && <NewTeacher close={setViewTeacher} editable={false} />}
            {editTeacher && <NewTeacher close={setEditTeacher} editable={true} />}
        </div>
    );
};

export default TeacherItem;
