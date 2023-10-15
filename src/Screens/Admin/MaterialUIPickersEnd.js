import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { today } from './projectDriver';

export default function MaterialUIPickersEnd({ endDate, setEndDate }) {
    // const [value, setValue] = React.useState(new Date(today('end')));

    const handleChange = (newValue) => {
        setEndDate(new Date(newValue).toLocaleDateString());
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label="Date End"
                    inputFormat="MM/dd/yyyy"
                    value={endDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
