import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const articles: QueryResolvers['articles'] = () => {
  return db.article.findMany()
}

export const article: QueryResolvers['article'] = ({ id }) => {
  return db.article.findUnique({
    where: { id },
  })
}

export const createArticle: MutationResolvers['createArticle'] = ({
  input,
}) => {
  return db.article.create({
    data: input,
  })
}

export const updateArticle: MutationResolvers['updateArticle'] = ({
  id,
  input,
}) => {
  return db.article.update({
    data: input,
    where: { id },
  })
}

export const deleteArticle: MutationResolvers['deleteArticle'] = ({ id }) => {
  return db.article.delete({
    where: { id },
  })
}
