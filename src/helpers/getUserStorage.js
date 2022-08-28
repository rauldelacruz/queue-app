
export const getUserStorage = () => {
  return {
    seller: localStorage.getItem('seller'),
    desk: localStorage.getItem('desk'),
  };
}
