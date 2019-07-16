const PAGELOADER = "PAGELOADER";

const initialState = { progress: false };

const loader = (state = initialState, action) => {
  switch (action.type) {
    case PAGELOADER: {
      const { progress } = action.payload;
      return {
        progress,
      };
    }
    default:
      return state;
  }
};

export const showLoader = () => {
  return {
    type: PAGELOADER,
    payload: { progress: true },
  };
};

export const hideLoader = () => {
  return {
    type: PAGELOADER,
    payload: { progress: false },
  };
};

export default loader;
