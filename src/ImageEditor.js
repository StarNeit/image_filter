import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { fabric } from 'fabric';

import FilterImage from './FilterImage';
import CustomSlider from './CustomSlider';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';

const data = [
  {
    title: 'vintage',
    value: 0
  },
  {
    title: 'sepia',
    value: 0
  },
  {
    title: 'blur',
    value: 0
  },
];

const useStyles = makeStyles((theme) => ({
  contentWrap: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  sidebar: {
    width: '30%',
    height: '100%',
    maxWidth: '350px',
    background: 'rgba(46, 56, 79, 0.85)'
  },
  title: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '.2em',
    fontSize: '12px'
  },
  editContainer: {
    width: '100%',
    background: 'rgba(28, 34, 47, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  input: {
    display: 'none',
  },
  toolbar: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const ImageEditor = (props) => {
  const classes = useStyles();
  const [ image, setImage] = useState();
  const canvas = new fabric.Canvas("canvas", { preserveObjectStacking:true });

  const handleImageSelect = (e) => {
    if (e.target.files[0] !== undefined){
      const URL = window.webkitURL || window.URL;
      const img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        setImage(img);
      }
    }
  }

  const handleClick = () => {
    var link = document.createElement("a");
    link.download = `download${(new Date()).valueOf()}.png`;
    link.href = canvas.toDataURL("image/png");
    
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  const handleChange = (title, value) => {
    const obj = canvas.getActiveObject() || canvas.getObjects()[0];
    if (obj !== undefined && obj !== null) {
      if (title === 'blur') {
        obj.filters[0] = new fabric.Image.filters.Blur({ blur: value/100 });
      } else if (title === 'sepia') {
        if (value) {
          obj.filters[1] = new fabric.Image.filters.Sepia({ sepia: value });  
        } else {
          obj.filters[1] = null;
        }
      } else if (title === 'vintage') {
        if (value) {
          obj.filters[2] = new fabric.Image.filters.Vintage({ vintage: value });
        } else {
          obj.filters[2] = null;
        }
      }
      obj.applyFilters();
    }
    canvas.renderAll();
  }

  return(
    <div className={classes.contentWrap}>
      <div className={classes.sidebar}>
        <div className={classes.title}>Filters</div>
        {data.map((item, index) => {
          return <CustomSlider key={index} title={item.title} value={item.value} min={0} max={item.title === 'blur'? 100: 1} onChange={handleChange} />;
        })}
      </div>
      <div className={classes.editContainer}>
        <div className={classes.toolbar}>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleImageSelect} />
          <label htmlFor="icon-button-file" style={{ marginRight: 10 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="span"
              className={classes.button}
              startIcon={<PhotoCamera />}
            >
              Choose
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={handleClick}
          >
            Save
          </Button>
        </div>
        <FilterImage canvas={canvas} image={image} data={data} />
      </div>
    </div>
  )
}

export default ImageEditor;