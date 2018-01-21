// @todo Check all this code
// Node have problem with object inside request
// and after adding
// jshin esnext: true asi:true
// jsbin seems to have problème with esnext

const url1 = 'https://jsonplaceholder.typicode.com/comments'
// const url2 = 'https://fetch-svg-abort.glitch.me/svg'

if (typeof window === 'undefined') { // Node.js env
  console.log('Node environment ...\n\n')
  var fetch = require('node-fetch')
  var AbortController = require('abort-controller')
  // var Request = require('request')
}

(async () => {
  const controller = new AbortController()
  const signal = controller.signal
  let data = null
  setTimeout(() => {
    if (controller) {
      controller.abort()
      if (typeof data === 'undefined') {
        console.log('Sending abort signal')
      } else {
        console.log('too late!')
      }
    }
  }, 100)

  try {
    const response = await fetch(url1, { signal })

    data = await response.text()
    console.log(data.substring(0, 80) + ' ...')
    console.log('End of loading...')
  } catch (err) {
    console.log(err)
    if (err.name !== 'AbortError') {
      console.log('The operation was aborted. ')
    }
  }
})()
