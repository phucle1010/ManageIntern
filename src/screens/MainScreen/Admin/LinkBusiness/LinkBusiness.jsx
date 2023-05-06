import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LinkBusiness.module.scss';

import SearchBox from '../../../../components/SearchBox';
import BusinessItem from './BusinessItem';
import DetailBusiness from './DetailBusiness';
import { Add } from '@mui/icons-material';
import NewBusiness from './NewBusiness';
import axios from 'axios';

const cx = classNames.bind(styles);

const BUSINESSES = [
    {
        id: 1,
        name: 'HPT',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        phone: '0368341595',
        email: 'lethephuc2002@gmail.com',
        address: 'Tòa nhà 06 Bis Land, Quận 1, Hồ Chí Minh',
        establishDate: '01-01-2016',
        sector: 'Công nghệ',
        representator: 'Lê Thế Phúc',
        desc: 'Công ty công nghệ sản xuất phần mềm',
    },
];

const LinkBusiness = () => {
    const [chosedBusiness, setChosedBusiness] = useState({});
    const [openNewBusinessScreen, setOpenNewBusinessScreen] = useState(false);
    const [newBusiness, setNewBusiness] = useState({
        id: 0,
        name: '',
        img: '',
        phone: '',
        email: '',
        address: '',
        establishDate: '',
        sector: '',
        representator: '',
        desc: '',
    });
    const [businesses, setBusinesses] = useState([]);

    /*useEffect(() => {
        setBusinesses(BUSINESSES);
    }, []);*/

    useEffect(() => {
        axios
            .get(`/user/business`)
            .then((res) => {
                setBusinesses(
                    res.data.map(business => ({
                        ...business,
                        id: business.id,
                        name: business.username,
                        img: business.image,
                        phone: business.phone,
                        email: business.email,
                        address: business.address,
                        establishDate: business.establish_date,
                        sector: business.industry_sector,
                        representator: business.full_name,
                        desc: business.short_desc,
                    }))
                );
                console.log(res.data);
            })
            .catch((err) => { console.log({err: err})});
    }, []);

    useEffect(() => {
        if (newBusiness.id !== 0) {
            setBusinesses((prev) => [...prev, newBusiness]);
        }
    }, [newBusiness]);

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title-heading')}>DOANH NGHIỆP</h4>
            <SearchBox className={cx('search')} />
            <div className={cx('business-list')}>
                {businesses.length > 0 &&
                    businesses.map((job, index) => (
                        <BusinessItem key={index} business={job} setChosedBusiness={setChosedBusiness} />
                    ))}
                <div className={cx('btn-add')} onClick={() => setOpenNewBusinessScreen(true)}>
                    <Add className={cx('add-icon')} />
                </div>
            </div>
            {Object.keys(chosedBusiness).length > 0 && (
                <DetailBusiness business={chosedBusiness} openScreen={setChosedBusiness} />
            )}
            {openNewBusinessScreen === true && (
                <NewBusiness
                    openScreen={setOpenNewBusinessScreen}
                    setNewBusiness={setNewBusiness}
                    editable={true}
                    lastIndex={businesses[businesses.length - 1].id || 1}
                    newBusiness={newBusiness}
                />
            )}
        </div>
    );
};

export default LinkBusiness;
