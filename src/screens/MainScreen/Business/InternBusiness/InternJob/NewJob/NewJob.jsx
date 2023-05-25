/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './NewJob.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewJob = ({ openScreen, editable, setNewJob, job, business_id, setSaveClicked }) => {
    const initSkill = {
        id: null,
        skill_name: '',
        job_id: null,
    };
    const [skill, setSkill] = useState(initSkill);
    const [skills, setSkills] = useState([]);

    const skillRef = useRef();

    const handleAddSkill = () => {
        setSkills((prev) => [...prev, skill]);
        setSkill(initSkill);
        skillRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (skills.length > 0) {
            setNewJob((prev) => {
                return {
                    ...prev,
                    skills,
                };
            });
        }
    }, [skills]);

    const postNewJob = async () => {
        await axios
            .post('/business/job/new', {
                ...job,
                business_id,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.responseData);
                    openScreen(false);
                    setSaveClicked(true);
                } else {
                    alert(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    const handlePostNewJob = async () => {
        postNewJob();
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
                                src={
                                    job.image ||
                                    'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                                }
                                alt=""
                            />
                        </div>
                        <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                            Chọn File
                        </label>
                        <input
                            type="file"
                            name="image"
                            id={cx('upload-input')}
                            readOnly={!editable}
                            onChange={(e) => {
                                const getbase64 = (file) => {
                                    let reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                        setNewJob((prev) => {
                                            return {
                                                ...prev,
                                                [e.target.name]: reader.result,
                                            };
                                        });
                                    };
                                };
                                if (e.target.files && e.target.files[0]) {
                                    getbase64(e.target.files[0]);
                                }
                            }}
                        />
                    </React.Fragment>
                    <div className={cx('job-skills')}>
                        <h5 className={cx('input-title')}>Kỹ năng yêu cầu</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="skills"
                            placeholder="Tên kỹ năng"
                            readOnly={!editable}
                            value={skill.skill_name}
                            onChange={(e) =>
                                setSkill((prev) => {
                                    return {
                                        ...prev,
                                        skill_name: e.target.value,
                                    };
                                })
                            }
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <div className={cx('skill-list')}>
                            {skills.length > 0 &&
                                skills.map((skill, index) => (
                                    <div key={index} className={cx('skill-item')}>
                                        <span>{skill.skill_name}</span>
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
                                name="job_name"
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
                                name="job_desc"
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
                                name="requirements"
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
                                name="another_information"
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
                                            [e.target.name]: Number.parseInt(e.target.value),
                                        };
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')} onClick={handlePostNewJob}>
                Lưu
            </button>
        </div>
    );
};

export default NewJob;
