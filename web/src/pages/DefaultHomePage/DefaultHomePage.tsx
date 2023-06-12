// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DefaultHomePage = () => {
  return (
    <>
      <MetaTags title="DefaultHome" description="DefaultHome page" />
      <div
        className="main-container bg-blue-200"
        style={{ height: '100vh', width: '99vw' }}
      >
        <div className="main-home-page bg-yellow-400">
          <div className="main-header-containe w-64 bg-red-300">
            <img
              // src="https://wallpapers.com/images/hd/hd-sunset-at-beach-w5ped7x6g3uo2o76.jpg"
              alt="Main-Header"
              className=""
            ></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultHomePage
