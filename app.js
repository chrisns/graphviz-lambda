var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder()
module.exports = api

const rp = require('request-promise-native')

const child = require('child_process')

const handler = url => rp(`https://raw.githubusercontent.com/${url}`)
  .then(graph => child.spawnSync("./dot_static", ["-Tsvg"], { input: graph }).stdout.toString())

api.get('', request => handler(request.queryString.dot), { success: { contentType: 'image/svg+xml' } })

api.get('/{dot+}', request => handler(request.pathParams.dot), { success: { contentType: 'image/svg+xml' } })
