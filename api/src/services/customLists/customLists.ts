import type {
  QueryResolvers,
  MutationResolvers,
  CustomListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const customLists: QueryResolvers['customLists'] = () => {
  return db.customList.findMany()
}

export const customList: QueryResolvers['customList'] = ({ id }) => {
  return db.customList.findUnique({
    where: { id },
  })
}

export const createCustomList: MutationResolvers['createCustomList'] = async ({
  input,
}) => {
  const { name, userId, articleIds } = input

  const createdCustomList = await db.customList.create({
    data: {
      name,
      userId,
      articles: {
        connect: articleIds?.map((articleId) => ({ id: articleId })),
      },
    },
  })

  return createdCustomList
}

export const updateCustomList: MutationResolvers['updateCustomList'] = async ({
  id,
  input,
}) => {
  const { name, userId, articleIds } = input

  const updatedCustomList = await db.customList.update({
    where: { id },
    data: {
      name,
      userId,
      articles: {
        set: articleIds?.map((articleId) => ({ id: articleId })),
      },
    },
  })

  return updatedCustomList
}

export const deleteCustomList: MutationResolvers['deleteCustomList'] = ({
  id,
}) => {
  return db.customList.delete({
    where: { id },
  })
}

export const CustomList: CustomListRelationResolvers = {
  user: (_obj, { root }) => {
    return db.customList.findUnique({ where: { id: root?.id } }).user()
  },
  articles: (_obj, { root }) => {
    return db.customList.findUnique({ where: { id: root?.id } }).articles()
  },
}
