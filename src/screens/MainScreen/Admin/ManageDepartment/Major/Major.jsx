/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Major.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const Major = ({ department_id, show, addedMajorList, setAddedMajorList, editable }) => {
    const [majors, setMajors] = useState([]);
    const [majorItem, setMajorItem] = useState('');

    const getMajors = async () => {
        await axios
            .get('/admin/major', {
                params: {
                    department_id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    alert(res.data.responseData);
                } else {
                    setMajors(res.data.responseData);
                }
            });
    };

    useEffect(() => {
        getMajors();
    }, []);

    const handleAddMajorItem = () => {
        if (editable === true) {
            if (majorItem.trim() === '') {
                alert('Vui lòng nhập thông tin ngành học');
            } else {
                setAddedMajorList((prev) => {
                    const newMajorList = [...prev, majorItem];
                    return newMajorList;
                });
                setMajorItem('');
            }
        } else {
            alert('Bạn không thể thêm dữ liệu khi ở chế độ chỉ xem');
        }
    };

    const removeMajor = async (id) => {
        await axios
            .delete('/admin/major/remove', {
                params: {
                    id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    alert('Lỗi: ', res.data.responseData);
                } else {
                    alert(res.data.responseData);
                    getMajors();
                }
            });
    };

    const handeRemoveMajor = (id) => {
        if (editable === true) {
            if (window.confirm('Bạn chắc chắn xóa ngành học này?') === true) {
                removeMajor(id);
            }
        } else {
            alert('Bạn không thể thêm dữ liệu khi ở chế độ chỉ xem');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('toolbar')}>
                <Close className={cx('close-main-btn')} onClick={() => show(false)} />
                <h3 className={cx('main-heading')}>Thông tin ngành</h3>
            </div>
            <div className={cx('major-form')}>
                <div className={cx('major-data-item', 'full-width')}>
                    <h5 className={cx('input-title')}>Tên ngành</h5>
                    <input
                        className={cx('input-item')}
                        type="text"
                        name="major_name"
                        value={majorItem}
                        readOnly={!editable}
                        onChange={(e) => setMajorItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddMajorItem()}
                    />
                </div>
                <button className={cx('add-btn')} onClick={handleAddMajorItem}>
                    Thêm
                </button>
            </div>
            <h3 className={cx('title-heading')}>Danh sách ngành học vừa thêm</h3>
            <div className={cx('major-list', 'add-list')}>
                {addedMajorList.length > 0 &&
                    addedMajorList.map((major, index) => (
                        <div className={cx('major-item')} key={index}>
                            <h4 className={cx('major-name')}>{`${index + 1}. ${major}`}</h4>
                            <button
                                className={cx('remove-btn')}
                                onClick={() =>
                                    setAddedMajorList((prev) => {
                                        const newMajorList = [...prev];
                                        newMajorList.splice(index, 1);
                                        return newMajorList;
                                    })
                                }
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
            </div>
            <h3 className={cx('title-heading')}>Danh sách ngành học hiện tại</h3>
            <div className={cx('major-list', 'current-list')}>
                {majors.length > 0 &&
                    majors.map((major) => (
                        <div className={cx('major-item')} key={major.id}>
                            <h4 className={cx('major-name')}>{major.major_name}</h4>
                            <button className={cx('remove-btn')} onClick={() => handeRemoveMajor(major.id)}>
                                Xóa
                            </button>
                        </div>
                    ))}
            </div>
            <button className={cx('save-btn')} onClick={() => show(false)}>
                Xác nhận
            </button>
        </div>
    );
};

export default Major;
