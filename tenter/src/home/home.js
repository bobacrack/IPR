import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './IMG_0180.jpg'
import re from './logo.svg'
import { StarOutlined, CloseOutlined, HeartOutlined, UndoOutlined, RiseOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

const TinderCard = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://example.com/images'); // Anpassen der URL entsprechend deiner Backend-Implementierung
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleSwipeLeft = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handleSwipeRight = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <div className="tinder-card">
            <div className="image-container">
                {images.length > 0 && (
                    //<img src={images[currentImageIndex]} alt="Tinder Card" />
                    <img src={logo} alt="Tinder Card" style={{ width: '200px', height: 'auto' }} />
                )}

            </div>
            <img className="immage" src={re} alt="Tinder Card" />

            <div className="button-container">
                <Space direction="vertical">
                    <Space wrap>
                        <Tooltip title="search">
                            <Button type="primary" style={{ height: 50, width: 50 }} shape="circle" icon={<UndoOutlined />} />
                        </Tooltip>
                        <Tooltip title="search">
                            <Button type="primary" style={{ height: 50, width: 50 }} shape="circle" icon={<CloseOutlined />} />
                        </Tooltip>
                        <Tooltip title="search">
                            <Button type="primary" style={{ height: 50, width: 50 }} shape="circle" icon={<StarOutlined />} />
                        </Tooltip>
                        <Tooltip title="search">
                            <Button type="primary" style={{ height: 50, width: 50 }} shape="circle" icon={< HeartOutlined />} />
                        </Tooltip>
                        <Tooltip title="search">
                            <Button type="primary" style={{ height: 50, width: 50 }} shape="circle" icon={<RiseOutlined />} />
                        </Tooltip>
                    </Space>
                </Space>
            </div>
        </div>
    );
};

export default TinderCard;