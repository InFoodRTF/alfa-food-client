import React from "react";

enum StatusType {
    Ok = 200,
    Wait,
    BadRequest = 400,
    ServerNotFound = 404
}

export default StatusType;