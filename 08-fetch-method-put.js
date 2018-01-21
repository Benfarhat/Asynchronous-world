const url = 'https://jsonplaceholder.typicode.com/posts/1'

if (typeof window === 'undefined') { // Node.js env
  console.log('Node environment ...')
  var fetch = require('node-fetch')
}

// Common functions (status end json) for all fetch calls
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

fetch(url, {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'Another Title',
    body: 'This is the content of my super, sensational, fantastic, very long and annoying message',
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then(status)
  .then(json)
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log('Fetch Error :-S', error)
  })
