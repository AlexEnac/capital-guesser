const INIT_GAME_STATE = false;

const gameReducer = (state = INIT_GAME_STATE, { type, payload }) => {
  switch (type) {
    case "START_GAME":
      return true;
    case "END_GAME":
      return false;
    default:
      return state;
  }
};

export default gameReducer;
