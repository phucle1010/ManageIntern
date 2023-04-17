import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChooseSubject.module.scss';

const cx = classNames.bind(styles);

const MENU_HEADINGS = ['STT', 'Tên môn học', 'Số tín chỉ', 'Số buổi học', 'GVHD', 'Khoa', 'Lựa chọn'];

const SUBJECTS = [
    {
        id: 1,
        name: 'Thực tập tốt nghiệp',
        creditUnits: 3,
        sessions: 16,
        teacher: 'Nguyễn Anh Dũng',
        department: 'Công nghệ phần mềm',
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        creditUnits: 3,
        sessions: 16,
        teacher: 'Đào Xuân Anh',
        department: 'Công nghệ phần mềm',
    },
    {
        id: 3,
        name: 'Thực tập tốt nghiệp',
        creditUnits: 3,
        sessions: 16,
        teacher: 'Nguyễn Bá Dương',
        department: 'Công nghệ phần mềm',
    },
    {
        id: 4,
        name: 'Thực tập tốt nghiệp',
        creditUnits: 3,
        sessions: 16,
        teacher: 'Trần Hoàng Yến',
        department: 'Công nghệ phần mềm',
    },
];

const Subject = ({ subject, index, chooseSubject }) => {
    return (
        <div className={cx('subject-info')}>
            <span className={cx('subject-info-item')}>{index}</span>
            <span className={cx('subject-info-item')}>{subject.name}</span>
            <span className={cx('subject-info-item')}>{subject.creditUnits}</span>
            <span className={cx('subject-info-item')}>{subject.sessions}</span>
            <span className={cx('subject-info-item')}>{subject.teacher}</span>
            <span className={cx('subject-info-item')}>{subject.department}</span>
            <button className={cx('subject-info-item', 'btn-choose')} onClick={() => chooseSubject(subject)}>
                Chọn
            </button>
        </div>
    );
};

const ChooseSubject = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('main-heading')}>Danh sách các môn hiện có</h4>
            <div className={cx('menu-heading')}>
                {MENU_HEADINGS.map((menuItem) => (
                    <h5 className={cx('menu-item')} key={menuItem}>
                        {menuItem}
                    </h5>
                ))}
            </div>
            <div className={cx('subject-list')}>
                {SUBJECTS.map((subject, index) => (
                    <Subject
                        key={subject.index}
                        index={index + 1}
                        subject={subject}
                        chooseSubject={setSelectedSubject}
                    />
                ))}
            </div>
            {selectedSubject !== null && (
                <React.Fragment>
                    <h4 className={cx('main-heading')}>Môn học đã chọn</h4>
                    <div className={cx('chosed-subject')}>
                        <div className={cx('chosed-subject-item')}>
                            <h4>Tên môn học: </h4>
                            <span>{selectedSubject.name}</span>
                        </div>
                        <div className={cx('chosed-subject-item')}>
                            <h4>Số tín chỉ: </h4>
                            <span>{selectedSubject.creditUnits}</span>
                        </div>
                        <div className={cx('chosed-subject-item')}>
                            <h4>Số buổi học: </h4>
                            <span>{selectedSubject.sessions}</span>
                        </div>
                        <div className={cx('chosed-subject-item')}>
                            <h4>Giảng viên hướng dẫn: </h4>
                            <span>{selectedSubject.teacher}</span>
                        </div>
                        <div className={cx('chosed-subject-item')}>
                            <h4>Khoa: </h4>
                            <span>{selectedSubject.department}</span>
                        </div>
                        <div className={cx('options-btn')}>
                            <button className={cx('btn-regist')} onClick={() => {}}>
                                Đăng ký
                            </button>
                            <button className={cx('btn-cancel')} onClick={() => setSelectedSubject(null)}>
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default ChooseSubject;
