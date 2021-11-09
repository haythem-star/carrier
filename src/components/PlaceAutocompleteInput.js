import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const PlacesAutocompleteInput = (props) => {
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  })

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
    props.onSelectPlace(value);
  }

  return (
    <Fragment>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p> */}

            {/* <input {...getInputProps({ placeholder: 'Type address' })} /> */}
            {/* <TextField
                id="standard-basic"
                label="Standard"
                {...getInputProps({ placeholder: 'Type address' })}
              /> */}
            <CInputGroup className="mb-3">
              <CFormControl
                placeholder="Username"
                autoComplete="username"
                {...getInputProps({ placeholder: 'Type address' })}
              />
            </CInputGroup>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion,index) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                }

                return (
                  <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </Fragment>
  )
}

PlacesAutocompleteInput.propTypes = { 
      onSelectPlace: PropTypes.func 
}

export default PlacesAutocompleteInput
