import React, { useEffect, useState, lazy, Suspense } from 'react'
import './FeaturedAds.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { ThreeDots } from "react-loader-spinner";
import Select from 'react-select';
import { Backendurl } from '../../../Constants';
import LoadingSpin from 'react-loading-spin';
const EnableDisbleDropdown = lazy(() => import('../../smallCmp/EnableDisbleDropdown'));


const FeaturedAds = () => {
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [loader, setLoader] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [time, setTime] = useState({});
    const [position, setPosition] = useState({ value: 'Top', label: 'Top' });
    const [currentAds, setCurrentAds] = useState([])
    const [enable, setEnable] = useState({})
    const [uploadLoader, setUploadLoader] = useState(false);
    let newLink = [];
    const uploadImage = async (uploadText) => {

        if (!currentAds?._id) {
            return alert('System failed.')
        }
        if (imagesPreview.length < 1) {
            alert('Image is required')
            return
        }
        if (uploadText) {
            setUploadLoader(true)
        } else {
            setLoader(true)
        }

        fetch(`${Backendurl}landingPageads`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                adsGallery: images,
                id: currentAds?._id,
                linkset: newLink
                // category: 'featured', interval: 3000,
            })
        }).then(res => res.json())
            .then(data => {
                setImagesPreview([]);
                setRefresh(data.success);
                setUploadLoader(false);
                setLoader(false)
            })
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



    const handleDelete = (id) => {
        setImagesPreview(imagesPreview.filter((item, index) => index !== id))
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


    useEffect(() => {
        fetch(`${Backendurl}getLandingPageAds`)
            .then(res => res.json())
            .then(data => {
                const featuredAds = data.find(item => item.category === 'featured' && item.position === position.value)

                setTime({ value: `${featuredAds?.interval}`, label: `${featuredAds?.interval}ms` })
                setEnable({ value: `${featuredAds?.enable}`, label: `${featuredAds?.enable}` })
                setCurrentAds(featuredAds)

            })
        setRefresh(false)
    }, [refresh, position, setTime, setEnable])

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { isDisabled }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : 'white',
                color: 'black',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    }


    const intervalHandler = () => {
        setLoader(true);
        fetch(`${Backendurl}interval`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: currentAds?._id, interval: time.value, adsGallery: currentAds?.adsGallery, position: position.value, category: 'featured', enable: enable.value })
        }).then(res => res.json())
            .then(data => {
                setRefresh(data.success)
                setLoader(false);
            })
    }



    return (
        <Suspense fallback={<LoadingSpin />}>
            <div className='container ads-banner'>
                <div className='row'>
                    <div className='col-6'>
                        <label htmlFor="exampleFormControlTextarea1">Upload Featured Ads Image</label>
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file"
                                    multiple
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
                                        uploadLoader ? <span style={{ cursor: 'no-drop' }}
                                            className="input-group-text btn-warning">
                                            <ThreeDots style={{ cursor: `${uploadLoader && 'no-drop'}` }} className='dots' color="#00BFFF" height={20} width={30} />
                                        </span> : <span style={{ cursor: 'pointer' }}
                                            onClick={() => uploadImage('upload-image')}
                                            className="input-group-text btn-success" id="">Upload</span>
                                    }

                                </div>
                            }

                        </div>

                        <div className='row'>
                            {
                                imagesPreview?.map((item, index) => (
                                    <div className='col-sm-6 seleceted-image-block' key={index} >
                                        <img className='w-100 recent-selected-images' alt='' src={item} />
                                        < CancelIcon className='close-icon' onClick={() => handleDelete(index)} />
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
                                            className='form-control ml-3' />
                                    </div>
                                ))
                            }
                            <div className='col-12'>
                                <label htmlFor="exampleFormControlTextarea1">
                                    {
                                        currentAds?.adsGallery?.length === 0 ? imagesPreview.length === 0 ? 'No data availbe!' : '' : 'Current Advertise'
                                    }
                                </label>
                                <div className='row text-center'>
                                    {
                                        currentAds?.adsGallery?.map((item, index) => (
                                            <div className='col-sm-4 seleceted-image-block' key={index} >
                                                <img className='w-100 recent-selected-images' alt='' src={item.url} />
                                                < CancelIcon className='close-icon' onClick={() => currentAdsDelete(currentAds._id, item._id, item.public_id)} />
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-6'>
                        <label htmlFor="exampleFormControlTextarea1">Set Timeout</label>
                        <div className='row'>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    {
                                        currentAds?.position === position.value && <Select styles={colourStyles}
                                            defaultValue={{ value: `${currentAds?.interval}`, label: `${currentAds?.interval}ms` }}
                                            onChange={setTime}
                                            options={[
                                                { value: '10000', label: '10000ms' },
                                                { value: '15000', label: '15000ms' },
                                                { value: '30000', label: '30000ms' },
                                                { value: '45000', label: '45000ms' },
                                                { value: '60000', label: '60000ms' },
                                            ]}
                                        />
                                    }
                                </div>

                                <div className="input-group-append">
                                    {
                                        currentAds && <Select styles={colourStyles}
                                            defaultValue={position}
                                            onChange={setPosition}
                                            options={[
                                                { value: 'Top', label: 'Top' },
                                                { value: 'Bottom', label: 'Bottom' },
                                            ]}
                                        />
                                    }

                                </div>
                                <EnableDisbleDropdown currentAds={currentAds} position={position} setEnable={setEnable} />

                                <div className="input-group-append">
                                    {
                                        loader ? <span style={{ cursor: 'no-drop' }}
                                            className="input-group-text btn-warning">
                                            <ThreeDots style={{ cursor: `${loader && 'no-drop'}` }} className='dots' color="#00BFFF" height={20} width={30} />
                                        </span> : <span style={{ cursor: 'pointer' }}
                                            onClick={() => intervalHandler()}
                                            className="input-group-text btn-success" id="">Update</span>
                                    }

                                </div>

                            </div>

                        </div>
                    </div>
                    {/* <div className='col-12'>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Paste Code</label>
                        <textarea className="form-control" onBlur={(e) => setAdsCodes(e.target.value)} id="exampleFormControlTextarea1" rows="10"></textarea>
                    </div>
                    <button className='btn btn-success' onClick={() => landingPageAdsCodes()} >Upload</button>
                </div> */}
                </div>

            </div>
        </Suspense>
    )
}

export default FeaturedAds