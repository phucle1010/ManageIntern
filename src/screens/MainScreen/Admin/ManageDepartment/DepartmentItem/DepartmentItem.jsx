import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './DepartmentItem.module.scss';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const cx = classNames.bind(styles);

const DepartmentItem = ({ department, setChosedDepartment, setEditable }) => {
    const [departmentHead, setDepartmentHead] = useState(null);

    useEffect(() => {
        axios
            .get('/admin/department/head', {
                params: {
                    department_head: department.department_head === null ? -1 : department.department_head,
                },
            })
            .then((res) => setDepartmentHead(res.data.responseData))
            .catch((err) => console.lg(err));
    }, [department.department_head]);

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
                    <span className={cx('title-heading')}>{departmentHead?.full_name}</span>
                </div>
                {/* <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{department.majors}</span>
                </div> */}
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
