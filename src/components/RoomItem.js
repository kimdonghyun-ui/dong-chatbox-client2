import React,{useEffect} from "react";

/* redux */


/* material-ui */
import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Badge
} from "@material-ui/core";

/* function */



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

const RoomItem = ({
  room,
  avatar,
  event,
  hendle_room_remove,
  name
}) => {




useEffect(() => {
  console.log("[표시]RoomItem.js");

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <li style={{ display: "flex" }}>
      <ListItem button onClick={() => event(room.id)}>
        <ListItemAvatar>
          <Badge color="secondary" badgeContent={0}>
            <StyledBadge
              invisible={true}
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
        <ListItemText primary={name} secondary={room.attributes.roomuser.length > 2 ? "단체 대화방" : "1:1대화방" } />
      </ListItem>
      <Button
        onClick={() => hendle_room_remove(room.id)}
      >
        삭제
      </Button>
    </li>
  );
};

export default RoomItem;