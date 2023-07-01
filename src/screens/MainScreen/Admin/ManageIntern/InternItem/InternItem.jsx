import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InternItem.module.scss';
import { Visibility } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import DetailSignUpInfo from '../DetailSignUpInfo';
import FileSaver from 'file-saver';
import { Buffer } from 'buffer';

const cx = classNames.bind(styles);

const InternItem = ({ student, interned, waiting, loadStudentSignUpIntern }) => {
    const [detailSignUpInternScreen, setDetailSignUpInternScreen] = useState(false);
    const files = [student.report_file, student.result_business_file, student.result_teacher_file];

    useEffect(() => {
        loadStudentSignUpIntern();
    }, [detailSignUpInternScreen]);

    const handleDownloadFilesStudent = () => {
        if (!files.every((file) => file)) {
            console.log(files[0]);
            alert('Sinh viên chưa gửi files báo cáo');
        } else {
            files.forEach((file, index) => {
                const docxData = Buffer.from(Buffer.from(file).toString(), 'base64');
                const blob = new Blob([docxData], {
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                });
                FileSaver.saveAs(blob, `File báo cáo ${index + 1} - ${student.studentName}.docx`);
            });
        }
    };

    const formattedDate = () => {
        const date = new Date(Date.parse(student.start_date));
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()}`;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item', { interned })}>
                <div className={cx('data-item', { interned })}>
                    <Avatar src={student.studentImage} />
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.id}</span>
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.studentName}</span>
                </div>
                {interned === false && waiting === false ? (
                    <React.Fragment>
                        <div className={cx('data-item', { interned })}>
                            <span className={cx('title-heading')}>{student.job_name}</span>
                        </div>
                        <div className={cx('data-item', { interned })}>
                            {/* <span className={cx('title-heading')}>{formattedDate()}</span> */}
                            {/* <button className={cx('btn-submit')} onClick={() => {}}>
                                Theo dõi báo cáo
                            </button> */}
                            <button
                                className={cx('btn-submit')}
                                onClick={() => {
                                    handleDownloadFilesStudent();
                                }}
                            >
                                {files[0] ? 'Tải file báo cáo' : 'Chưa nộp file báo cáo'}
                            </button>
                        </div>
                    </React.Fragment>
                ) : (
                    interned === false && (
                        <div className={cx('data-item', { interned })}>
                            <span className={cx('title-heading')}>{student.teacherName}</span>
                        </div>
                    )
                )}

                {interned === true && waiting === false && (
                    <React.Fragment>
                        <div className={cx('data-item', { interned })}>
                            <span className={cx('title-heading')}>{student.job_name}</span>
                        </div>
                        <div className={cx('data-item', { interned })}>
                            <span className={cx('title-heading')}>{student.score}</span>
                        </div>
                    </React.Fragment>
                )}
                {/* {!interned && !waiting && (
                    <div className={cx('data-item', { interned })}>
                        <span className={cx('title-heading')}>{student.internTime}</span>
                    </div>
                )} */}
            </div>
            {interned === false && waiting === true && (
                <div className={cx('options')}>
                    <div className={cx('option-item')}>
                        <Visibility className={cx('view-icon')} onClick={() => setDetailSignUpInternScreen(true)} />
                    </div>
                </div>
            )}

            {detailSignUpInternScreen === true && (
                <DetailSignUpInfo student={student} show={setDetailSignUpInternScreen} />
            )}
        </div>
    );
};

export default InternItem;
