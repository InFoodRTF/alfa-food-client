

enum StatusResponse {
    Ok = 200,
    Wait,
    BadRequest = 400,
    ServerNotFound = 404,
    NotServer = 500,
}

export default StatusResponse;