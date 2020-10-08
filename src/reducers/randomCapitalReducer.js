const INIT_RANDOM_CAPITAL = -1;
const randomCapitalReducer = (
  state = INIT_RANDOM_CAPITAL,
  { type, payload }
) => {
  switch (type) {
    case "PICK_CAPITAL":
      return payload;
    default:
      return state;
  }
};

export default randomCapitalReducer;
