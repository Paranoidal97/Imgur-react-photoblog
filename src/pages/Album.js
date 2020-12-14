import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { isMobile } from 'react-device-detect';


function Album() {

    const params = useParams();
    const [albumsImages, setAlbumsImages] = useState([]);

    //Carrega fotos do album ao abrir a pagina
    useEffect(() => {
        getAlbumsImages();
    }, []);

    //GET ALBUMS IMAGES
    function getAlbumsImages() {
        fetch(`https://api.imgur.com/3/album/${params.id}/images`, {
            method: 'GET',
            headers: {
                Authorization: process.env.REACT_APP_IMGUR_CLIENT_ID,
            }
        })
            .then(res => res.json())
            .then(res => {
                setAlbumsImages(res.data);
            })
    }

    return (

        <div className="card-columns m-3">
            {
                albumsImages.map(albumImage => {
                    return (
                        <div className="card" key={albumImage.id} style={{ border: "0" }}>
                            {isMobile ? <img className="card-img-bottom" src={albumImage.link} alt="Card image cap" />

                                : 
                                    <Zoom overlayBgColorEnd="rgba(255, 255, 255, 0.65)" zoomMargin={50}	>
                                        <img  className="card-img-bottom" src={albumImage.link} alt="alt"/>
                                    </Zoom>}
                        </div>
                    )
                })
            }
        </div >

    )
}

export default Album;