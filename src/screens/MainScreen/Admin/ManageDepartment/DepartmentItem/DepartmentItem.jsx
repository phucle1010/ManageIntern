import React from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentItem.module.scss';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const cx = classNames.bind(styles);

const DepartmentItem = ({ department, setChosedDepartment, setEditable }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.department_name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.full_name || 'Còn trống'}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.majors}</span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility
                        className={cx('view-icon')}
                        onClick={() => {
                            setChosedDepartment(department);
                            setEditable(false);
                        }}
                    />
                </div>
                <div className={cx('option-item')}>
                    <Edit
                        className={cx('edit-icon')}
                        onClick={() => {
                            setChosedDepartment(department);
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

export default DepartmentItem;
