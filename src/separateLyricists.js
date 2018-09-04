var fs = require('fs')
var tunes = require('./tunes.common.js')

const separateLyricists = tunes => tunes.map(tune => {
    if (tune.composer.indexOf('/') !== -1) {
      const separated = tune.composer.split('/')
      tune.composer = separated[0]
      tune.lyricist = separated[1]
    }
    return tune
  })

const tunesNew = separateLyricists(tunes)
console.log(tunesNew)

fs.writeFile('./tunes.new.js', JSON.stringify(tunesNew), function(err) {
  if (err) {
    return console.log(err)
  }

  console.log('success.')
})