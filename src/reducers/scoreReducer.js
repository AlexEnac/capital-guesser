export const INIT_SCORE = {
  km: 1500,
  points: 0,
};

const scoreReducer = (state = INIT_SCORE, { type, payload }) => {
  switch (type) {
    case "CORRECT":
      return { km: state.km, points: state.points + 1 };
    case "INCORRECT":
      return { km: state.km - payload, points: state.points };
    case "RESET_SCORE":
      return INIT_SCORE;
    default:
      return state;
  }
};

export default scoreReducer;
