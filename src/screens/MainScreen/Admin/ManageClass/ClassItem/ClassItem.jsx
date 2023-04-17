import React, { useState } from 'react';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import classNames from 'classnames/bind';
import styles from './ClassItem.module.scss';

import NewClass from '../NewClass';

const cx = classNames.bind(styles);

const ClassItem = ({ classInfo }) => {
    const [viewClass, setViewClass] = useState(false);
    const [editClass, setEditClass] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.department}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.quantity}</span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility className={cx('view-icon')} onClick={() => setViewClass(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Edit className={cx('edit-icon')} onClick={() => setEditClass(true)} />
                </div>
                <div className={cx('option-item')}>
                    <Delete className={cx('delete-icon')} />
                </div>
            </div>
            {viewClass && <NewClass close={setViewClass} editable={false} />}
            {editClass && <NewClass close={setEditClass} editable={true} />}
        </div>
    );
};

export default ClassItem;
