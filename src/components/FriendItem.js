import React from "react";

/* material-ui */
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const FriendItem = ({
  text,
  sub,
  confirmed,
  avatar,
  event,
  id
}) => {


  return (
    <li style={{ display: "block" }}>
      <ListItem button onClick={() => event(id) }>
        <ListItemAvatar>
          <Badge color="secondary" badgeContent={0}>
            <StyledBadge
              invisible={!confirmed}
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={avatar} />
            </StyledBadge>
          </Badge>
        </ListItemAvatar>
        <ListItemText primary={text} secondary={sub} />
      </ListItem>
    </li>
  );
};

export default FriendItem;