import React from "react";

enum StatusResponse {
    Ok = 200,
    Wait,
    BadRequest = 400,
    ServerNotFound = 404
}

export default StatusResponse;