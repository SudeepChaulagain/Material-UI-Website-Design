import React, { Fragment, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from './Theme';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
    const { children} = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  const useStyles = makeStyles({
    toolbarMargin:{
      ...theme.mixins.toolbar,
      marginBottom:"3em"
      
    },
    logo:{
      height:"8em"
    },
    tabContainer:{
      marginLeft:"auto"
    },
    tab:{
      ...theme.typography.tab,
      minWidth:10,
      marginLeft:"25px"
    },
    button:{
      ...theme.typography.estimate,
      borderRadius:"50px",
      marginLeft:"50px",
      marginRight:"25px",
      height:"45px",
    },
    logoContainer:{
      padding:0,
      "&:hover":{
        backgroundColor: "transparent"
      }
    },
    menu:{
      backgroundColor: theme.palette.common.blue,
      color:"white",
      borderRadius:"0px"
    },
    menuItem:{
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover":{
        opacity: 1
      }
    }

  })

const Header = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const tabChangeHandler = (value)=>{
    setValue(value)
  }
  const handleClick = (event) =>{
    setAnchorEl(event.currentTarget)
    setOpenMenu(true)
  }

  const handleClose = () =>{
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleMenuItemClick = (event, i)=>{
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(i)
  }

  const menuOptions = [
    { name: "Services", 
      link: "/services",
      activeIndex: 1, 
      selectedIndex: 0 },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
      activeIndex: 1,
      selectedIndex: 1
    },
    {
      name: "Mobile App Development",
      link: "/mobileapps",
      activeIndex: 1,
      selectedIndex: 2
    },
    {
      name: "Website Development",
      link: "/websites",
      activeIndex: 1,
      selectedIndex: 3
    }
  ]

  const routes = [
    {
      name: "Home",
      link: "/",
      activeIndex: 0,
      selectedIndex: 0
    },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" :undefined,
      ariaPopup: anchorEl ? "true" :undefined,
      mouseOver: event=> handleClick(event)

    },
    { name: "The Revolution", link: "/revolution", activeIndex: 2 },
    { name: "About Us", link: "/about", activeIndex: 3 },
    { name: "Contact Us", link: "/contact", activeIndex: 4 }
  ]

  useEffect(()=>{
    [...menuOptions, ...routes].forEach(route=>{
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex)
          }
          if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
            setSelectedIndex(route.selectedIndex)
          }
          break;
        case "/estimate":
          setValue(5)
          break;
        default:
          break;
      }
    })
  }, [value, menuOptions, selectedIndex, routes])
    return (
        <Fragment>
            <ElevationScroll>
            <AppBar position="fixed">
                <Toolbar disableGutters>

                  <Button component={Link} to="/" className={classes.logoContainer} onClick={()=>setValue(0)} disableRipple>
                  <img src={logo} alt="" className={classes.logo}/>
                  </Button>

                  <Tabs 
                    className={classes.tabContainer} 
                    value={value} 
                    onChange={tabChangeHandler}
                  // indicatorColor="primary"
                  >
                    {routes.map((route, index)=>(
                      <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                      />
                    ))}
                  </Tabs>
                  <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/estimate">Free Estimate</Button>
                  <Menu 
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{onMouseLeave:handleClose}}
                  classes={{paper: classes.menu}}  //if we want to override the style of the component i.e. paper we have to use classes prop insted of className
                  elevation={0}
                  >
                    {menuOptions.map((option, i)=>(
                      <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{root: classes.menuItem}} //overriding the style component
                        onClick={event=>{handleMenuItemClick(event, i); setValue(1); handleClose()}}
                        selected={i=== selectedIndex && value===1}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Toolbar>
            </AppBar>
            </ElevationScroll>
            {/* it pops out the content of the body that was not visible due to toolbar  */}
            <div className={classes.toolbarMargin}/>  
        </Fragment>
    )
}

export default Header
