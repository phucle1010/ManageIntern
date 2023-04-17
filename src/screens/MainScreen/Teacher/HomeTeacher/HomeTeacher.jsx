import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeTeacher.module.scss';
import { Avatar } from '@mui/material';

import SearchBox from '../../../../components/SearchBox';
import Follow from './Follow';

const cx = classNames.bind(styles);

const STUDENTS = [
    {
        id: 20521764,
        name: 'Lê Thế Phúc',
        birth: '10-10-2002',
        gender: 'Nam',
        phone: '0368341595',
        class: 'KTPM2020',
        department: 'Công nghệ phần mềm',
        status: 'Đang học',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
    },
    {
        id: 20521790,
        name: 'Nguyễn Nhật Hoàng Quân',
        birth: '10-10-2002',
        gender: 'Nam',
        phone: '0368341595',
        class: 'KTPM2020',
        department: 'Công nghệ phần mềm',
        status: 'Đang học',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
    },
];

const MENU_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Lựa chọn'];

const HomeTeacher = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TRANG CHỦ</h3>
            <SearchBox className={cx('search')} />
            <h4 className={cx('main-heading')}>Danh sách sinh viên được phân công</h4>
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
            </div>
            <div className={cx('student-container')}>
                <div className={cx('menu-list')}>
                    {MENU_HEADINGS.map((menu, index) => (
                        <span className={cx('menu-item')} key={index}>
                            {menu}
                        </span>
                    ))}
                </div>
                <div className={cx('student-list')}>
                    {STUDENTS.map((student) => (
                        <div key={student.id} className={cx('student-item')}>
                            <div className={cx('student-item-detail')}>
                                <Avatar src={student.img} />
                            </div>
                            <div className={cx('student-item-detail')}>
                                <span>{student.id}</span>
                            </div>
                            <div className={cx('student-item-detail')}>
                                <span>{student.name}</span>
                            </div>
                            <div className={cx('student-item-detail')}>
                                <span>{student.class}</span>
                            </div>
                            <div className={cx('student-item-detail')}>
                                <button className={cx('btn-follow')} onClick={() => setSelectedStudent(student)}>
                                    Theo dõi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedStudent !== null && <Follow openScreen={setSelectedStudent} />}
        </div>
    );
};

export default HomeTeacher;
