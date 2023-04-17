/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeStudent.module.scss';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import SearchBox from '../../../../components/SearchBox';
import Job from '../../../../components/Job';
import JobDesc from '../../../JobDesc';

const cx = classNames.bind(styles);

const JOBS = [
    {
        id: 1,
        name: 'Front End Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        skills: [
            {
                id: 1,
                name: 'HTML',
            },
            {
                id: 2,
                name: 'CSS',
            },
            {
                id: 3,
                name: 'Javascript',
            },
        ],
        desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
        requirement:
            'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
        anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
        isSaved: false,
        isTip: true,
        isTrending: false,
    },
    {
        id: 2,
        name: 'Front End Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
        skills: [
            {
                id: 1,
                name: 'HTML',
            },
            {
                id: 2,
                name: 'CSS',
            },
            {
                id: 3,
                name: 'Javascript',
            },
        ],
        desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
        requirement:
            'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
        anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
        isSaved: false,
        isTip: false,
        isTrending: true,
    },
    {
        id: 3,
        name: 'Back End Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
        skills: [
            {
                id: 1,
                name: 'Java',
            },
            {
                id: 2,
                name: 'String Boot',
            },
        ],
        desc: 'Cần tìm kiếm lập trình viên Back End đủ tiêu chuẩn tham gia vào nhóm. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: Network, Finance, ERP, DAP, Machine Learning/Data Learning.',
        requirement:
            'Có ít nhất 1 năm kinh nghiệm về JAVA. Có kinh nghiệm phát triển ứng dụng web. Có kinh nghiệm lập trình Java.',
        anotherInfo:
            'Thời gian làm việc từ 9h00 đến 18h00 (nghỉ trưa 1 tiếng) và được nghỉ Thứ 7 - Chủ nhật. Lương tháng 13 và thưởng theo hiệu quả kinh doanh.',
        isSaved: true,
        isTip: false,
        isTrending: true,
    },
    {
        id: 4,
        name: 'Front End Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        skills: [
            {
                id: 1,
                name: 'HTML',
            },
            {
                id: 2,
                name: 'CSS',
            },
            {
                id: 3,
                name: 'Javascript',
            },
        ],
        desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
        requirement:
            'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
        anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
        isSaved: false,
        isTip: true,
        isTrending: false,
    },
    {
        id: 5,
        name: 'iOS Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        skills: [
            {
                id: 1,
                name: 'Dart',
            },
            {
                id: 2,
                name: 'Flutter',
            },
            {
                id: 3,
                name: 'Kotlin',
            },
        ],
        desc: 'Cung cấp tài liệu thiết kế kiến trúc hệ thống, API, tài liệu kiến phần mềm cho các thành viên khác trong nhóm, khách hàng hoặc đối tác. Làm việc với khách hàng và đối tác, bao gồm các nhà phân tích kinh doanh, người quản lý dự án và nhà phát triển.',
        requirement:
            'Từ 1 năm kinh nghiệm lập trình iOS sử dụng thành thạo ngôn ngữ Kotlin. Hiểu biết sâu về thread, multi-threading và quản lý Memory. HIểu biết sâu về protocol, delegate và higher order functions, GCD.',
        anotherInfo:
            'Thời gian làm việc 5 ngày/tuần từ 8h00 đến 17h30 (nghỉ Thứ 7 và Chủ nhật). Môi trường làm việc chuyên nghiệp, năng động, công bằng.',
        isSaved: false,
        isTip: false,
        isTrending: true,
    },
    {
        id: 6,
        name: 'React Native Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        skills: [
            {
                id: 1,
                name: 'Javascript',
            },
            {
                id: 2,
                name: 'React Native',
            },
        ],
        desc: 'Tham gia phát triển các dự án và xây dựng sản phẩm ứng dụng di động trên nền tảng React Native cho cả 2 hệ điều hành iOS, Android. Tham gia phát triển, bảo trì, triển khai phần mềm trong lĩnh vực Telecom, AI, chính phủ điện tử, fintech...',
        requirement:
            'Thành tạo lập trình ứng dụng di động đa nền tảng trên React Native Framework. Nắm rõ các mô hình Redux, React Container/Component, Class Component, Functional.',
        anotherInfo:
            'Thời gian làm việc từ 8h30 đến 17h30 (Nghỉ Thứ 7 - Chủ nhật). Hỗ trợ ăn trưa, gửi xe, xăng xe, điện thoại,...',
        isSaved: true,
        isTrending: false,
    },
    {
        id: 7,
        name: 'Java Developer',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        skills: [
            {
                id: 1,
                name: 'Java',
            },
            {
                id: 2,
                name: 'String Boot',
            },
        ],
        desc: 'Cần tìm kiếm lập trình viên Back End đủ tiêu chuẩn tham gia vào nhóm. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: Network, Finance, ERP, DAP, Machine Learning/Data Learning.',
        requirement:
            'Có ít nhất 1 năm kinh nghiệm về JAVA. Có kinh nghiệm phát triển ứng dụng web. Có kinh nghiệm lập trình Java.',
        anotherInfo:
            'Thời gian làm việc từ 9h00 đến 18h00 (nghỉ trưa 1 tiếng) và được nghỉ Thứ 7 - Chủ nhật. Lương tháng 13 và thưởng theo hiệu quả kinh doanh.',
        isSaved: false,
        isTip: false,
        isTrending: true,
    },
    {
        id: 8,
        name: 'Java Developer',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        skills: [
            {
                id: 1,
                name: 'Java',
            },
            {
                id: 2,
                name: 'String Boot',
            },
        ],
        desc: 'Cần tìm kiếm lập trình viên Back End đủ tiêu chuẩn tham gia vào nhóm. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: Network, Finance, ERP, DAP, Machine Learning/Data Learning.',
        requirement:
            'Có ít nhất 1 năm kinh nghiệm về JAVA. Có kinh nghiệm phát triển ứng dụng web. Có kinh nghiệm lập trình Java.',
        anotherInfo:
            'Thời gian làm việc từ 9h00 đến 18h00 (nghỉ trưa 1 tiếng) và được nghỉ Thứ 7 - Chủ nhật. Lương tháng 13 và thưởng theo hiệu quả kinh doanh.',
        isSaved: false,
        isTip: false,
        isTrending: true,
    },
    {
        id: 9,
        name: 'Java Developer',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        skills: [
            {
                id: 1,
                name: 'Java',
            },
            {
                id: 2,
                name: 'String Boot',
            },
        ],
        desc: 'Cần tìm kiếm lập trình viên Back End đủ tiêu chuẩn tham gia vào nhóm. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: Network, Finance, ERP, DAP, Machine Learning/Data Learning.',
        requirement:
            'Có ít nhất 1 năm kinh nghiệm về JAVA. Có kinh nghiệm phát triển ứng dụng web. Có kinh nghiệm lập trình Java.',
        anotherInfo:
            'Thời gian làm việc từ 9h00 đến 18h00 (nghỉ trưa 1 tiếng) và được nghỉ Thứ 7 - Chủ nhật. Lương tháng 13 và thưởng theo hiệu quả kinh doanh.',
        isSaved: false,
        isTip: false,
        isTrending: false,
    },
];

const MAXIMUM_JOBS_EACH_PAGE = 5;

const HomeStudent = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [numberPages, setNumberPages] = useState(0);
    const [chosedJob, setChosedJob] = useState({});

    const getNumberOfPages = useCallback((list) => {
        if (list.length % MAXIMUM_JOBS_EACH_PAGE === 0) {
            return list.length / MAXIMUM_JOBS_EACH_PAGE;
        }
        return Math.ceil(list.length / MAXIMUM_JOBS_EACH_PAGE);
    });

    useEffect(() => {
        if (JOBS.length > 0) {
            setNumberPages(getNumberOfPages(JOBS));
        }
    }, [JOBS]);

    const isDisplayedItemOnPage = (index) =>
        index <= (currentPage + 1) * MAXIMUM_JOBS_EACH_PAGE - 1 && index >= currentPage * MAXIMUM_JOBS_EACH_PAGE;

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TRANG CHỦ</h3>
            <SearchBox className={cx('search')} />
            <div className={cx('job-category')}>
                <h4 className={cx('list-heading')}>Danh sách công việc</h4>
                <div className={cx('job-list')}>
                    {JOBS.length > 0 &&
                        JOBS.map(
                            (job, index) =>
                                isDisplayedItemOnPage(index) === true && (
                                    <Job job={job} key={job.id} setChosedJob={setChosedJob} isLibrary={false} />
                                ),
                        )}
                </div>
                <div className={cx('pagination')}>
                    <ArrowLeft
                        className={cx('btn-navigate')}
                        onClick={() => currentPage >= 1 && setCurrentPage((prev) => prev - 1)}
                    />
                    <span className={cx('current-page')}>{currentPage + 1}</span>
                    <ArrowRight
                        className={cx('btn-navigate')}
                        onClick={() => currentPage <= numberPages - 2 && setCurrentPage((prev) => prev + 1)}
                    />
                </div>
            </div>
            <div className={cx('job-category')}>
                <h4 className={cx('list-heading')}>Gợi ý công việc</h4>
                <div className={cx('job-list', 'horizontal-display')}>
                    {JOBS.length > 0 &&
                        JOBS.map(
                            (job) =>
                                job.isTip === true && (
                                    <Job job={job} key={job.id} setChosedJob={setChosedJob} isLibrary={false} />
                                ),
                        )}
                </div>
            </div>
            <div className={cx('job-category')}>
                <h4 className={cx('list-heading')}>Công việc xu hướng</h4>
                <div className={cx('job-list', 'horizontal-display')}>
                    {JOBS.length > 0 &&
                        JOBS.map(
                            (job) =>
                                job.isTrending === true && (
                                    <Job job={job} key={job.id} setChosedJob={setChosedJob} isLibrary={false} />
                                ),
                        )}
                </div>
            </div>
            {Object.keys(chosedJob).length > 0 && <JobDesc closeScreen={setChosedJob} job={chosedJob} />}
        </div>
    );
};

export default HomeStudent;
