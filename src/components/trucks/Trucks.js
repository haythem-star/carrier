import React, { Fragment } from 'react'
import PropTypes from "prop-types";
import classes from './Trucks.module.css'
const Trucks = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <img
          src={props.imgPath}
          alt="Pancake"
        />
        <div className={classes.container__text}>
          <h1>{props.title}</h1>
          {/* <div class="container__text__star">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
            </div> */}
          <p>
          {props.description}
          </p>
          <div className={classes.container__text__timing}>
            <div className={classes.container__text__timing_time}>
              <h2>Company Name</h2>
              <p>{props.company}</p>
            </div>
            <div className={classes.container__text__timing_time}>
              <h2>Price</h2>
              <p>{props.price}$</p>
            </div>
            <div className={classes.container__text__timing_time}>
              <h2>Size</h2>
              <p>{props.size}T</p>
            </div>
          </div>
          <button className={classes.btn}>
            Booking
            {/* <i class="fa fa-arrow-right"></i> */}
          </button>
        </div>
      </div>
    </Fragment>
  )
}

Trucks.propTypes = {
  title: PropTypes.string,
  imgPath : PropTypes.string,
  description : PropTypes.string,
  company : PropTypes.string,
  price : PropTypes.number,
  size : PropTypes.number

};

export default Trucks
