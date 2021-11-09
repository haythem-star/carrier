import React, { Fragment, useState } from 'react'
import { AppHeader } from '../../../components'
import { PlacesAutocompleteInput } from '../../../components'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import classes from './Home.module.css'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dataAction } from '../../../store/Store'

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch()

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    // setAddress(value)
    // setCoordinates(latLng)
    console.log(value);
    console.log(results);
  }
  const handleSearch = () => {
    dispatch(dataAction.initialTrucks());
    history.push('/trucks')
  }
  return (
    <Fragment>
      <AppHeader />
      <div className={classes.container}>
        <PlacesAutocompleteInput onSelectPlace={handleSelect} />
        <PlacesAutocompleteInput onSelectPlace={handleSelect} />
        <div className={classes.less}>
          <DateTimePickerComponent id="datetimepicker" />
        </div>
        <CButton color="primary" className={classes.less} onClick={handleSearch}>
          Search
        </CButton>
      </div>
    </Fragment>
  )
}

export default Home
