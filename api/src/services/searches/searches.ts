import type {
  QueryResolvers,
  MutationResolvers,
  SearchRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const searches: QueryResolvers['searches'] = () => {
  return db.search.findMany()
}

export const search: QueryResolvers['search'] = ({ id }) => {
  return db.search.findUnique({
    where: { id },
  })
}

export const createSearch: MutationResolvers['createSearch'] = ({ input }) => {
  return db.search.create({
    data: input,
  })
}

export const updateSearch: MutationResolvers['updateSearch'] = ({
  id,
  input,
}) => {
  return db.search.update({
    data: input,
    where: { id },
  })
}

export const deleteSearch: MutationResolvers['deleteSearch'] = ({ id }) => {
  return db.search.delete({
    where: { id },
  })
}

export const Search: SearchRelationResolvers = {
  User: (_obj, { root }) => {
    return db.search.findUnique({ where: { id: root?.id } }).User()
  },
}
