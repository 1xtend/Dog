import axios from 'axios';

export function imageLoader() {
  const imageBox = document.querySelector('.content-hero__image');

  let activeMedia;

  const imgButton = document.querySelector('#loadImageBtn');
  imgButton.addEventListener('click', (e) => {
    fetchImg();
  });

  function fetchImg() {
    imgButton.classList.add('is-active');

    axios
      .get('https://random.dog/woof.json')
      .then((res) => {
        imgButton.classList.remove('is-active');
        if (activeMedia) {
          activeMedia.remove();
        }
        console.log(res.data);

        if (isImg(res.data.url)) {
          loadImg(res.data);
        } else if (isVideo(res.data.url)) {
          console.log(res.data.url);
          loadVideo(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function isImg(url) {
    if (
      slice(url, -4) === '.jpg' ||
      slice(url, -4) === '.JPG' ||
      slice(url, -4) === 'jpeg' ||
      slice(url, -4) === '.png' ||
      slice(url, -4) === '.PNG' ||
      slice(url, -4) === '.gif'
    ) {
      return true;
    }
  }
  function isVideo(url) {
    if (slice(url, -4) === '.mp4' || slice(url, -4) === '.webm') {
      return true;
    }
  }

  function loadImg(data) {
    activeMedia = document.createElement('img');
    activeMedia.src = data.url;
    imageBox.append(activeMedia);
  }

  function loadVideo(data) {
    activeMedia = document.createElement('video');
    activeMedia.src = data.url;
    activeMedia.autoplay = true;
    activeMedia.loop = true;
    activeMedia.controls = true;
    activeMedia.muted = true;
    imageBox.append(activeMedia);
  }

  function slice(item, length) {
    return item.slice(length);
  }
}
