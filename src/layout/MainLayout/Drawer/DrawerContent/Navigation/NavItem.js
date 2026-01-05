import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

// project import
import { activeItem } from 'store/reducers/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { drawerOpen, openItem } = useSelector((state) => state.menu);
  const isSelected = openItem.includes(item.id);

  /* --------------------------------
     LINK vs ACTION HANDLING
  -------------------------------- */

  const isActionItem = typeof item.onClick === 'function';

  let listItemProps = {};

  if (!isActionItem && item.url) {
    const itemTarget = item.target ? '_blank' : '_self';

    listItemProps = {
      component: forwardRef((props, ref) => (
        <Link ref={ref} {...props} to={item.url} target={itemTarget} />
      ))
    };

    if (item.external) {
      listItemProps = {
        component: 'a',
        href: item.url,
        target: itemTarget
      };
    }
  }

  /* --------------------------------
     ACTIVE ITEM ON PAGE LOAD
  -------------------------------- */
  useEffect(() => {
    if (!isActionItem && item.url && pathname.startsWith(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* --------------------------------
     CLICK HANDLER
  -------------------------------- */
  const handleClick = (event) => {
    // ACTION ITEM (Logout)
    if (isActionItem) {
      event.preventDefault();
      event.stopPropagation();
      item.onClick(event);
      return;
    }

    // NORMAL NAV ITEM
    dispatch(activeItem({ openItem: [item.id] }));
  };

  const Icon = item.icon;
  const itemIcon = Icon ? (
    <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />
  ) : null;

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      onClick={handleClick}
      sx={{
        pl: drawerOpen ? level * 3 : 1.5,
        py: 1,
        borderRadius: 1,
        color: theme.palette.text.primary,

        /* ---------- HOVER ---------- */
        '&:hover': {
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : theme.palette.grey[100],
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : theme.palette.primary.main
        },

        /* ---------- SELECTED ---------- */
        '&.Mui-selected': {
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.12)'
              : theme.palette.primary.lighter,
          borderRight: `3px solid ${theme.palette.primary.main}`,

          '& .MuiTypography-root': {
            fontWeight: 600,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.primary.main
          },

          '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main
          },

          '&:hover': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.16)'
                : theme.palette.primary.lighter
          }
        }
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSelected
              ? theme.palette.primary.main
              : theme.palette.mode === 'dark'
                ? theme.palette.grey[400]
                : theme.palette.grey[700]
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}

      {(drawerOpen || level !== 1) && (
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{
                fontWeight: isSelected ? 600 : 400,
                color: isSelected
                  ? theme.palette.mode === 'dark'
                    ? theme.palette.common.white
                    : theme.palette.primary.main
                  : theme.palette.mode === 'dark'
                    ? theme.palette.grey[300]
                    : theme.palette.text.primary
              }}
            >
              {item.title}
            </Typography>
          }
        />
      )}

      {(drawerOpen || level !== 1) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;