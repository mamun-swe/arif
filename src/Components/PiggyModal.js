import React, { lazy, Suspense } from "react";
import LoadingSpin from "react-loading-spin";
import { useSelector } from 'react-redux';
import { Bright_Theme, Dark_Theme } from "../Constants";
import { networkLabel } from "../initialState"
const CopyIcon = lazy(() => import("./Icons/CopyIcon"))
const HeartIcon = lazy(() => import("./Icons/HeartIcon"))
const CloseIcon = lazy(() => import("./Icons/CloseIcon"))
const CheckIcon = lazy(() => import("./Icons/CheckIcon"))


const PiggyModal = (props) => {
    const setTheme = useSelector(state => state.setTheme);

    const onCopyAddress = () => {
        navigator.clipboard.writeText('0x5975219009c9EEFbA49DE8348e0313f05944FbF3');
    }
    return (
        <Suspense fallback={<LoadingSpin />}>
            <div className="modal fade" id="piggyModal">
                <div className="modal-dialog modal-dialog-centered"
                >
                    <div className="modal-content" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground, }}>

                        <div className="piggy-modal-header">
                            <div className="modal-title"><HeartIcon color='red' /></div>
                            <button type="button" className="piggy-close" data-dismiss="modal"
                                style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground, }}>
                                <CloseIcon color={setTheme === 'brightness' ? 'black' : 'white'}
                                    fontSize={16} />
                            </button>
                        </div>

                        <div className="piggy-modal-body">
                            <div className="piggy-content">
                                <h4>Help us keep the lights on!</h4>
                                <p>If DEX Screener has been useful to you and you'd like to help us pay for our beer servers then please feel free to make a contribution to the address below:</p>
                                <p className="wallet-address">0x5975219009c9EEFbA49DE8348e0313f05944FbF3</p>
                                <div className="row network-div">
                                    {networkLabel.map((item, index) => {
                                        return <div key={index} className="piggy-network d-flex">
                                            <CheckIcon /><p>{item.title}</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="piggy-modal-footer">
                                <button type="button" className="btn btn-primary piggy-copy"
                                    onClick={() => onCopyAddress()}><CopyIcon color='white' />Copy Address</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Suspense>
    )
}
export default PiggyModal
