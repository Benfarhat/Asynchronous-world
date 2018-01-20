//
console.clear()
console.log('Starting Promise')
var debug = false
var NewXMLHttpRequest = () => {
  let xhr = null
  if (typeof window === 'undefined') { // Node.js env
    // Need to install xmlhttprequest module
    // npm i -g xhr2
    var XMLHttpRequest = require('xhr2').XMLHttpRequest
    xhr = new XMLHttpRequest()
  } else { // Browser env
    if (window.XMLHttpRequest || window.ActiveXObject) {
      if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
      } else {
        xhr = new XMLHttpRequest()
      }
    } else {
      console.error('Your browser do not support XMLHTTPRequest object...')
    }
  }

  return xhr
}

var testGet = (url) => {
  return new Promise((resolve, reject) => {
    var xhr = NewXMLHttpRequest()
    // ONLOAD
    xhr.onload = (evt) => {
      if (debug) console.log('onload event, after successfully fecthing and receiving data...')
      resolve(xhr.responseText)
    }
    // ONLOADSTART
    xhr.onloadstart = (evt) => {
      if (debug) console.log('onloadstart event, Start of data transfer...')
    }
    // ONLOADEND
    xhr.onloadend = (evt) => {
      if (debug) console.log('onloadend event, End of data transfer...')
    }
    // ONERROR
    xhr.onerror = (evt) => {
      if (debug) console.log('error event...')
      reject(evt)
    }

    xhr.open('GET', url, true)
    xhr.send()
  })
}

var url1 = 'https://jsonplaceholder.typicode.com/users'
var url2 = 'https://jsonplaceholder.typicode.com/posts?userId='
var url3 = 'https://jsonplaceholder.typicode.com/comments?postId='

var simulateError = false
function SimulatedException (message) {
  this.message = message
  this.name = 'ExceptionSimulated'
}

var catchError = (e) => console.error('Ajax Error: ', e)

var getComments = async () => {
  var response = await testGet(url1)
  var users = JSON.parse(response)
  response = await testGet(url2 + users[0].id)
  var posts = JSON.parse(response)
  response = await testGet(url3 + posts[0].id)
  var comments = JSON.parse(response)
  return comments
}

var getFirstComments = async () => {
  var response = await testGet(url1)
  var users = JSON.parse(response)
  response = await testGet(url2 + users[0].id)
  var posts = JSON.parse(response)
  response = await testGet(url3 + posts[0].id)
  // Simulating error
  if (simulateError) throw new SimulatedException('A simulated error has occurred...')
  var comments = JSON.parse(response)
  return comments[0]
}

/* First method */

Promise.all([getComments(), getFirstComments()]).then((arr) => {
  // arr[0] resolve the first promise and arr[1] the second promise
  arr.forEach((elt) => {
    if (Array.isArray(elt)) {
      elt.forEach((v, i) => {
        console.log('\t\t-' + i + '- ' + v.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
      })
    } else {
      console.log('\t\t-0- ' + elt.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
    }
  })
}).catch(catchError).then(() => console.log('Finished!'))

/* Second method */

var getAll1 = async () => {
  try {
    var arr = await Promise.all([getComments(), getFirstComments()])
    arr.forEach((elt) => {
      if (Array.isArray(elt)) {
        elt.forEach((v, i) => {
          console.log('\t\t-' + i + '- ' + v.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
        })
      } else {
        console.log('\t\t-0- ' + elt.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
      }
    })
  } catch (e) {
    console.error('Ajax Error: ', e)
  }
}

/* Third method */

var getAll2 = async () => {
  var arr = await Promise.all([getComments(), getFirstComments()]).catch(catchError)
  if (typeof arr !== 'undefined') {
    arr.forEach((elt) => {
      if (Array.isArray(elt)) {
        elt.forEach((v, i) => {
          console.log('\t\t-' + i + '- ' + v.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
        })
      } else {
        console.log('\t\t-0- ' + elt.body.replace(/(\r\n|\n|\r)/gm, '').substring(0, 20) + ' ...')
      }
    })
  }
}
getAll1()
getAll2()
