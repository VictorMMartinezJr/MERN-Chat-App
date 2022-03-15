// Make sure logged user sees recipients name, not his own
export const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1].name : users[0].name;
};

// Make sure logged user sees recipients avatar, not his own
export const getSenderAvatar = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1].avatar : users[0].avatar;
};

// Send messages to opposite sides of chatbox depending on who sends it
export const sameSenderJustifyContent = (messages, m, i, userId) => {
  if (
    messages[i].sender._id === m.sender._id &&
    messages[i].sender._id === userId
  )
    return "flex-end";
};

// Change message background color depending on who sends it
export const messageTextColor = (messages, m, i, userId) => {
  if (
    messages[i].sender._id === m.sender._id &&
    messages[i].sender._id === userId
  ) {
    return "#fff";
  } else {
    return "#000";
  }
};

// Margin if user sends multiple messages
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
