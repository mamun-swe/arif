import React from 'react'
import Select from 'react-select';
const EnableDisbleDropdown = ({ currentAds, position, setEnable }) => {
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
    return (
        <div className="input-group-append">
            {
                currentAds?.position === position.value && <Select styles={colourStyles}
                    defaultValue={{ value: `${currentAds?.enable}`, label: `${currentAds?.enable}` }}
                    onChange={setEnable}
                    options={[
                        { value: 'Enable', label: 'Enable' },
                        { value: 'Disable', label: 'Disable' },
                    ]}
                />
            }
        </div>
    )
}

export default EnableDisbleDropdown