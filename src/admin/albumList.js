import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';


import cover from '../images/404.jpg'
import delateicon from '../images/delate.png'
import publicicon from '../images/public.png'
import create from '../images/create.jpg'


function AlbumList() {

    const [albums, setAlbums] = useState([]);
    const [albumName, setAlbumName] = useState([]);
    const [safetyDelete, setSafetyDelete] = useState(false);
    const [addAlbum, setAddAlbum] = useState(false);

    const [deleteConfirmationID, setDeleteConfirmationID] = useState([]);
    const [publicPopUp, setPublicPopUp] = useState(false)


    useEffect(() => {
        getAlbums();
    }, []);

    //GET ALBUMS
    function getAlbums() {
        fetch(`https://api.imgur.com/3/account/LukaszBiernat/albums`, {
            method: 'GET',
            headers: {
                Authorization: process.env.REACT_APP_BEARER,
            },
            cache: "no-store"
        })
            .then((res) => res.json())
            .then((response) => {
                setAlbums(response.data)
            });
    }

    //SET PUBLIC
    function privacy(albumId) {


        fetch(`https://api.imgur.com/3/album/${albumId}?privacy=public`, {
            method: 'PUT',
            headers: {
                Authorization: process.env.REACT_APP_BEARER,
            },
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            PublicPopUp()

    }

    //SET ALBUM NAME
    function handleChange(event) {
        setAlbumName(event.target.value)
    }

    function checkIfAlbumNameIsNotEmpty() {
        if (document.querySelector('#inputElement').value === '') {
            alert('Album musi posiadać nazwę');
            return false;
        }
        else {
            createAlbum();
        }
    }

    //POST ALBUM CREATION
    function createAlbum(title) {

        const FD = new FormData();
        FD.append('title', albumName);

        fetch('https://api.imgur.com/3/album', {
            method: 'POST',
            body: FD,
            headers: {
                Authorization: process.env.REACT_APP_BEARER,
            },
        }).then(response => response.text())
            .then(() => {
                getAlbums()
                setAddAlbum(false)
            });
    }


    //DELETE ALBUM
    function deleteAlbum(albumId) {

        fetch(`https://api.imgur.com/3/album/${albumId}`, {
            method: 'DELETE',
            headers: {
                Authorization: process.env.REACT_APP_BEARER,
            }
        }).then(() => {
            getAlbums();
            setSafetyDelete(false);
        })
    }

    function PublicPopUp() {
        setPublicPopUp(true)
        setTimeout(() => {
            setPublicPopUp(false)
        }, 4000);

    }



    return (
        <div id="container" className="text-center">
            <section id="buttons" >

                {
                    safetyDelete ?
                        <div className="safety_Delate_Container">
                            <div id="safetyDelete" className="text-center">
                                <h2>Czy na pewno chcesz usunąć album?</h2>
                                <button className="btn btn-danger m-2" onClick={() => deleteAlbum(deleteConfirmationID)}>Usuń</button>
                                <button className="btn btn-primary m-2" onClick={() => setSafetyDelete(false)}>Anuluj</button>
                            </div>
                        </div>
                        : null
                }
                {
                    addAlbum ?
                        <div className="safety_Delate_Container">
                            <div id="safetyDelete" className="text-center">
                                <h2>Dodaj nowy album </h2>
                                <input id="inputElement" type="text" onChange={handleChange} />
                                <button className="btn btn-success m-2" onClick={checkIfAlbumNameIsNotEmpty}>Dodaj</button>
                                <button className="btn btn-primary m-2" onClick={() => setAddAlbum(false)}>Anuluj</button>
                            </div>
                        </div>
                        : null
                }
                {publicPopUp ? <div className="safety_Delate_Container">
                    <div id="safetyDelete" className="text-center">
                        <h3>Album should be visible to the page in a few minutes.</h3>
                    </div>
                </div> : null}
            </section>
            <h2>Publiczne oraz ukryte albumy</h2>
            <section className="albums">
                <div className="container albums_list">
                    <div className="gallery_product" data-tip data-for='Info' onClick={() => { setAddAlbum(true) }}>
                        <div>
                            <img className="card-img-bottom admin_gallery" src={create} alt="Create new album" />
                        </div>
                        <ReactTooltip id='Info' type='info'>
                            <span>Naciśnij żeby dodać nowy album</span>
                        </ReactTooltip>
                    </div>
                    {
                        albums.map(album => {
                            return (
                                <div key={album.id} className="gallery_product ">
                                    <Link to={{ pathname: '/albumedit/' + album.id }}>
                                        <div>
                                            <img className="card-img-bottom admin_gallery" src={album.cover === null ? cover : `https://i.imgur.com/${album.cover}.jpg` || `https://i.imgur.com/${album.cover}.png`} alt="Card image cap" />
                                        </div>
                                    </Link>
                                    <div className="admin_icon_container">
                                        <img src={publicicon} alt="opublikuj" data-tip data-for="Public" className="admin_icon" onClick={() => privacy(album.id)} />
                                        <img src={delateicon} alt="usuń" data-tip data-for="DelateAlbum" className="admin_icon" onClick={() => { setDeleteConfirmationID(album.id); setSafetyDelete(true); }} />
                                    </div>
                                    <ReactTooltip id='DelateAlbum' type='error'>
                                        <span>Naciśnij żeby usunąć album</span>
                                    </ReactTooltip>
                                    <ReactTooltip id='Public' type='error'>
                                        <span>Naciśnij żeby opublikować album</span>
                                    </ReactTooltip>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default AlbumList;