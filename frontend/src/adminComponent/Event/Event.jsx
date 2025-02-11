import React, { useState } from 'react';
import { Box, Button, Modal, Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const initialValue={
  imageUrl: '',
  location: '',
  eventName: '',
  startDate: '',
  endDate: '', 
}
const Event = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = React.useState(initialValue)
    
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {

    const formattedDate = dayjs(date).isValid() ? dayjs(date).format('MMMM DD, YYYY hh:mm A') : '';
    setFormValues({ ...formValues, [dateType]: formattedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formValues);
    setOpen(false);
  };

  return (
    <div>
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create New Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="text-gray-400 text-center text-xl pb-10">Create Event</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="imageUrl"
                    name="imageUrl"
                    label="Image URL"
                    variant="outlined"
                    value={formValues.imageUrl}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="eventName"
                    name="eventName"
                    label="Event Name"
                    variant="outlined"
                    value={formValues.eventName}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={formValues.startDate ? dayjs(formValues.startDate) : null}
                      onChange={(newValue) => handleDateChange(newValue, 'startDate')}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="End Date and Time"
                      value={formValues.endDate ? dayjs(formValues.endDate) : null}
                      onChange={(newValue) => handleDateChange(newValue, 'endDate')}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <div className="flex justify-center">
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Event;
