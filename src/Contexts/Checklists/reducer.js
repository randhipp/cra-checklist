export const Reducer = (state, action) => {
  switch (action.type) {
    case 'getListChecklist':
      return {
        ...state,
        listChecklist: action.payload,
      };

    default:
      return state;
  }
};
