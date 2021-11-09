import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Trucks from '../../../components/trucks/Trucks'
import cssClass from './TrucksList.module.css'
import Filter from '../../../components/filters/Filter'
import { useQuery, gql } from '@apollo/client'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const TrucksList = (props) => {
  const { query, params } = useSelector((state) => state)

  const TRUCKSLIST = gql`
    ${query}
  `

  const { loading, error, data } = useQuery(TRUCKSLIST, params)

  let trucksList = <h3>No Trucks Available</h3>
  if (data) {
    if (data.trucks) {
      trucksList = data.trucks.map((truck) => (
        <Trucks
          key={truck.id}
          title={truck.Constructor + ' ' + truck.Model}
          imgPath={`http://localhost:1337${truck.photos[0].url}`}
          description={truck.description}
          company={truck.company.name}
          price={truck.price}
          size={truck.size}
        />
      ))
    }
    if (data.truck) {
      trucksList = (
        <Trucks
          key={data.truck.id}
          title={data.truck.Constructor + ' ' + data.truck.Model}
          imgPath={`http://localhost:1337${data.truck.photos[0].url}`}
          description={data.truck.description}
          company={data.truck.company.name}
          price={data.truck.price}
          size={data.truck.size}
        />
      )
    }
  }

  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <h3>Filter By :</h3>
      </div>
      <Filter />
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Available Trucks
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={cssClass.bord}></div>
        {loading && <p>loading...</p>}
        {error && <p>error</p>}
        {data && trucksList}
      </main>
    </div>
  )
}

TrucksList.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default TrucksList
