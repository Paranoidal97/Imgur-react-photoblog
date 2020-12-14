import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


import delateicon from '../images/delate.png'
import publicicon from '../images/public.png'

function EditAlbum() {

  const params = useParams();
  const [image, setImage] = useState([]);
  const [albumsImages, setAlbumsImages] = useState([]);
  const [downloadingImagesPopUp, setdownloadingImagesPopUp] = useState(false);


  //Carrega fotos do album ao abrir a pagina
  useEffect(() => {
    getAlbumsImages();
  }, []);

  //GET ALBUMS IMAGES
  function getAlbumsImages() {
    fetch(`https://api.imgur.com/3/album/${params.id}/images`, {
      method: 'GET',
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
      },
      cache: "no-store"
    })
      .then(res => res.json())
      .then(res => {
        setAlbumsImages(res.data);
      })
  }

  //Seleciona o arquivo de imagem
  function handleSelect(e) {
    const FileListLength = e.target.files.length
    let i
    const imagesArray = []
    for (i = 0; i < FileListLength; i++) {
      imagesArray.push(e.target.files[i]);
    }
    console.log(imagesArray)
    setImage(imagesArray)
  }


  //POST IMAGE UPLOAD
  function handleUpload(e) {
    e.preventDefault();
    const FD = new FormData();
    for (let i = 0; i < image.length; i++) {
      FD.append('image', image[i]);

      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        body: FD,
        headers: {
          Authorization: process.env.REACT_APP_BEARER,
        }
      })
        .then(res => res.json())
        .then(res => handleSuccess(res))
    }
    setImage([])
    DownloadingPopUp()
  }

  //Recebe o upload e pega o id da imagem
  function handleSuccess(res) {
    const { data: { id } } = res
    addImage(id)
  }

  //POST ADD IMAGES TO ALBUM
  function addImage(id) {
    const FD = new FormData();
    FD.append('ids[]', id);

    fetch(`https://api.imgur.com/3/album/${params.id}/add`, {
      method: 'POST',
      body: FD,
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
      }
    }).then(() => getAlbumsImages());
  }

  //SET ALBUM COVER 
  function setCover(albumImageId) {

    fetch(`https://api.imgur.com/3/album/${params.id}?cover=${albumImageId}`, {
      method: 'PUT',
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
      }
    }).then(() => getAlbumsImages());
  }

  //DELETE IMAGE
  function deleteImage(albumImageId) {
    fetch(`https://api.imgur.com/3/image/${albumImageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
      }
    }).then(() => getAlbumsImages());
  }

  function DownloadingPopUp() {
    let download = image.length > 0;
    console.log(download)
    switch(download){
      case true :
        setdownloadingImagesPopUp(true)
		  setTimeout(() => {
			setdownloadingImagesPopUp(false)
    }, 5000);
      case false :
        return null
    } 
	}





  return (
    <div id="albumContainer">
      <div className="text-center">
        <div className="box">
          <input type="file" className="inputfile inputfile-4 d-none" id="file-5" onChange={handleSelect} multiple />
          <label htmlFor="file-5"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure>
            {image.length < 1 ? <span>Choose a file&hellip;</span> : <div>
              <span>Selected files</span>
              <div>
                {image.map(image => {
                  return (
                    <div>
                      <span className="m-1">{image.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>}
          </label>
        </div>
        <button className="btn btn-secondary m-1" onClick={handleUpload}>Upload</button>
        <Link to={{ pathname: '/admin' }}>
          <button className="btn btn-secondary m-1">Voltar</button>
        </Link>
        <h3 className="m-3">Aktualne zdjęcia </h3>
      </div>


      <div className="card-columns m-3">
        {
          albumsImages.map(albumImage => {
            return (
              <div className="card" key={albumImage.id}>
                  <img
                    className="card-img-bottom"
                    alt="img-albums"
                    src={albumImage.link}>
                  </img>
                   <div className="admin_icon_container">
                  <img src={publicicon} alt="opublikuj" data-tip data-for="Public" className="admin_icon" onClick={() => setCover( albumImage.id)} />
                  <img src={delateicon} alt="usuń zdjęcie" className="admin_icon" data-tip data-for="Delate" onClick={() => deleteImage(albumImage.id)} />
                <ReactTooltip id='Delate' type='error'>
                  <span>Naciśnij żeby usunąć zdjęcie</span>
                </ReactTooltip>
                <ReactTooltip id='Public' type='error'>
                  <span>Naciśnij żeby zmienić zdjęcie główne</span>
                </ReactTooltip>
                </div>
               
              </div>
            )
          })
        }
      </div>

      {downloadingImagesPopUp ? <div className="safety_Delate_Container">
				<div id="safetyDelete" className="text-center">
					<h3>Photos should be added to the page in a few minutes.</h3>
				</div>
			</div> : null}

    </div>
  )
}


export default EditAlbum;