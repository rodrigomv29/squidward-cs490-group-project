/* eslint-disable prettier/prettier */
//use this as for fetching requests
require('dotenv').config();
const KEY = process.env.API_KEY;

async function fetchWebApi() {
  const url = 'https://newsapi.org/v2/top-headlines?' +
            'sources=bbc-news&'+
            'pageSize=10&' +
            `apiKey=${KEY}`;

  const req = new Request(url);

  const res = await fetch(req)
      .then(function(response) {
          return response.json()
      })
  console.log(res.articles);
}

async function getNewsRequest(){
  return (await fetchWebApi());
}
getNewsRequest();
