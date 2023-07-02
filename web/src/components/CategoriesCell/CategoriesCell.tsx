import type { CategoriesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query CategoriesQuery {
    categories {
      id
      name
      articles {
        sourceName
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ categories }: CellSuccessProps<CategoriesQuery>) => {
  return (
    <ul>
      {categories.map((item) => {
        console.log(item)
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
