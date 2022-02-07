import React from "react";
// import PropTypes from "prop-types";
// import { firedatabase } from "../services/firebase";
// import { rx_tabindex, rx_focusroom, rx_focus_msgs } from "../modules/chats";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { connect } from "react-redux";

import { blue } from "@material-ui/core/colors";
import { cm_roomuser_update } from "../helpers/common";

// const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data, focusroom, me, all_rooms } = props;

  const handleClose = () => {
    onClose(selectedValue);
    console.log("까르르르궁", data);
  };

  const handleListItemClick = (id) => {
    const gogo = all_rooms.filter((i) => i.id === focusroom)[0];
            let hello = gogo.attributes.roomuser;
            if(!hello.includes(id)){
                
                // hello.push(id)
                console.log(id,'추가')
                cm_roomuser_update(all_rooms,focusroom,[...hello,id]);
            }

    onClose(false);
  };

//   console.log("까르르르궁", data);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">친구 리스트</DialogTitle>
      <List>
        {data.length > 0 ? (
          data.map((item, index) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item.id)}
              key={index}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.username} />
            </ListItem>
          ))
        ) : (
          <li>리스트가없습니다.</li>
        )}
      </List>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

const FriendAdd = ({ all_users, focusroom, me, all_rooms }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        친구추가
      </Button>
      <SimpleDialog
        data={all_users}
        focusroom={focusroom}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        me={me}
        all_rooms={all_rooms}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  all_users: state.members.all_users,
  focusroom: state.chats.focusroom,
  me: state.chats.me,
  all_rooms: state.chats.all_rooms
});

export default connect(mapStateToProps, null)(FriendAdd);