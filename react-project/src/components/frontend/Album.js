import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';
import './css/album.css';
import axios from 'axios';
import config from '../../config';

const Gallery = () => {
    const [petList, setPetList] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');

    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        if (category === 'all') {
            $('.image').show(400);
        } else {
            $('.image')
                .not(`.${category}`)
                .hide(200);
            $(`.image.${category}`).show(400);
        }
    };
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/getAlbumPet`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setPetList(res.data.pets);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);
    const renderImages = () =>
        petList.map((pet, index) => (
            <a
                key={index}
                href={`${config.BASE_URL}/${pet.image_pet}`}
                className={`image ${pet.category.slug}`}
            >
                <span className="username">{pet.user.name}</span>
                <img src={`${config.BASE_URL}/${pet.image_pet}`} alt="" />
                <span className='emotion'>{pet.emotion}</span>
            </a>
        ));

    return (
        <div className="gallery">
            <ul className="controls">
                <li
                    className={`buttons ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('all')}
                    data-filter="all"
                >
                    Tất cả
                </li>
                <li
                    className={`buttons ${activeCategory === 'cho' ? 'active' : ''
                        }`}
                    onClick={() => handleCategoryChange('cho')}
                    data-filter="cho"
                >
                    Chó
                </li>
                <li
                    className={`buttons ${activeCategory === 'meo' ? 'active' : ''
                        }`}
                    onClick={() => handleCategoryChange('meo')}
                    data-filter="meo"
                >
                    Mèo
                </li>
                <li
                    className={`buttons ${activeCategory === 'chim' ? 'active' : ''
                        }`}
                    onClick={() => handleCategoryChange('chim')}
                    data-filter="chim"
                >
                    Chim
                </li>
                <li>
                    <Link to={"/addPet"} className='btn btn-primary'>
                        Thêm thú cưng
                    </Link>
                </li>
            </ul>

            <div className="image-container">{renderImages()}</div>
        </div>
    )
}

function Album() {
    return (
        <div className='main'>
            <Gallery />
        </div>
    )
}

export default Album;
