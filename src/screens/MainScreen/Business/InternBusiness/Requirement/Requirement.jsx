import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Requirement.module.scss';

import SearchBox from '../../../../../components/SearchBox';
import StudentItem from './StudentItem';
import ViewStudent from '../Student/ViewStudent';

const cx = classNames.bind(styles);

const STUDENTS = [
    {
        id: 20521764,
        name: 'Lê Thế Phúc',
        birth: '10-10-2002',
        gender: 'Nam',
        phone: '0368341595',
        email: '20521764@gm.uit.edu.vn',
        address: 'Hồ Chí Minh',
        class: 'KTPM2020',
        school: 'Đại học Công nghệ thông tin',
        department: 'Công nghệ phần mềm',
        status: 'Đang học',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        position: 'Front End Developer',
        entryDay: '01-02-2023',
        internStatus: 'interning',
    },
    {
        id: 20521790,
        name: 'Nguyễn Nhật Hoàng Quân',
        birth: '10-10-2002',
        gender: 'Nam',
        phone: '0368341595',
        email: '20521764@gm.uit.edu.vn',
        address: 'Hồ Chí Minh',
        class: 'KTPM2020',
        school: 'Đại học Công nghệ thông tin',
        department: 'Công nghệ phần mềm',
        status: 'Đang học',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
        position: 'Back End Developer',
        entryDay: '03-02-2023',
        internStatus: 'interning',
    },
];

const INTERNING_MENU = ['STT', 'Ảnh', 'Họ và tên', 'Trường đại học', 'Vị trí ứng tuyển', 'Lựa chọn'];

const Requirement = () => {
    const [chosedStudent, setChosedStudent] = useState({});

    return (
        <div className={cx('wrapper')}>
            <div className={cx('requirement-category')}>
                <h3 className={cx('main-heading')}>Danh sách chờ xác nhận</h3>
                <SearchBox className={cx('search')} />
                <div className={cx('menu-list')}>
                    {INTERNING_MENU.map((item, index) => (
                        <h3 key={index} className={cx('menu-item')}>
                            {item}
                        </h3>
                    ))}
                </div>
                <div className={cx('pending-list')}>
                    {STUDENTS.map((student, index) => (
                        <StudentItem key={index} student={student} order={index} setChosedStudent={setChosedStudent} />
                    ))}
                </div>
            </div>
            <div className={cx('requirement-category')}>
                <h3 className={cx('main-heading')}>Lịch sử xác nhận</h3>
            </div>
            {Object.keys(chosedStudent).length > 0 && (
                <ViewStudent student={chosedStudent} setChosedStudent={setChosedStudent} />
            )}
        </div>
    );
};

export default Requirement;
