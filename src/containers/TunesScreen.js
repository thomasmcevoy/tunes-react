import React from 'react'
import { SeekBar, Tune } from '../components'

class TunesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: this.getMarkers()
    }
  }

  componentDidMount() {
    window.scrollTo(0, this.props.scrollPosition)  
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props.sortBy) {
      this.setState({ markers: this.getMarkers() })
    }
  }

  getYearMarker = tune => tune.year < 1900 ? '<' : tune.year.toString().slice(2)
  
  getCharMarker = tune => {
    const marker = tune[this.props.sortBy].charAt(0)
    return !isNaN(parseInt(marker, 10)) ? '#' : marker
  }
  
  getNextMarker = tune => this.props.sortBy === 'year'
    ? this.getYearMarker(tune)
    : this.getCharMarker(tune)

  getMarkers = () => {
    let markers = Array.from(new Set(this.props.tunes.map(tune => 
      this.getNextMarker(tune))))
    while (markers.length > 40)
      markers.splice(Math.floor(Math.random() * markers.length), 1)
    return markers
  }

  getTunelist = () => {
    const { tunes, toggleSelected } = this.props
    const { markers } = this.state
    let idIndex = 0
    let nextId = markers[idIndex]

    const generateTune = (tune, id) => {
      if (id) {
        idIndex += 1
        nextId = markers[idIndex]
      }
      return <Tune 
        id={id} 
        tune={tune} 
        key={tune.title} 
        toggleSelected={toggleSelected}
      />
    }

    return tunes.map(tune => nextId === this.getNextMarker(tune)
      ? generateTune(tune, nextId) 
      : generateTune(tune))
  }

  render() {
    const { sortBy, setAppState } = this.props

    return (
      <div className="Tunes-screen">
        <SeekBar 
          markers={this.state.markers} 
          sortBy={sortBy} 
          setAppState={setAppState}
        />
        <ul className="Tunes-list">
          { this.getTunelist() }
        </ul>
      </div>
    )
  }
}

export default TunesScreen