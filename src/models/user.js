import { queryAll, queryOne } from './../services/user';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'user',
  state: {
    users: [],
    hasUsers: false,
    currentUser: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'queryAllIfNeed'
          })
        }
        const match = pathToRegexp('/user/:id').exec(location.pathname);
        console.log(match)
        if(match) {
          dispatch({
            type: 'queryOne',
            payload: {
              id: match[1]
            }
          })
        }
      })
    }
  },
  effects: {
    * queryAllIfNeed({ payload = {} }, { call, put, select }) {
      const { hasUsers } = yield select(_ => _.user);
      if (!hasUsers) {
        yield put({
          type: 'queryAll',
        });
      }
    },
    * queryAll({ payload = {} }, { call, put }) {
      const { errcode, data } = yield call(queryAll)
      if (errcode === 0) {
        yield put({
          type: 'updateUserList',
          payload: {
            users: data,
            hasUsers: true
          }
        })
      }
    },
    * queryOne({ payload = {} }, { call, put }) {
      const { errcode, data } = yield call(queryOne, payload.id);
      if (errcode === 0) {
        yield put({
          type: 'updateCurrentUser',
          payload: {
            currentUser: data,
          }
        })
      }
    },

  },
  reducers: {
    updateUserList (state, { payload }) {
      return { ...state, ...payload }
    },
    updateCurrentUser (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
