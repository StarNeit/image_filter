import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { fabric } from 'fabric';

const useStyles = makeStyles((theme) => ({
  filterImageContainer: {
    width: '100%',
    height: '100%',
    padding: '15px',
    boxSizing: 'border-box',
    position: 'relative'
  },
  canvasContainer: {
    width: '100%',
    height: '100%'
  }
}));

const FilterImage = (props) => {
  const classes = useStyles();
  const imageRef = useRef();

  useEffect(() => {
    initialCanvas();
  }, [props.image])

  const initialCanvas = () => {
    if ( props.image !== undefined ) {
      props.canvas.setWidth(imageRef.current.offsetWidth - 30);
      props.canvas.setHeight(imageRef.current.offsetHeight - 30);
      
      fabric.Image.fromURL( props.image.src, function( img ) {
        props.canvas.add(img);
      });
    }
  }

  return (
    <div className={classes.filterImageContainer} ref={imageRef}>
      <canvas className={classes.canvasContainer} id='canvas'></canvas>
    </div>
  );
}

export default FilterImage;