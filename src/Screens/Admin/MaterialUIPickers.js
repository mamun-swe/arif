import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { today } from './projectDriver';

export default function MaterialUIPickers({ startDate, setStartDate }) {
    // const [value, setValue] = React.useState(new Date(today()));

    const handleChange = (newValue) => {
        setStartDate(new Date(newValue).toLocaleDateString());
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label="Date start"
                    inputFormat="MM/dd/yyyy"
                    value={startDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
