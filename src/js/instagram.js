import React, { useEffect, useState } from 'react';
import './instagram-hydrate';
import '../styles/insta-grid.css';

const Instafeed = require('instafeed.js');

export default function InstaGrid() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchedPhotos = [];
    fetch(
      'https://ig.instant-tokens.com/users/266200f4-332b-409b-af26-4394cde12d12/instagram/17841408246201392/token?userSecret=kapxse7u5kudii3teo1kd',
    )
      .then(res => res.json())
      .then(({ Token }) => {
        var feed = new Instafeed({
          accessToken: Token,
          limit: 100,
          render: data => {
            console.log(data);
            fetchedPhotos.push(data);
            return null;
          },
          after: () => setPhotos(fetchedPhotos),
        });
        feed.run();
      });
  }, []);
  return (
    <section id="photos" style={{ maxWidth: '80%' }}>
      {photos.map(({ image, id, model, caption }) => (
        <a
          href={model.permalink}
          title={caption
            .split('\n')
            .filter(line => line !== '.')
            .join('\n')}
          key={id}
        >
          <img src={image} />
        </a>
      ))}
    </section>
  );
}
