import io from "socket.io-client";

const socket = io() // we're making a request to the same origin, so we don't need to specify any url

export default socket