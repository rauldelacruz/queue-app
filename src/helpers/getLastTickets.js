export const getLastTickets = async() => {
    const response = await fetch('http://localhost:8080/last');
    const data = await response.json();
    return data.last;
}
