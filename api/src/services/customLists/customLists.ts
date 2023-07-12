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

export const createCustomList: MutationResolvers['createCustomList'] = ({
  input,
}) => {
  return db.customList.create({
    data: input,
  })
}

export const updateCustomList: MutationResolvers['updateCustomList'] = ({
  id,
  input,
}) => {
  return db.customList.update({
    data: input,
    where: { id },
  })
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
