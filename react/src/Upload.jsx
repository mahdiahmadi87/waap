import React, { useState } from 'react';
import './Upload.css'
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  styled,
  Box,
} from '@mui/material';
import { CloudUpload, Image, Audiotrack, Code, Description, Movie } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 700,
  margin: 'auto',
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
}));

const UploadPage = () => {
  const [fileType, setFileType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!fileType) newErrors.fileType = 'Please select a file type';
    if (!file) newErrors.file = 'Please upload a file';
    return newErrors;
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUploadProgress(0);

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl('');
    }

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    console.log({
      firstName,
      lastName,
      title,
      description,
      fileType,
      file,
    });
    // Add your form submission logic here
  };

  const renderIcon = () => {
    switch (fileType) {
      case 'Podcast':
        return <Audiotrack />;
      case 'Article Image':
        return <Image />;
      case 'Programming':
        return <Code />;
      case 'Essay Writing':
        return <Description />;
      case 'Film':
        return <Movie />;
      default:
        return <CloudUpload />;
    }
  };

  return (
    <Box
      style={{
        background: 'url(/path-to-background.jpg) no-repeat center center',
        backgroundSize: 'cover',
        minHeight: '100vh',
display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <StyledPaper elevation={6}>
        <Typography variant="h4" align="center" gutterBottom sx={{'.css-1q964xs-MuiFormLabel-root-MuiInputLabel-root':{fontFamily:'YekanX'}}}>
          آپلود اثر
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph sx={{fontFamily:'YekanX'}}>
        پادکست ها، مقالات، پروژه های کد، مقاله ها یا فیلم های خود را با بقیه به اشتراک بگذارید.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="نام"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="نام خانوادگی"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="عنوان"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth erro  r={!!errors.fileType}>
                <InputLabel>نوع فایل</InputLabel>
                <Select value={fileType} onChange={handleFileTypeChange} label="نوع فایل" >
                  <MenuItem value="Podcast">پادکست</MenuItem>
                  <MenuItem value="Article Image">تصویر سازی</MenuItem>
                  <MenuItem value="Programming">برنامه نویسی</MenuItem>
                  <MenuItem value="Essay Writing">مقاله نویسی</MenuItem>
                  <MenuItem value="Film">فیلم سازی</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="توصیحات"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={renderIcon()}
                fullWidth
                sx={{
                  backgroundColor: '#3f51b5',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                }}
              >
                آپلود فایل
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*, audio/*, video/*, .pdf, .txt, .doc, .docx, .zip, .rar"
                />
              </Button>
              {errors.file && (
                <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
                  {errors.file}
                </Typography>
              )}
              {file && (
                <Typography variant="body2" style={{ marginTop: 10 }}>
                  Selected file: {file.name}
                </Typography>
              )}
              {uploadProgress > 0 && (
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  style={{ marginTop: 10 }}
                />
              )}
            </Grid>
            {previewUrl && (
              <Grid item xs=
{12}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    display: 'block',
                    margin: '10px auto',
                    maxHeight: 200,
                    maxWidth: '100%',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!!Object.keys(errors).length}
                sx={{
                  backgroundColor: '#00796b',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#004d40',
                  },
                }}
              >
                تایید
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Box>
  );
};

export default UploadPage;