import React from 'react'
import { SetlistTune } from '../components'

class SetlistScreen extends React.Component {
  componentDidMount() {
    window.scrollTo(0, this.props.scrollPosition)
  }

  render() {
    const { setlist, toggleSelected } = this.props

    return (
      <div className="Screen Setlist-screen">
        <ul className="Setlist">
          {setlist.map((tune, index) => (
            <SetlistTune
              key={tune.title}
              index={index}
              tune={tune}
              toggleSelected={toggleSelected}
            />
          ))}
        </ul>
        <div className="Setlist-background"/>
      </div>
    )
  }
}

export default SetlistScreen