export const saveState = (data) => {
  return {
    type: "SAVE_STATE",
    payload: data,
  };
};

export const startGame = () => {
  return {
    type: "START_GAME",
  };
};

export const endGame = () => {
  return {
    type: "END_GAME",
  };
};

export const correctAnswer = () => {
  return {
    type: "CORRECT",
  };
};

export const incorrectAnswer = (data) => {
  return {
    type: "INCORRECT",
    payload: data,
  };
};

export const pickRandomCapital = (data) => {
  return {
    type: "PICK_CAPITAL",
    payload: data,
  };
};

export const resetScore = () => {
  return {
    type: "RESET_SCORE",
  };
};

export const resetMarkers = () => {
  return {
    type: "RESET_MARKERS",
  };
};

export const addMarker = (data) => {
  return {
    type: "ADD_MARKER",
    payload: data,
  };
};

export const setHighScore = (data) => {
  return {
    type: "SET_HIGH_SCORE",
    payload: data,
  };
};
