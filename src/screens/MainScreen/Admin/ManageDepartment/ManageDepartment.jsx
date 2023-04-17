import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageDepartment.module.scss';

import SearchBox from '../../../../components/SearchBox';
import NewDepartment from './NewDepartment';
import DepartmentItem from './DepartmentItem/DepartmentItem';

const cx = classNames.bind(styles);

const HEADINGS = ['Mã khoa', 'Tên khoa', 'Trưởng khoa', 'Số giảng viên', 'Số ngành học'];

const departments = [
    {
        id: 1,
        name: 'Công nghệ phần mềm',
        dean: 'Nguyễn Văn Hoàng',
        teachers: 10,
        majors: 5,
    },
    {
        id: 2,
        name: 'Công nghệ thông tin',
        dean: 'Lê Xuân Tài',
        teachers: 6,
        majors: 6,
    },
    {
        id: 3,
        name: 'Công nghệ phần mềm',
        dean: 'Trần Trọng Nhân',
        teachers: 5,
        majors: 8,
    },
    {
        id: 4,
        name: 'Công nghệ phần mềm',
        dean: 'Nguyễn Quang Khoa',
        teachers: 6,
        majors: 7,
    },
];

const Department = () => {
    const [showNewDepartment, setShowNewDepartment] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH KHOA</h3>
            <SearchBox className={cx('search')} />
            <div className={cx('filters')}>
                <select className={cx('filter-select-item')}>
                    <option value="">Năm học</option>
                    <option value="">2020</option>
                    <option value="">2021</option>
                    <option value="">2022</option>
                </select>
                <select className={cx('filter-select-item')}>
                    <option value="">Học kỳ</option>
                    <option value="">Học kỳ 1</option>
                    <option value="">Học kỳ 2</option>
                </select>
                <button className={cx('btn-add')} onClick={() => setShowNewDepartment(true)}>
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
            </div>

            <div className={cx('department-list')}>
                <div className={cx('department-heading-list')}>
                    <ul className={cx('main-heading-list')}>
                        {HEADINGS.map((heading, index) => (
                            <li className={cx('main-heading')} key={index}>
                                {heading}
                            </li>
                        ))}
                    </ul>
                    <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                </div>

                {departments.length > 0 &&
                    departments.map((department) => <DepartmentItem key={department.id} department={department} />)}
            </div>
            {showNewDepartment === true && <NewDepartment close={setShowNewDepartment} editable={true} />}
        </div>
    );
};

export default Department;
