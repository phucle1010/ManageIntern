import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Student.module.scss';

import SearchBox from '../../../../../components/SearchBox';
import StudentItem from './StudentItem';
import ViewStudent from './ViewStudent';

const cx = classNames.bind(styles);

const INTERNING_MENU = ['STT', 'Ảnh', 'Họ và tên', 'Vị trí', 'Ngày vào làm', 'Trạng thái', 'Lựa chọn'];

const Student = () => {
    const [chosedStudent, setChosedStudent] = useState({});
    const [students, setStudents] = useState([]);

    const getInterningStudent = async () => {
        await axios
            .get('/business/interns/student')
            .then((res) => res.data.statusCode === 200 && setStudents(res.data.responseData))
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getInterningStudent();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('main-heading')}>Danh sách sinh viên thực tập</h3>
            <SearchBox className={cx('search')} />
            {students.length > 0 ? (
                <div className={cx('menu-list')}>
                    {INTERNING_MENU.map((item, index) => (
                        <h3 key={index} className={cx('menu-item')}>
                            {item}
                        </h3>
                    ))}
                </div>
            ) : (
                <span>Không có sinh viên nào đang thực tập tại công ty</span>
            )}

            <div className={cx('student-list')}>
                {students.length > 0 &&
                    students.map((student, index) => (
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
