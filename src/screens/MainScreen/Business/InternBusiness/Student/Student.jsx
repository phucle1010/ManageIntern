import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Student.module.scss';

import SearchBox from '../../../../../components/SearchBox';
import StudentItem from './StudentItem';
import ViewStudent from './ViewStudent';
import axios from 'axios';

const cx = classNames.bind(styles);

const INTERNING_MENU = ['STT', 'Ảnh', 'Họ và tên', 'Vị trí', 'Ngày vào làm', 'Trạng thái', 'Lựa chọn'];

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
        department: 'Công nghệ phần mềm',
        status: 'Đang học',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
        position: 'Back End Developer',
        entryDay: '03-02-2023',
        internStatus: 'interning',
    },
];

const Student = () => {
    const [chosedStudent, setChosedStudent] = useState({});
    const [students, setStudents] = useState([]);
    const [searchIntern, setSearchIntern] = useState(null);
    const loadData = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get(`/business/interns`, {params: {searchIntern}, headers: {'Authorization': token}})
            .then((res) => {
                setStudents(res.data);
                console.log(students);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => loadData(),[searchIntern]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('main-heading')}>Danh sách sinh viên thực tập</h3>
            <SearchBox className={cx('search')} search={searchIntern} setSearch={setSearchIntern}/>
            <div className={cx('menu-list')}>
                {INTERNING_MENU.map((item, index) => (
                    <h3 key={index} className={cx('menu-item')}>
                        {item}
                    </h3>
                ))}
            </div>
            <div className={cx('student-list')}>
                {students.map((student, index) => (
                    <StudentItem key={index} student={student} order={index} setChosedStudent={setChosedStudent} />
                ))}
            </div>
            {Object.keys(chosedStudent).length > 0 && (
                <ViewStudent student={chosedStudent} setChosedStudent={setChosedStudent} />
            )}
        </div>
    );
};

export default Student;
