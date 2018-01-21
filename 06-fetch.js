var url1 = 'https://jsonplaceholder.typicode.com/users'
var url2 = 'https://jsonplaceholder.typicode.com/posts?userId='
var url3 = 'https://jsonplaceholder.typicode.com/comments?postId='

var wrongURLInvalidCertificate = 'https://www.invalid.com'
var wrongURL = 'http://www.invalid.wrong'
var simulateError = false // Check fetch's reponse with invalid url

if (typeof window === 'undefined') { // Node.js env
  var fetch = require('node-fetch')
}

var catchError = (err) => {
  console.log('-----Start Error MSG-------')
  console.log(err.name + ': ' + err.message)
  console.log('-----End Error MSG-------')
}

if (simulateError) {
  fetch(wrongURLInvalidCertificate)
    .catch(catchError)
  fetch(wrongURL)
    .catch(catchError)
}

function status (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json (response) {
  return response.json()
}

var getComments = () => {
  return fetch(url1)
    .then(status)
    .then(json)
    .then((data) => fetch(url2 + data[0].id))
    .then(status)
    .then(json)
    .then((data) => fetch(url3 + data[0].id))
    .then(status)
    .then(json)
    .catch((error) => { console.log('Request failed', error) })
}

getComments().then((response) => {
  response.forEach((v, i) => {
    console.log('\t\t-' + i + '- ' + v.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
  })
}).catch(catchError).then(() => console.log('Finished!'))
