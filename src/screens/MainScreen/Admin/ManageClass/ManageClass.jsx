/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageClass.module.scss';

import SearchBox from '../../../../components/SearchBox';
import ClassItem from './ClassItem';
import NewClass from './NewClass/NewClass';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const cx = classNames.bind(styles);

const HEADINGS = ['Mã lớp', 'Tên lớp', 'Khoa', 'Sĩ số'];
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ManageClass = () => {
    const [showNewClass, setShowNewClass] = useState(false);
    const [classList, setClassList] = useState([{}]);
    const [academicYear, setAcademicYear] = useState([]);
    const [year, setYear] = useState(null);
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        axios
            .get('/class/academicyear')
            .then((res) => setAcademicYear(res.data))
            .catch((err) => console.log({ err: err }));
    }, []);

    useEffect(() => {
        getAllClasses();
        getTeachers();
    }, []);

    const getAllClasses = () => {
        axios
            .get('/class')
            .then((res) => setClassList(res.data))
            .catch((err) => console.log({ err: err }));
    };

    const getTeachers = async () => {
        await axios
            .get('/admin/teacher')
            .then((res) => setTeacherList(res.data.responseData))
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
            getAllClasses();
        } else if (year !== null) {
            getClassYear();
        }
    }, [year]);

    const generatePDF = () => {
        const styleItem = {
            marginTop: 10,
            marginBottom: 10,
            fontSize: 10,
        };

        const newData = classList.map((classItem) => {
            return [
                {
                    text: classItem.id,
                    ...styleItem,
                },
                {
                    text: classItem.class_name,
                    ...styleItem,
                },
                {
                    text: classItem.department_name,
                    ...styleItem,
                },
                {
                    text: classItem.students,
                    ...styleItem,
                },
                {
                    text:
                        teacherList.filter((teacher) => classItem.head_teacher === teacher.id)[0]?.full_name ||
                        'Chưa có',
                    ...styleItem,
                    bold: true,
                },
            ];
        });

        const headers = ['Mã lớp', 'Tên lớp', 'Khoa', 'Sĩ số', 'Giảng viên chủ nhiệm'];

        const mergedBody = () => {
            const initBody = [];
            initBody.push(headers.map((heading) => ({ text: heading, bold: true })));
            newData.filter((data) => initBody.push(data));
            return initBody;
        };

        const docDefinition = {
            content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: [50, 90, 'auto', 70, '*'],
                        body: mergedBody(),
                    },
                },
            ],
        };

        pdfMake.createPdf(docDefinition).download('Danh sách lớp');
    };

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
                    {academicYear.map((year) => (
                        <option key={year.id} value={year.current_year} className={cx('option-value')}>
                            {year.current_year}
                        </option>
                    ))}
                </select>
                <button className={cx('btn-add')} onClick={() => setShowNewClass(true)}>
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')} onClick={generatePDF}>
                    Xuất File
                </button>
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
