import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import  CloudUpload from '../assets/dummyimage.jpg'
import  CloseIcon from '../assets/close-icon.png'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format'
import AddForm from './addform.tsx';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '350px',
    color:'#000',
    paddingBottom:'30px',
    paddingTop:'0px',
    border:'none'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <img src={CloseIcon} alt="" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


const Librarypage = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [description, setDescription]=useState('')
  const dataFetchedRef = useRef(false);

  const handleClickOpen = (data) => {
    setOpen(true);
   
    setDescription(data.description)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const backPageEvent=()=>{
    setAddForm(false)
  }

  // const [dummyData, setDummyData] = useState(
  //   [{ title: 'Communicate more by saying less', launchdate: '12th February 2022', author: 'Casey Cox', description: 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor'},
  //   { title: 'Communicate more by saying less', launchdate: '12th February 2022', author: 'Casey Cox', description: 'Test'},
  //   { title: 'Communicate more by saying less', launchdate: '12th February 2022', author: 'Casey Cox', description: 'Test'}]
  // )

  const dataSaved=()=>{
    setAddForm(false)
    getData()
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
   getData()

  }, [])

   const getData=()=>{
    axios.get('http://demo.api.admin.circlesnow.com/ProductRESTService.svc/getschedmsg',{
      headers: {
        'token': 'yash.kh2001@gmail.com'
    }
    }).then((response: any) => { 
        setData(JSON.parse(response.data.dt))
        console.log(data)
      })
   }
  

  return (
    <div className='librarypage'>
      {
        !addForm && 
        <>
             <div className='addPost'>
        <h1>Library</h1>
        <button onClick={()=>{setAddForm(true)}} className='newblog'>New blog</button>
      </div>

      <div className='librarytable'>
        <table>
          <tr>
            <th>Cover image</th>
            <th>Launch date</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {
            data.map((data:any) => {
              return (
                <>
                  <tr>
                    <td><img src={data.image_lnk} alt="" /></td>
                    <td>
                      <span className='color-grey'>{format(new Date(data.launchdate), 'MMMM d, yyyy')}</span>
                    </td>
                    <td>
                      <span onClick={()=>{handleClickOpen(data)}} className='color-blue'>{data.title}</span>
                    </td>
                    <td>
                      <span>{data.author}</span>
                    </td>
                  </tr>
                </>
              )
            })
          }

        
        </table>
      </div>


      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Description
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
             {description}
          </Typography>
         
        </DialogContent>
    
      </BootstrapDialog>
        </>
      }

      {
        addForm &&
        <>
           <AddForm onClickCallback={dataSaved}/>
        </>
      }
    

    </div>
  )
}

export default Librarypage