import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  console.log(process.env.IMGUR_CLIENT_ID)
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`https://api.imgur.com/3/account/LukaszBiernat/albums`, {
      method: 'GET',
      headers: {
        Authorization: process.env.REACT_APP_IMGUR_CLIENT_ID
      },
      cache: "no-store"
    })
      .then(res => res.json())
      .then(res => {
        setAlbums(res.data);
      })
  }, []);



  return (

    <div className="App">
      <section className="albums">
        <div className="container albums_list">
          {
            albums.map(album => {
              return (
                <div key={album.id} className="gallery_product">
                  <Link to={{ pathname: '/album/' + album.id }}>
                    <img className="card-img-bottom" src={`https://i.imgur.com/${album.cover}.jpg`} alt="Card image cap" />
                    <div className="overlay">
                      <div className="text">{album.title}</div>
                    </div>
                  </Link>
                </div>

              )
            })
          }
        </div>
      </section>

    </div>
  );
}

export default Home;
