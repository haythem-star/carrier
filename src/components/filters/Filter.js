import React, { Fragment } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import { useDispatch } from 'react-redux'
import { dataAction } from '../../store/Store'

const Filter = (props) => {
  const dispatch = useDispatch()
  const [lifter, setLifter] = React.useState('none')

  const handleChangeLifter = (event) => {
    setLifter(event.target.value)
    dispatch(dataAction.filterId({variables : {id : 2}}))
  }

  const [size, setSize] = React.useState('3T')

  const handleChangeSize = (event) => {
    setSize(event.target.value)
  }

  const [trip, setTrip] = React.useState({
    Relocation: false,
    Fruits: false,
    Fishes: false,
    Construction: false,
    Meat: false,
  })

  const { Relocation, Fruits, Fishes, Construction, Meat } = trip

  const handleChangeTrip = (event) => {
    setTrip({ ...trip, [event.target.name]: event.target.checked })
  }

  return (
    <Fragment>
      <Container>
        <Divider />
        <br></br>
        <FormControl component="fieldset">
          <FormLabel component="legend">Trip type</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Relocation}
                  onChange={handleChangeTrip}
                  name="Relocation"
                />
              }
              label="Relocation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Fruits}
                  onChange={handleChangeTrip}
                  name="Fruits"
                />
              }
              label="Fruits"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Fishes}
                  onChange={handleChangeTrip}
                  name="Fishes"
                />
              }
              label="Fishes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Construction}
                  onChange={handleChangeTrip}
                  name="Construction"
                />
              }
              label="Construction"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary" checked={Meat} onChange={handleChangeTrip} name="Meat" />
              }
              label="Meat"
            />
          </FormGroup>
        </FormControl>
        <Divider />
        <br></br>
        <FormControl component="fieldset">
          <FormLabel component="legend">Lifters number</FormLabel>
          <RadioGroup
            aria-label="Lifters"
            name="Lifters"
            value={lifter}
            onChange={handleChangeLifter}
          >
            <FormControlLabel value="none" control={<Radio color="primary" />} label="None" />
            <FormControlLabel value="1" control={<Radio color="primary" />} label=" One Lifter" />
            <FormControlLabel value="2" control={<Radio color="primary" />} label="Two Lifters" />
            <FormControlLabel value="3" control={<Radio color="primary" />} label="Three Lifters" />
            <FormControlLabel
              value="more"
              control={<Radio color="primary" />}
              label="More than Three"
            />
          </RadioGroup>
        </FormControl>
        <Divider />
        <br></br>
        <FormControl component="fieldset">
          <FormLabel component="legend">Size (Thon T)</FormLabel>
          <RadioGroup aria-label="Size" name="Size" value={size} onChange={handleChangeSize}>
            <FormControlLabel value="3T" control={<Radio color="primary" />} label="Less Than 3T" />
            <FormControlLabel value="3T_10T" control={<Radio color="primary" />} label="3T-10T" />
            <FormControlLabel
              value="10T_100T"
              control={<Radio color="primary" />}
              label="10T-100T"
            />
            <FormControlLabel
              value="100T_1000T"
              control={<Radio color="primary" />}
              label="100T-1000T"
            />
            <FormControlLabel
              value="1000T"
              control={<Radio color="primary" />}
              label="More than 1000T"
            />
          </RadioGroup>
        </FormControl>
      </Container>
    </Fragment>
  )
}

export default Filter
