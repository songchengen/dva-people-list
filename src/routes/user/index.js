import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'

import UserItem from './components/UserItem';

const user = ({user, dispatch}) => {
  const { users }  =user;
  const onClickItem = (id) => {
    dispatch(routerRedux.push({
      pathname: `/user/${id}`
    }))
  }
  return (
    <div>
      <h1 style={{
        padding: '0 40px',
      }}>人员列表</h1>
      <ul>
        {
          users.map(user => (
            <UserItem key={user.id} user={user} onClickItem={onClickItem} />
          ))
        }
      </ul>
    </div>
  )
}

export default connect(({user}) => ({user}))(user)
