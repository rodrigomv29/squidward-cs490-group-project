import { Link, routes } from '@redwoodjs/router'

type NewsLayoutProps = {
  children?: React.ReactNode
}

const NewsLayout = ({ children }: NewsLayoutProps) => {
  return (
    <>
      <header>
        <h1>Squidward News</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default NewsLayout
