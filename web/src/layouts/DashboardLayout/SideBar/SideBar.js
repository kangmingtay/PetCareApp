import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Badge,
} from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import GroupIcon from '@material-ui/icons/Group';
import PetsIcon from '@material-ui/icons/Pets';
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined';
import ChildFriendlyOutlinedIcon from '@material-ui/icons/ChildFriendlyOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import NavItem from './SideBarItem';
import { UserContext } from 'src/UserContext';
import LogoutButton from 'src/components/LogoutButton';
import { fetchUserType } from 'src/calls/userCalls';

const userItems = [
  {
    href: '/app/dashboard',
    icon: DashboardOutlinedIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/catalogue',
    icon: AccessibilityNewOutlinedIcon,
    title: 'Find a Caretaker'
  },
  {
    href: '/app/pets',
    icon: PetsIcon,
    title: 'Your Pets'
  },
  {
    href: '/app/caretakers',
    icon: ChildFriendlyOutlinedIcon,
    title: 'Be a Caretaker'
  },
];

const adminItems = [
  {
    href: '/app/admin',
    icon: HomeOutlinedIcon,
    title: 'Admin'
  },
  {
    href: '/app/manage-users',
    icon: GroupIcon,
    title: 'Manage Users'
  },
]

const generalItems = [
  {
    href: '/app/account',
    icon: SettingsOutlinedIcon,
    title: 'Account'
  },
]

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  badge: {
    minWidth: '100px'
  }
}));

const SideBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { context } = useContext(UserContext)
  const [values, setValues] = useState({});
  const avatar = '/static/images/avatars/avatar_6.png';

  const items = (context.isAdmin === "true") ? [...adminItems, ...generalItems] : [...userItems, ...generalItems];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    async function fetchData() {
      const resp = await fetchUserType(context.username);
      setValues({
        ...resp.data.results
      });
    }
    fetchData();
  }, [location.pathname]);

  const displayBadge = () => {
    if (context.isAdmin === "true") {
      return (
        <Typography color="textPrimary" variant="h6">
          <Badge 
            classes={{
              badge: classes.badge
            }}
            badgeContent="Administrator" 
            color="secondary"
          />
        </Typography>
      )
    } else {
      return <>
        {Object.keys(values).map(key => {
          let name = '';
          switch (key) {
            case 'isPetOwner':
              name = 'Pet Owner';
              break;
            case 'isCareTaker':
              name = 'Care Taker';
              break;
            case 'isFullTimer':
              name = 'Full-Timer';
              break;
            case 'isPartTimer':
              name = 'Part-Timer';
              break;
          }
          if (parseInt(values[key]) === 1) {
            return (
              <Typography color="textPrimary" variant="h6">
                <Badge 
                  classes={{
                    badge: classes.badge
                  }}
                  badgeContent={name} 
                  color="secondary"
                />
              </Typography>
            )
          }
        })}
      </>
    }
  }

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {context.username}
        </Typography>
        {displayBadge()}
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <LogoutButton
            href='/login'
            title='Logout'
            icon={ExitToAppOutlinedIcon}
          />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

SideBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

SideBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default SideBar;
