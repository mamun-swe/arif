import React, { useEffect, useState } from 'react'
import './HeaderBanner.css'
import { ThreeDots } from "react-loader-spinner";
import { Backendurl } from '../../../Constants';
import CancelIcon from '@mui/icons-material/Cancel';

const HeaderBanner = () => {
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentAds, setCurrentAds] = useState([]);

  let newLink = []
  const uploadImage = async () => {
    if (!currentAds?._id) {
      return alert('System failed.')
    }
    if (imagesPreview.length < 1) {
      alert('Image is required')
      return
    }
    setRefresh(true)
    setLoader(true)
    fetch(`${Backendurl}landingPageads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        adsGallery: images,
        id: currentAds?._id,
        linkset: newLink
      })
    }).then(res => res.json())
      .then(data => {
        setRefresh(data.success)
        setLoader(false)
        setImagesPreview([])

      })
  }

  const currentAdsDelete = (adsId, id, public_id) => {
    fetch(`${Backendurl}removeLandingAds`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ adsId: adsId, id: id, public_id: public_id })
    })
      .then(res => res.json())
      .then(data => setRefresh(data.success))
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    fetch(`${Backendurl}getLandingPageAds`)
      .then(res => res.json())
      .then(data => {
        const headerBanner = data.find(item => item.category === 'headerBanner' && item.position === 'Top');
        setCurrentAds(headerBanner)

      })
    setRefresh(false)
  }, [refresh])

  return (
    <div className='container ads-banner'>
      <div className='row'>
        <div className='col-12'>
          <label htmlFor="exampleFormControlTextarea1">Upload Ads Image</label>
          <div className="input-group mb-3">
            <div className="custom-file">
              <input type="file"
                accept="image/*"
                onChange={createProductImagesChange}
                className="custom-file-input"
                id="inputGroupFile02"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
            </div>
            {
              imagesPreview?.length > 0 && <div className="input-group-append">
                {
                  loader ? <span style={{ cursor: 'no-drop' }}
                    className="input-group-text btn-warning">
                    <ThreeDots style={{ cursor: `${refresh && 'no-drop'}` }} color="#00BFFF" height={20} width={30} />
                  </span> : <span style={{ cursor: 'pointer' }}
                    onClick={() => uploadImage()}
                    className="input-group-text btn-success" id="">Upload</span>
                }

              </div>
            }
          </div>
          <div className='row'>
            {
              imagesPreview?.map((item, index) => (
                <div className='col-sm-12' key={index} >
                  <img className='w-100' alt='' src={item} />
                  <input placeholder='Enter ads link' type={'text'} onBlur={(e) => {
                    if (newLink[index]?.id === index) {
                      newLink[index].id = index;
                      newLink[index].link = e.target.value;

                    } else {
                      newLink.push({ id: index, link: e.target.value })
                    }

                    // if (newLink[index]?.id === index) {
                    //     newLink[index].id = index;
                    //     newLink[index].link = e.target.value;
                    //     newLink[index].base64Img = images[index]

                    // } else {
                    //     newLink.push({ id: index, link: e.target.value, base64Img: images[index] })
                    // }
                  }
                  }
                    className='form-control mt-3' />
                </div>
              ))
            }
            {
              imagesPreview.length < 1 &&
              <div className='col-12'>
                <label htmlFor="exampleFormControlTextarea1">Current Advertise</label>
                <div className='row'>
                  {
                    currentAds?.adsGallery?.map((item, index) => (
                      <div className='col-sm-12 ' key={index} >
                        <img className='w-100 header-selected-images' alt='' src={item.url} />
                        < CancelIcon className='close-icon-header' onClick={() => currentAdsDelete(currentAds?._id, item._id, item.public_id)} />
                      </div>
                    ))
                  }

                </div>
              </div>
            }

          </div>
          {/* {
            imagesPreview?.length > 0 && <button className='btn btn-success mt-4'>Upload</button>
          } */}

        </div>
        {/* <div className='col-12'>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Enter Code</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default HeaderBanner