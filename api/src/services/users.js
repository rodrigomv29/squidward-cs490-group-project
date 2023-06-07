import { db } from 'src/lib/db'

export const createUser = ({ input }) => {
  return db.user.create({
    data: {
      username: input.username,
      password: input.password,
    },
    select: {
      id: true,
      username: true,
    },
  })
}
