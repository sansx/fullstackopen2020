const initialState = {
  filter: null
};

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "SET_FILTER":
      return {
        filter: action.data
      };
    default:
      return state;
  }
}

export const setFilter = filter => ({
  type: 'SET_FILTER',
  data: filter
})

export default reducer