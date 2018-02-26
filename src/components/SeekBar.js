import React from 'react'
import classNames from 'classnames'

class SeekBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: window.innerHeight - 48,
      isActive: false,
      lastScrolledTo: null
    }
  }

  componentDidMount() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
  }

  getHeight = () => {
    const { innerHeight } = window
    const { offsetHeight } = document.getElementsByTagName('header')[0]
    return innerHeight - offsetHeight
  }

  setHeight = () => this.setState({ height: this.getHeight() })

  onTouchStart = e => {
    this.setState({ isActive: true })
    this.onTouchMove(e)
  }

  onTouchMove = e => {
    e.preventDefault()

    const { lastScrolledTo } = this.state
    const { clientX, clientY } = e.nativeEvent.touches[0]
    const marker = document.elementFromPoint(clientX, clientY)
    const id = marker ? marker.innerText : undefined
    const target = document.getElementById(id)

    if (id && lastScrolledTo !== id && target && marker && 
        marker.classList.contains('Seekbar-marker')) {
      const headerHeight = document.querySelector('.App-header').clientHeight
      window.scrollTo(0, target.offsetTop - headerHeight)
      this.setState({ lastScrolledTo: id })
      this.props.setAppState({ tunesScrollPosition: target.offsetTop })
    }
  }

  onTouchEnd = e => {
    this.setState({ isActive: false })
    e.preventDefault()
  }

  render() {
    const { markers, sortBy } = this.props

    return (
      <div className="Seekbar-container"
        style={{height: this.state.height}}
        onTouchStart={this.onTouchStart} 
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <div className={classNames({
          "Seekbar": true,
          "visible": this.state.isActive
        })}>
          {markers.map(marker => 
            <div key={marker} className={classNames({
              "Seekbar-marker": true,
              "Seekbar-marker-number": sortBy === 'year'
            })}>
              { marker }
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SeekBar