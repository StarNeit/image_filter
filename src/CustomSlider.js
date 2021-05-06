import React from 'react';
import { Slider, Typography, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    padding: '0 20px',
    marginTop: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  filterName: {
    fontWeight: '400',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    fontSize: '12px',
    letterSpacing: '.2em',
    opacity: '.5',
}
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CustomSlider = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.sliderContainer}>
      <Typography className={classes.filterName} gutterBottom>{props.title}</Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        min={props.min}
        max={props.max}
        defaultValue={props.value}
        onChange={(e, value) => props.onChange(props.title, value)}
      />
    </div>
  )
}

export default CustomSlider;