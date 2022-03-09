// Make sure logged user sees recipients name, not his own
export const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1].name : users[0].name;
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const sameSenderJustifyContent = (messages, m, i, userId) => {
  if (
    messages[i].sender._id === m.sender._id &&
    messages[i].sender._id === userId
  )
    return "flex-end";
};

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

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
