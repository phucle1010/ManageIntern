import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherItem.module.scss';
import { Avatar } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const cx = classNames.bind(styles);

const TeacherItem = ({ teacher, setChosedTeacher, setEditable, departments }) => {
    const getDepartmentName = (id) => {
        if (departments.length > 0) {
            const resultDepartment = departments.filter((department) => department.id === id)[0];
            return resultDepartment.department_name;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <Avatar src={teacher.image} />
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{teacher.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{teacher.full_name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{getDepartmentName(teacher.department_id)}</span>
                </div>
                <div className={cx('data-item')}>
                    <span
                        className={cx('title-heading', {
                            'stop-status': teacher.current_status.data[0] === 0,
                            'teaching-status': teacher.current_status.data[0] === 1,
                        })}
                    >
                        {teacher.current_status.data[0] === 1 ? 'Đang dạy' : 'Hết dạy'}
                    </span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility
                        className={cx('view-icon')}
                        onClick={() => {
                            setChosedTeacher(teacher);
                            setEditable(false);
                        }}
                    />
                </div>
                <div className={cx('option-item')}>
                    <Edit
                        className={cx('edit-icon')}
                        onClick={() => {
                            setChosedTeacher(teacher);
                            setEditable(true);
                        }}
                    />
                </div>
                <div className={cx('option-item')}>
                    <Delete className={cx('delete-icon')} />
                </div>
            </div>
        </div>
    );
};

export default TeacherItem;
