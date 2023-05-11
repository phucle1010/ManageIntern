import React, { useState } from 'react';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import classNames from 'classnames/bind';
import styles from './ClassItem.module.scss';
import axios from 'axios';

import NewClass from '../NewClass';

const cx = classNames.bind(styles);

const ClassItem = ({ classInfo }) => {
    const [viewClass, setViewClass] = useState(false);
    const [editClass, setEditClass] = useState(false);

    const deleteClass = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
            axios
                .delete(`/class/delete?class_id='${classInfo.id}'`)
                .then((res) => {
                    if(res.data.statusCode === 200){
                        alert(res.data.responseData);
                    }
                })
                .catch((err) => { 
                    console.log({err: err});
                    alert("Xóa thất bại!");
                });
        } else {
            return;
        }
    }
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.class_name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.department_name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{classInfo.students}</span>
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
                    <Delete className={cx('delete-icon')} onClick={() => deleteClass()} />
                </div>
            </div>
            {viewClass && <NewClass close={setViewClass} editable={false} classInfo={classInfo}/>}
            {editClass && <NewClass close={setEditClass} editable={true} classInfo={classInfo}/>}
        </div>
    );
};

export default ClassItem;
