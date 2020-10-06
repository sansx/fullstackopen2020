const initialState = {
  msg: ""
};

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "CREATE_NOTICE":
      return {
        msg: action.data.msg
      };
    case "CLEAR_NOTICE":
      return {
        msg: ''
      };
    default:
      return state;
  }
}

export const createNotice = msg => ({
  type: 'CREATE_NOTICE',
  data: {
    msg
  }
})

export const clearNotice = () => ({
  type: 'CLEAR_NOTICE'
})

export const setNotification = (msg, countdown) => async dispatch => {
  if (window.timer) {
    clearTimeout(window.timer)
  }
  dispatch(createNotice(msg))
  window.timer = setTimeout(() => {
    dispatch(clearNotice())
  }, countdown * 1000);
}

export default reducer