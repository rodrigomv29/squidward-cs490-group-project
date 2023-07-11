import type {
  QueryResolvers,
  MutationResolvers,
  ArticleRelationResolvers,
} from 'types/graphql'

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

export const Article: ArticleRelationResolvers = {
  Category: (_obj, { root }) => {
    return db.article.findUnique({ where: { id: root?.id } }).Category()
  },
}

export const getAllArticles = async () => {
  return db.article.findMany()
}

export const getArticleById: QueryResolvers['article'] = ({ id }) => {
  return db.article.findUnique({
    where: { id },
  })
}
