import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageTeacher.module.scss';

import SearchBox from '../../../../components/SearchBox';
import TeacherItem from './TeacherItem';
import NewTeacher from './NewTeacher';

const cx = classNames.bind(styles);

const teachers = [
    {
        id: 1,
        name: 'Đặng Minh Quang',
        birth: '14-05-1992',
        gender: 'Nam',
        phone: '0368341595',
        class: 'KTPM2020',
        department: 'Mạng máy tính',
        email: 'quangdm@gm.uit.edu.vn',
        status: 'Hết dạy',
        img: 'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png',
    },
    {
        id: 2,
        name: 'Nguyễn Xuân Hoàng',
        birth: '14-05-1994',
        gender: 'Nam',
        phone: '0368341595',
        class: 'KTPM2020',
        department: 'Công nghệ phần mềm',
        email: 'hoangnx@gm.uit.edu.vn',
        status: 'Đang dạy',
        img: 'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png',
    },
];

const HEADINGS = ['Ảnh', 'Mã giảng viên', 'Họ và tên', 'Khoa', 'Tình trạng'];

const ManageTeacher = () => {
    const [showNewTeacher, setShowNewTeacher] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH GIẢNG VIÊN</h3>
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
                <button className={cx('btn-add')} onClick={() => setShowNewTeacher(true)}>
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
            </div>

            <div className={cx('teacher-list')}>
                <div className={cx('teacher-heading-list')}>
                    <ul className={cx('main-heading-list')}>
                        {HEADINGS.map((heading, index) => (
                            <li className={cx('main-heading')} key={index}>
                                {heading}
                            </li>
                        ))}
                    </ul>
                    <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                </div>

                {teachers.length > 0 && teachers.map((teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </div>
            {showNewTeacher === true && <NewTeacher close={setShowNewTeacher} editable={true} />}
        </div>
    );
};

export default ManageTeacher;
