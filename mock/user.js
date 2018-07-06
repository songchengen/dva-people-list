import Mock from 'mockjs'

const { mock } = Mock;

/**
 * 因为只存在查询操作，可以让每次获取到的用户列表相同，所以给个单例。
 * 切忌在开发中使用。。。
 */
const getAll = (function () {
  let user = null;
  return function () {
    return user ? user: user = mock({
      'data|10-20': [
        {
          id: '@increment',
          name: '@name',
          nickName: '@last',
          phone: /^1[34578]\d{9}$/,
          'age|11-99': 1,
          address: '@county(true)',
          isMale: '@boolean',
          email: '@email',
          createTime: '@datetime',
          avatar () {
            return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
          },
          description: '@sentence',
        }
      ]
    })
  }
})();

/**
 * 不存在数据更新，所以加个缓存
 * 切记慎用
 */
const getUser = (function () {
  let userCache = {};

  return function (id) {
    if(userCache[id]) return userCache[id];
    return userCache[id] = getAll().data.filter(user => user.id === id)[0];
  }
})();

/**
 * 获取所有用户数据，不分页了...
 * @param req
 * @param res
 */
export function getUserList(req, res) {
  res.json({
    errcode: 0,
    ...getAll(),
  })
}

/**
 * 根据ID检索用户
 * @param req
 * @param res
 */
export function getUserById(req, res) {
  const { id } = req.query;

  res.json({
    errcode: 0,
    data: getUser(1 * id)
  })
}
