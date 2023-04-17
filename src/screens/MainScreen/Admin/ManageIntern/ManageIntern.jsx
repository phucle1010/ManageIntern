import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageIntern.module.scss';

import SearchBox from '../../../../components/SearchBox';
import InternItem from './InternItem';

import ManageJob from './ManageJob';
import OpenSubject from './OpenSubject';
import InternMark from './InternMark';

const cx = classNames.bind(styles);

const WAITING_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Vị trí thực tập'];
const INTERNED_HEADINGS = [...WAITING_HEADINGS, 'Điểm tổng kết'];
const INTERNING_HEADINGS = [...WAITING_HEADINGS, 'Thời gian thực tập'];

const WAITING_LIST = [
    {
        id: 1,
        name: 'Nguyễn Hoàng Nam',
        position: 'Project Manager',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        internTime: '3 tháng',
    },
    {
        id: 2,
        name: 'Trần Nhật Tân',
        position: 'Tester',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        internTime: '4 tháng',
    },
];
const INTERNED_LIST = [
    {
        id: 1,
        name: 'Đỗ Nguyên Triết',
        position: 'Tester',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        score: 9,
        internTime: '3 tháng',
    },
    {
        id: 2,
        name: 'Đặng Hồng Phong',
        position: 'Design',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        score: 8,
        internTime: '4 tháng',
    },
];
const INTERNING_LIST = [
    {
        id: 1,
        name: 'Lê Hoài Thương',
        position: 'Back End Dev',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        internTime: '3 tháng',
    },
    {
        id: 2,
        name: 'Nguyễn Minh Trí',
        position: 'Front End Dev',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        internTime: '4 tháng',
    },
];

const Filter = () => {
    return (
        <div className={cx('filters')}>
            <div className={cx('main-filter')}>
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
            <SearchBox />
        </div>
    );
};

const ManageIntern = () => {
    const [manageJobScreen, setManageJobScreen] = useState(false);
    const [openSubjectScreen, setOpenSubjectScreen] = useState(false);
    const [internMarkScreen, setInternMarkScreen] = useState(false);
    // const [internInfoScreen, setInternInfoScreen] = useState(false);
    // const [internMarkScreen, setInternMarkScreen] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>THỰC TẬP</h3>
            <div className={cx('options')}>
                <button className={cx('btn-add')} onClick={() => setOpenSubjectScreen(true)}>
                    Mở môn học
                </button>
                <button className={cx('btn-add', 'btn-export')} onClick={() => setManageJobScreen(true)}>
                    Quản lý công việc
                </button>
            </div>
            <div className={cx('intern-category')}>
                <h4 className={cx('list-heading')}>Danh sách đang chờ xử lý yêu cầu</h4>
                <Filter />
                <div className={cx('intern-list')}>
                    <div className={cx('intern-heading-list')}>
                        <ul className={cx('main-heading-list')}>
                            {WAITING_HEADINGS.map((heading, index) => (
                                <li className={cx('main-heading')} key={index}>
                                    {heading}
                                </li>
                            ))}
                        </ul>
                        <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                    </div>
                    {WAITING_LIST.length > 0 &&
                        WAITING_LIST.map((student) => (
                            <InternItem
                                key={student.id}
                                student={student}
                                interned={false}
                                waiting={true}
                                // setInternInfoScreen={setInternInfoScreen}
                                // setInternMarkScreen={() => {}}
                            />
                        ))}
                </div>
            </div>
            <div className={cx('intern-category')}>
                <h4 className={cx('list-heading')}>Danh sách sinh viên đang thực tập</h4>
                <Filter />
                <div className={cx('intern-list')}>
                    <div className={cx('intern-heading-list')}>
                        <ul className={cx('main-heading-list')}>
                            {INTERNING_HEADINGS.map((heading, index) => (
                                <li className={cx('main-heading')} key={index}>
                                    {heading}
                                </li>
                            ))}
                        </ul>
                        {/* <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5> */}
                    </div>
                    {INTERNING_LIST.length > 0 &&
                        INTERNING_LIST.map((student) => (
                            <InternItem
                                key={student.id}
                                student={student}
                                interned={false}
                                waiting={false}
                                // setInternInfoScreen={() => {}}
                                // setInternMarkScreen={setInternMarkScreen}
                            />
                        ))}
                </div>
                <button className={cx('btn-mark')} onClick={() => setInternMarkScreen(true)}>
                    Xem hội đồng chấm thi
                </button>
            </div>
            <div className={cx('intern-category')}>
                <h4 className={cx('list-heading')}>Danh sách sinh viên đã hoàn thành thực tập</h4>
                <Filter />
                <div className={cx('intern-list')}>
                    <div className={cx('intern-heading-list')}>
                        <ul className={cx('main-heading-list', 'interned')}>
                            {INTERNED_HEADINGS.map((heading, index) => (
                                <li className={cx('main-heading')} key={index}>
                                    {heading}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {INTERNED_LIST.length > 0 &&
                        INTERNED_LIST.map((student) => (
                            <InternItem key={student.id} student={student} interned={true} waiting={false} />
                        ))}
                </div>
            </div>

            {manageJobScreen && <ManageJob close={setManageJobScreen} />}
            {openSubjectScreen && <OpenSubject close={setOpenSubjectScreen} />}
            {internMarkScreen && <InternMark close={setInternMarkScreen} />}
        </div>
    );
};

export default ManageIntern;
