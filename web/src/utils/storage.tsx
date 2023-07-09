export const setStatus = (status: number) => {
  localStorage.setItem('status', String(status))
}

export const getFirstRender = () => {
  const status: string = localStorage.getItem('first_render')
  return status ? parseInt(status, 10) : null
}

// Get the status from local storage
export const getStatus = () => {
  const status: string = localStorage.getItem('status')
  return status ? parseInt(status, 10) : null
}

export const isHomePage = (status: number) => {
  localStorage.setItem('isHomePage', String(status))
}

export const getIsHomePage = () => {
  const isHomePage: number = parseInt(localStorage.getItem('isHomePage'), 10)
  if (isHomePage === 1) {
    return true
  } else {
    return false
  }
}

const insertionSort = (array) => {
  const length = array?.length

  for (let i = 1; i < length; i++) {
    const current = array[i]
    let j = i - 1

    while (j >= 0 && array[j]?.publishedAt < current?.publishedAt) {
      array[j + 1] = array[j]
      j--
    }

    array[j + 1] = current
  }

  return array
}

export const sortArticlesByDate = (articleArray) => {
  insertionSort(articleArray)
  return articleArray
}
