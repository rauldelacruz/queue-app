export const getLastTickets = async() => {
    const response = await fetch('https://socket-server-queue-app.onrender.com//last');
    const data = await response.json();
    return data.last;
}
