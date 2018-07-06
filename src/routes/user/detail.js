import React from 'react';
import { connect } from 'dva'

import styles from './detail.css'

const UserInfo = ({ user }) => {
  const { currentUser } = user;
  return (
    <div>
      <h1 style={{
        padding: '0 40px'
      }}>{ currentUser.nickName }</h1>
      <div className={styles.card}>
        <img src={currentUser.avatar} alt=""/>
        <h2>{ currentUser.name }</h2>
        <p>{ currentUser.address }</p>
        <p>{ currentUser.phone }</p>
        <p>{ currentUser.email }</p>
        <p>{ currentUser.description }</p>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(UserInfo);
