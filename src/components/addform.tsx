import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'



const AddForm = ({onClickCallback}) => {
  const [data, setData] =  useState({})
  const [value, setValue] = React.useState<Dayjs | null>(null);


  const submitForm = () => {

    if(data.title==null || data.title=='' || data.author==null || data.author=='' || value==null || value==undefined || 
    data.image_link==null || data.image_link=='' || data.description==null || data.description==''){
      Swal.fire({
        title: 'All Fields are Mandatory!',
        icon: 'error',
        confirmButtonText: 'OK',
        timer:3000
      })
      return;
    }

    console.log(data)
    console.log(value)

    axios.post("http://demo.api.admin.circlesnow.com/ProductRESTService.svc/schedMsg", {
      title: data.title,
      author: data.author,
      launchdate: value,
      image_link: data.image_link,
      description: data.description
    },{headers: {
        'token': 'yash.kh2001@gmail.com'
    }}).then((response) => {
      Swal.fire({
        title: 'Saved Successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer:3000
      }).then(() => { 
        onClickCallback()
      });
      console.log(response.data);
      onClickCallback()
    });
   
  }

  return (
    <div className='formStyle'>
      <div onClick={onClickCallback} className='backbtn'>
        <i className="fa-solid fa-arrow-left"></i>
        Back to Library
      </div>

      <div className='addPost'>
        <h1 >Publish Your Blog!</h1>
      </div>

      <div className='row m-t-20'>
        <TextField InputLabelProps={{className:'textlabel'}}  onChange={(e) => { setData({ ...data, title: e.target.value }) }} id="outlined-basic" label="Title" variant="outlined" />
        <TextField  onChange={(e) => { setData({ ...data, author: e.target.value }) }} id="outlined-basic" label="Author" variant="outlined" />
      </div>
      <div className='row m-t-30'>
        {/* <TextField id="outlined-basic" label="Launch Date"  variant="outlined" /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Launch Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField  onChange={(e) => { setData({ ...data, image_link: e.target.value }) }} id="outlined-basic" label="Image Url" variant="outlined" />
      </div>

      <div className='row m-t-30 heighted'>
        <TextField  onChange={(e) => { setData({ ...data, description: e.target.value }) }} multiline={true} id="outlined-basic" label="Description" variant="outlined" />
      </div>

      <div className='rowcenter m-t-30'>
        <button onClick={submitForm} className='submitbtn'>Submit</button>
      </div>
    </div>
  )
}

export default AddForm;