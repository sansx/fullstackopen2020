const initialState = {
  msg: null,
  errMsg: null
};

const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case "CREATE_NOTICE":
      return {
        ...state,
        msg: action.data.msg
      };
    case "CREATE_ERR_NOTICE":
      return {
        ...state,
        errMsg: action.data.msg
      };
    case "CLEAR_NOTICE":
      return {
        ...state,
        msg: null
      };
    case "CLEAR_ERR_NOTICE":
      return {
        ...state,
        errMsg: null
      };
    default:
      return state;
  }
}

export const createNotice = (msg, err) => ({
  type: err ? "CREATE_ERR_NOTICE" : 'CREATE_NOTICE',
  data: {
    msg
  }
})

export const clearNotice = (err) => ({
  type: err ? "CLEAR_ERR_NOTICE" : 'CLEAR_NOTICE'
})

export const setNotification = (msg, err = false, countdown = 5) => async dispatch => {
  let timer = err ? window.errTimer : window.timer
  if (timer) {
    clearTimeout(timer)
  }
  dispatch(createNotice(msg, err))
  if (err) {
    window.errTimer = setTimeout(() => {
      dispatch(clearNotice(err))
    }, countdown * 1000);
    return
  }
  window.timer = setTimeout(() => {
    dispatch(clearNotice(err))
  }, countdown * 1000);
}

export default reducer