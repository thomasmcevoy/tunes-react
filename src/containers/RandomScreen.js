import React from 'react'
import classNames from 'classnames'

const RandomScreen = ({ randomTune, getNewRandomTune, toggleSelected, setAppState }) =>
  <div className="Random-screen">
    <div className={classNames({
        "Random-tune": true,
        "selected": randomTune.selected
      })}
      onClick={() => {
        toggleSelected(randomTune)
        setTimeout(() => setAppState({ randomTune: getNewRandomTune() }), 300)
      }}
    >
      <span className="Random-tune-title">{randomTune.title}</span>
      <span className="Random-tune-detail">
        {randomTune.composer} ({randomTune.year})
      </span>
    </div>
    <div className="Next-button" onClick={() => setAppState({ 
      randomTune: getNewRandomTune() 
    })}>
      NEXT
    </div>
  </div>

export default RandomScreen