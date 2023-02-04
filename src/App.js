import React, {useState, useRef} from "react";
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from  '@material-ui/core'
import QrCode from 'qrcode';
import {QrReader} from 'react-qr-reader';

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const[scanResultCam, setResultCam] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null);

  const generateQrCode = async () =>{
    try{
        const response = await QrCode.toDataURL(text);
        setImageUrl(response);
    }catch (error){
      console.log(error);
    }
  }
  const handleErrorFile = (error) =>{
    console.log(error);
  }
  const handleScanFile = (result) => {
    if(result){
      setScanResultFile(result);
    }
  }
  const onScanFile = () =>{
    qrRef.current.openImageDialog();
  }
  const handleErrorCam = (error) => {
    console.log(error);
  }
  const handleScanCam = (result) => {
    if(result){
        setResultCam(result);
    }
  }
  return (
    <Container className= {classes.container}>
      <Card>
        <h2 className={classes.title}>QR Code Scanner & Generator</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
              <Button  className= {classes.btn}variant='contained' color = 'primary' onClick={()=>generateQrCode()}>Generate</Button>
              <br/>
              <br/>
              <br/>
              {imageUrl ? (
                <a href = {imageUrl} download>
                  <img src={imageUrl} alt = "img"/>
                </a>): null }
            </Grid>
            {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button className = {classes.btn} variant = 'contained' color = 'secondary' onClick ={() => onScanFile()}>Scan QR Code</Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{width:'100%'}}
                onError ={handleErrorFile}
                onScan = {handleScanFile}
                legacyMode
              />
              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid> */}
            {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QR Code Scan by Cam</h3>
              <QrReader
              delay={300}
              style={{width:'100%'}}
              onError={handleErrorCam} 
              onScan={handleScanCam}
              />
              <h3>Scanned By Cam: {scanResultCam}</h3>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>

    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop:10
  },
  title:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'#3f51b5',
    color:'#fff',
    padding:20
  },
  btn:{
    marginTop:10,
    marginBottom:20
  }
}));
export default App;
