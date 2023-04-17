import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageClass.module.scss';

import SearchBox from '../../../../components/SearchBox';
import ClassItem from './ClassItem';
import NewClass from './NewClass/NewClass';

const cx = classNames.bind(styles);

const HEADINGS = ['Mã lớp', 'Tên lớp', 'Khoa', 'Sĩ số'];

const classes = [
    {
        id: 1,
        name: 'KTPM2020',
        department: 'Công nghệ phần mềm',
        quantity: 108,
    },
    {
        id: 2,
        name: 'KTMT2021',
        department: 'Kỹ thuật máy tính',
        quantity: 100,
    },
    {
        id: 3,
        name: 'KHMT2019',
        department: 'Khoa học máy tính',
        quantity: 105,
    },
];

const ManageClass = () => {
    const [showNewClass, setShowNewClass] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH LỚP</h3>
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
                <button className={cx('btn-add')} onClick={() => setShowNewClass(true)}>
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
            </div>

            <div className={cx('class-list')}>
                <div className={cx('class-heading-list')}>
                    <ul className={cx('main-heading-list')}>
                        {HEADINGS.map((heading, index) => (
                            <li className={cx('main-heading')} key={index}>
                                {heading}
                            </li>
                        ))}
                    </ul>
                    <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                </div>

                {classes.length > 0 &&
                    classes.map((classInfo) => <ClassItem key={classInfo.id} classInfo={classInfo} />)}
            </div>
            {showNewClass === true && <NewClass close={setShowNewClass} editable={true} />}
        </div>
    );
};

export default ManageClass;
