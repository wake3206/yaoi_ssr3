const api = () =>{

  return (process.env.url_api !== undefined) ? process.env.url_api:"http://localhost:3003"
}

exports = {
  api
}