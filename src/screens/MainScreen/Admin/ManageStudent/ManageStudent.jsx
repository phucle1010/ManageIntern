import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageStudent.module.scss';

import SearchBox from '../../../../components/SearchBox';
import StudentItem from './StudentItem';
import NewStudent from './NewStudent';

const cx = classNames.bind(styles);
const students = [
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
    {
        id: 18521790,
        name: 'Trần Nhật Minh',
        birth: '09-11-2000',
        gender: 'Nam',
        phone: '0368341595',
        class: 'KTPM2020',
        department: 'Hệ thống thông tin',
        status: 'Tốt nghiệp',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
    },
    {
        id: 21522790,
        name: 'Lê Hoài Nam',
        birth: '14-05-2003',
        gender: 'Nam',
        phone: '0368341595',
        class: 'KTPM2020',
        department: 'Mạng máy tính',
        status: 'Nghỉ học',
        img: 'https://animalslook.com/media/very-cute-and-funny-dog-selfies/very-cute-and-funny-dog-selfies-1.jpg?ezimgfmt=rs:700x933/rscb1/ngcb1/notWebP',
    },
];

const HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Tình trạng'];

const ManageStudent = () => {
    const [showNewStudent, setShowNewStudent] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH SINH VIÊN</h3>
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
                <button className={cx('btn-add')} onClick={() => setShowNewStudent(true)}>
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
            </div>

            <div className={cx('student-list')}>
                <div className={cx('student-heading-list')}>
                    <ul className={cx('main-heading-list')}>
                        {HEADINGS.map((heading, index) => (
                            <li className={cx('main-heading')} key={index}>
                                {heading}
                            </li>
                        ))}
                    </ul>
                    <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                </div>

                {students.length > 0 && students.map((student) => <StudentItem key={student.id} student={student} />)}
            </div>
            {showNewStudent === true && <NewStudent close={setShowNewStudent} editable={true} />}
        </div>
    );
};

export default ManageStudent;
