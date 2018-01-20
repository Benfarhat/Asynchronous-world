//
console.clear()
console.log('Starting Callback')
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

var testGet = (url, success, error, nb) => { // success and error are our callbacks
  var xhr = NewXMLHttpRequest()
  // ONLOAD
  xhr.onload = (evt) => {
    console.log(nb + ': onload event, after successfully fecthing and receiving data...')
    if (xhr.readyState === 4 && xhr.status === 200) {
      success(xhr.responseText) // calling success callback
    } else {
      error(xhr)
    }
  }
  // ONLOADSTART
  xhr.onloadstart = (evt) => {
    console.log(nb + ': onloadstart event, Start of data transfer...')
  }
  // ONLOADEND
  xhr.onloadend = (evt) => {
    console.log(nb + ': onloadend event, End of data transfer...')
  }
  // ONERROR
  xhr.onerror = (evt) => {
    console.log(nb + ': error event...')
    error(evt)
  }

  xhr.open('GET', url, true)
  xhr.send()
}

var goodURL = 'https://jsonplaceholder.typicode.com/users'
var wrongURL = 'https://jsonplaceholder.typicode.common/users'

testGet(goodURL, (response) => { // Implementing success callback
  console.log(`
  *****************
       SUCCESS 
  *****************`)
  var users = JSON.parse(response)
  console.log(users[0]) // Displaying first user
}, (e) => { // Implementing error callback
  console.log(`
  *****************
        ERROR 
  *****************`)
  console.log(`ReadyState: ${e.target.readyState} - Status: ${e.target.status}`)
}, '0')

testGet(wrongURL, (response) => { // Implementing success callback
  console.log(`
  *****************
       SUCCESS 
  *****************`)
  var users = JSON.parse(response)
  console.log(users[0]) // Displaying first user
}, (e) => { // Implementing error callback
  console.log(`
  *****************
        ERROR 
  *****************`)
  console.log(`ReadyState: ${e.target.readyState} - Status: ${e.target.status}`)
}, '1')
