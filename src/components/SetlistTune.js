import React from 'react'
import Hammer from 'hammerjs'

class SetlistTune extends React.Component {
  componentDidMount() {
    this.hammer = Hammer(this.refs.setlistTune)
    this.hammer.on('panstart', e => this.panStart(e))
    this.hammer.on('panmove', e => this.panMove(e))
    this.hammer.on('panend', e => this.panEnd(e))
  }

  componentWillUnmount() {
    this.hammer.off('panstart', e => this.panStart(e))
    this.hammer.off('panmove', e => this.panMove(e))
    this.hammer.off('panend', e => this.panEnd(e))
  }

  panStart = e => this.refs.setlistTune.classList.add('is-panning')

  panMove = e => {
    if (e.deltaX <= 0) {
      const getXFontSize = dx => dx < 75 ? (dx / 50).toString() + 'em' : '1.25em'
      this.refs.setlistTune.style.transform = `translateX(${e.deltaX}px)`
      this.refs.x.style.fontSize = getXFontSize(Math.abs(e.deltaX))
    }
  }

  panEnd = e => {
    this.refs.setlistTune.classList.remove('is-panning')

    if (e.deltaX > -75) 
      this.refs.setlistTune.style.transform = 'translateX(0)'
    else {
      this.refs.setlistTune.classList.add('far-left')
      this.refs.setlistTuneContainer.classList.add('zero-height')
      setTimeout(() => this.props.toggleSelected(this.props.tune), 300)
    }
  }

  render() {
    const { tune } = this.props
    
    return (
      <li className="Setlist-tune-container" ref="setlistTuneContainer">
        <div className="Setlist-tune" ref="setlistTune">
          <div className="Tune-title">{tune.title}</div>
          <div className="Tune-detail">{tune.composer} ({tune.year})</div>
        </div>
        <div className="x-container">
          <div className="x" ref="x">×</div>
        </div>
      </li>
    )
  }
}

export default SetlistTune