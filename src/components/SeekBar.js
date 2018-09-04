import React from 'react'
import classNames from 'classnames'

class SeekBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      lastScrolledTo: null,
      height: window.innerHeight - 48,
    }
  }

  setHeight = () => this.setState({ height: this.getHeight() })

  getHeight = () => {
    const { innerHeight } = window
    const { offsetHeight } = document.getElementsByTagName('header')[0]
    return innerHeight - offsetHeight
  }

  scrollToMarker = (e) => {
    const { lastScrolledTo } = this.state
    const { clientX, clientY } = e.nativeEvent.touches[0]
    const marker = document.elementFromPoint(clientX, clientY)
    const id = marker ? marker.innerText : undefined
    const target = document.getElementById(id)

    if (id && lastScrolledTo !== id && target && marker && marker.classList.contains('Seekbar-marker')) {
      const headerHeight = document.querySelector('.App-header').clientHeight
      window.scrollTo(0, target.offsetTop - headerHeight)
      this.setState({ lastScrolledTo: id })
      this.props.setAppState({ tunesScrollPosition: target.offsetTop })
    }
  }

  onTouchStart = (e) => {
    e.preventDefault()
    this.scrollToMarker(e)
    this.setState({ visible: true })
  }

  onTouchMove = (e) => {
    e.preventDefault()
    this.scrollToMarker(e)
  }

  onTouchEnd = (e) => {
    e.preventDefault()
    this.setState({ visible: false })
  }

  componentDidMount() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
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
          "visible": this.state.visible
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
  }
}

export default SeekBar