import React from "react";
import classes from "../DialogItem/DialogItem.module.css";

type MessageType = {
    message: string
}

const Message = (props: MessageType) => {
    return(
        <div className={classes.message}>{props.message}</div>
    )
}

export default Message;