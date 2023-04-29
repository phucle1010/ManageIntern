import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NewJob.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewJob = ({ openScreen, editable, setNewJob, lastIndex }) => {
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);

    const skillRef = useRef();

    const handleAddSkill = () => {
        setSkills((prev) => [...prev, skill]);
        setSkill('');
        setNewJob((prev) => {
            return {
                ...prev,
                skills: [...skills], /// Lỗi rest vào mảng skill
            };
        });
        skillRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => openScreen(false)} />
            <h3 className={cx('main-heading')}>Thông tin công việc</h3>
            <div className={cx('job-info')}>
                <div className={cx('job-upload')}>
                    <React.Fragment>
                        <h4 className={cx('upload-heading')}>Hình ảnh</h4>
                        <div className={cx('upload-avatar')}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU"
                                alt=""
                            />
                        </div>
                        <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                            Chọn File
                        </label>
                        <input type="file" id={cx('upload-input')} readOnly={!editable} />
                    </React.Fragment>
                    <div className={cx('job-skills')}>
                        <h5 className={cx('input-title')}>Kỹ năng yêu cầu</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            placeholder="Tên kỹ năng"
                            readOnly={!editable}
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <div className={cx('skill-list')}>
                            {skills.length > 0 &&
                                skills.map((skill, index) => (
                                    <div key={index} className={cx('skill-item')}>
                                        <span>{skill}</span>
                                        <Close
                                            className={cx('btn-remove')}
                                            onClick={() =>
                                                setSkills((prev) => {
                                                    const indexOfRemovedSkill = skills.indexOf(skill);
                                                    prev.splice(indexOfRemovedSkill, 1);
                                                    return [...prev];
                                                })
                                            }
                                        />
                                    </div>
                                ))}
                            <div ref={skillRef}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('job-detail')}>
                    <h4 className={cx('detail-heading')}>Chi tiết công việc</h4>
                    <div className={cx('job-form')}>
                        <div className={cx('job-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Tên công việc</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="name"
                                placeholder="Front End Developer Intern"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewJob((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('job-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Mô tả công việc</h5>
                            <textarea
                                className={cx('input-item')}
                                rows={3}
                                name="desc"
                                placeholder="Mô tả công việc"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewJob((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('job-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Yêu cầu công việc</h5>
                            <textarea
                                className={cx('input-item')}
                                rows={3}
                                name="requirement"
                                placeholder="Yêu cầu công việc"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewJob((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('job-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Thông tin khác</h5>
                            <textarea
                                className={cx('input-item')}
                                rows={3}
                                name="anotherInfo"
                                placeholder="Thông tin khác"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewJob((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('job-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Số lượng cần tuyển</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="vacancies"
                                placeholder="1, 2, 3, ..."
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewJob((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                className={cx('save-btn')}
                onClick={() => {
                    setNewJob((prev) => {
                        return {
                            ...prev,
                            id: lastIndex + 1,
                        };
                    });
                    openScreen(false);
                }}
            >
                Lưu
            </button>
        </div>
    );
};

export default NewJob;
