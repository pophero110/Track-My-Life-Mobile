import { createContext, useState, useContext } from "react";

const TrackContext = createContext(null);

export const TrackerContextProvider = ({ children }) => {
  const [trackers, setTrackers] = useState([]);
  return (
    <TrackContext.Provider value={{ trackers, setTrackers }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackerContext = () => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error(
      "useTrackerContext must be used within TrackerContextProvider"
    );
  }
  return context;
};
