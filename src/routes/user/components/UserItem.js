import React from 'react'

import styles from './UserItem.css';
const UserItem = ({ user, onClickItem }) => {
  return (
    <li className={styles.li} onClick={() => onClickItem(user.id)}>
      <span className={styles.badge} >{ user.id }</span>
      { user.nickName }
      <span className={ `${styles.sex} ${user.isMale ? styles.male : styles.female}` }> { user.isMale ? 'M' : 'F' } </span>
    </li>
  )
}

export default UserItem;
