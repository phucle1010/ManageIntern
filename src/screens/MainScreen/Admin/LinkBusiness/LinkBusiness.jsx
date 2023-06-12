import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LinkBusiness.module.scss';
import axios from 'axios';

import SearchBox from '../../../../components/SearchBox';
import BusinessItem from './BusinessItem';
import DetailBusiness from './DetailBusiness';
import { Add } from '@mui/icons-material';
import NewBusiness from './NewBusiness';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

const LinkBusiness = () => {
    const [chosedBusiness, setChosedBusiness] = useState({});
    const [openNewBusinessScreen, setOpenNewBusinessScreen] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getAllBusinesses = async () => {
        await axios
            .get(`/user/business/all`)
            .then((res) => {
                setBusinesses(
                    res.data.map((business) => ({
                        ...business,
                        id: business.id,
                        company_name: business.company_name,
                        image: business.image,
                        phone: business.phone,
                        email: business.email,
                        address: business.address,
                        establish_date: business.establish_date,
                        sector: business.industry_sector,
                        representator: business.representator,
                        short_desc: business.short_desc,
                    })),
                );
                setLoaded(true);
            })
            .catch((err) => {
                console.log({ err: err });
            });
    };

    useEffect(() => {
        getAllBusinesses();
    }, [chosedBusiness, openNewBusinessScreen]);

    console.log(businesses);
    // useEffect(() => {
    //     if (newBusiness.id !== 0) {
    //         setBusinesses((prev) => [...prev, newBusiness]);
    //     }
    // }, [newBusiness]);

    return (
        <React.Fragment>
            {loaded ? (
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
                            setBusinesses={setBusinesses}
                            editable={true}
                            businesses={businesses}
                        />
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default LinkBusiness;
