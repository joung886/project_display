import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [reservationAlarms, setReservationAlarms] = useState([]);

  const addNotification = (notification) => {
    setReservationAlarms((prev) => [...prev, notification]);
  };

  const clearNotification = () => {
    setReservationAlarms([]);
  };

  return (
    <NotificationContext.Provider
      value={{ reservationAlarms, addNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
