const INIT_DATA_STATE = {
  isLoaded: false,
  capitals: [],
};

const dataReducer = (state = INIT_DATA_STATE, { type, payload }) => {
  switch (type) {
    case "SAVE_STATE":
      if (!state.isLoaded)
        return {
          isLoaded: true,
          capitals: payload,
        };
    default:
      return state;
  }
};

export default dataReducer;
