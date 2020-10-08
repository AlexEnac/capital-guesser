export const INIT_HIGH_SCORE = {
  h_points: 0,
};

const highScoreReducer = (state = INIT_HIGH_SCORE, { type, payload }) => {
  switch (type) {
    case "SET_HIGH_SCORE":
      return {
        h_points: payload,
      };

    default:
      return state;
  }
};

export default highScoreReducer;
