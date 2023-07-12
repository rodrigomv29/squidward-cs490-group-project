import type {
  QueryResolvers,
  MutationResolvers,
  UserArticleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userArticles: QueryResolvers['userArticles'] = () => {
  return db.userArticle.findMany()
}

export const userArticle: QueryResolvers['userArticle'] = ({ id }) => {
  return db.userArticle.findUnique({
    where: { id },
  })
}

export const createUserArticle: MutationResolvers['createUserArticle'] = ({
  input,
}) => {
  return db.userArticle.create({
    data: input,
  })
}

export const updateUserArticle: MutationResolvers['updateUserArticle'] = ({
  id,
  input,
}) => {
  return db.userArticle.update({
    data: input,
    where: { id },
  })
}

export const deleteUserArticle: MutationResolvers['deleteUserArticle'] = ({
  id,
}) => {
  return db.userArticle.delete({
    where: { id },
  })
}

export const UserArticle: UserArticleRelationResolvers = {
  Category: (_obj, { root }) => {
    return db.userArticle.findUnique({ where: { id: root?.id } }).Category()
  },
  customList: (_obj, { root }) => {
    return db.userArticle.findUnique({ where: { id: root?.id } }).customList()
  },
}
