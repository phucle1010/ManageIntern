import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentItem.module.scss';
import { Delete, Edit, Visibility } from '@mui/icons-material';

import NewDepartment from '../NewDepartment';

const cx = classNames.bind(styles);

const DepartmentItem = ({ department }) => {
    const [viewDepartment, setViewDepartment] = useState(false);
    const [editDepartment, setEditDepartment] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.dean}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.teachers}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.majors}</span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility className={cx('view-icon')} onClick={() => setViewDepartment(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Edit className={cx('edit-icon')} onClick={() => setEditDepartment(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Delete className={cx('delete-icon')} />
                </div>
            </div>
            {viewDepartment && <NewDepartment close={setViewDepartment} editable={false} />}
            {editDepartment && <NewDepartment close={setEditDepartment} editable={true} />}
        </div>
    );
};

export default DepartmentItem;
