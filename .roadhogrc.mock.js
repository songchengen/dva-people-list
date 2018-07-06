
import { getUserList, getUserById } from './mock/user'

export default {
  'GET /api/users': getUserList,
  'GET /api/user': getUserById,
};
