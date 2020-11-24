require('eventsource-polyfill')

const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscrite((event) => {
  if (event.action === 'reload') {
    window.location.reload()
    console.log('windowReload')
  }
})