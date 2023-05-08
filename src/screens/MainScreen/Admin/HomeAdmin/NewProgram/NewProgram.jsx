import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NewProgram.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const NewProgram = ({ show, program, editable, school }) => {
    const [programItem, setProgramItem] = useState(program);

    const handleAddProgram = () => {
        if (programItem.id !== null) {
            axios.put('/admin/program/edit', programItem).then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.responseData);
                    show({});
                }
            });
        } else {
            axios.post('/admin/program/new', programItem).then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.responseData);
                    show({});
                }
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Close
                className={cx('close-main-btn')}
                onClick={() => {
                    show({});
                }}
            />
            <h3 className={cx('main-heading')}>Thông tin chương trình học</h3>
            <div className={cx('program-detail')}>
                <div className={cx('program-form')}>
                    <div className={cx('program-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Chương trình học</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            value={programItem.program_name}
                            readOnly={!editable}
                            onChange={(e) =>
                                setProgramItem((prev) => {
                                    return {
                                        ...prev,
                                        program_name: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div className={cx('program-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Tên trường</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            value={school.school_name}
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')} onClick={handleAddProgram}>
                Lưu
            </button>
        </div>
    );
};

export default NewProgram;
