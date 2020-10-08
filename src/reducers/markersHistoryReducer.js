const INIT_MARKERS = [];

const markersHistoryReducer = (state = INIT_MARKERS, { type, payload }) => {
  switch (type) {
    case "ADD_MARKER":
      return [...state, payload];
    case "RESET_MARKERS":
      return INIT_MARKERS;
    default:
      return state;
  }
};

export default markersHistoryReducer;
