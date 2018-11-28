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

    if (id 
     && lastScrolledTo !== id 
     && target 
     && marker 
     && marker.classList.contains('Seekbar-marker')) {
      const headerHeight = document.querySelector('.App-header').clientHeight
      window.scrollTo(0, target.offsetTop - headerHeight)
      this.setState({ lastScrolledTo: id })
      this.props.setAppState({ tunesScrollPosition: target.offsetTop })
    }
  }

  disableScrolling = () => {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
  }

  enableScrolling = () => {
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
  }

  onTouchStart = (e) => {
    this.disableScrolling()
    this.props.setAppState({ seekbarIsVisible: true })
    this.scrollToMarker(e)
  }

  onTouchMove = (e) => {
    this.scrollToMarker(e)
  }

  onTouchEnd = (e) => {
    this.enableScrolling()
    this.props.setAppState({ seekbarIsVisible: false })
  }

  componentDidMount() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  }

  render() {
    const { markers, seekbarIsVisible, sortBy } = this.props

    return (
      <div className="Seekbar-container"
        style={{height: this.state.height}}
        onTouchStart={this.onTouchStart} 
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <div className={classNames({
          "Seekbar": true,
          "visible": seekbarIsVisible,
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