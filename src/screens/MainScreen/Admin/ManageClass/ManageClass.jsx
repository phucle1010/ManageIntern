/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageClass.module.scss';

import SearchBox from '../../../../components/SearchBox';
import ClassItem from './ClassItem';
import NewClass from './NewClass/NewClass';
import axios from 'axios';

const cx = classNames.bind(styles);

const HEADINGS = ['Mã lớp', 'Tên lớp', 'Khoa', 'Sĩ số'];

const ManageClass = () => {
    const [showNewClass, setShowNewClass] = useState(false);
    const [classList, setClassList] = useState([{}]);
    const [academicYear, setAcademicYear] = useState([]);
    const [year, setYear] = useState(null);

    useEffect(() => {
        axios
            .get('/class/academicyear')
            .then((res) => setAcademicYear(res.data))
            .catch((err) => console.log({ err: err }));
    }, []);

    useEffect(() => {
        getClassAll();
    }, []);

    const getClassAll = () => {
        axios
            .get('/class')
            .then((res) => setClassList(res.data))
            .catch((err) => console.log({ err: err }));
    };

    const getClassYear = () => {
        axios
            .get(`/class/year?year='${year}'`)
            .then((res) => setClassList(res.data))
            .catch((err) => console.log({ err: err }));
    };

    useEffect(() => {
        if (year === '') {
            getClassAll();
        } else if (year !== null) {
            getClassYear();
        }
    }, [year]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH LỚP</h3>
            <SearchBox className={cx('search')} />
            <div className={cx('filters')}>
                <select
                    value={year}
                    className={cx('filter-select-item')}
                    onChange={(e) => {
                        setYear(e.target.value);
                    }}
                >
                    <option value=""> Tất cả </option>
                    {academicYear.map((years) => (
                        <option key={years.academic_year} value={years.academic_year} className={cx('option-value')}>
                            {years.academic_year}
                        </option>
                    ))}
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
                {classList.length > 0 &&
                    classList.map((classInfo) => <ClassItem key={classInfo.id} classInfo={classInfo} />)}
            </div>
            {showNewClass === true && <NewClass close={setShowNewClass} editable={true} classInfo={null} />}
        </div>
    );
};

export default ManageClass;
