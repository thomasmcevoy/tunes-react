import React from 'react'
import Hammer from 'hammerjs'
import { SubmenuItem } from '.'

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.sortBys = ['Title', 'Composer', 'Year']
    this.filters = ['All', 'Jazz compositions', 'Standards', 'Contrafacts', 
      'Blues', 'Rhythm changes', 'Ballads', 'Waltzes', 'Minor', 'Latin', 
      'Miles', 'Sinatra', 'Holiday']
  }

  componentDidMount() {
    this.node = document.querySelector('.Menu-drawer')
    this.hammer = new Hammer(this.node)
    this.hammer.get('pan').set({ 
      threshold: 0,
      direction: Hammer.DIRECTION_HORIZONTAL
    })
    this.hammer.on('panstart', e => this.panStart(e))
    this.hammer.on('panmove', e => this.panMove(e))
    this.hammer.on('panend', e => this.panEnd(e))
  }

  panStart = e => {
    this.node.classList.add('is-panning')
    this.node.classList.remove('is-open')
  }

  panMove = e => this.node.style.transform = e.deltaX > 0
    ? `translateX(${e.deltaX}px)`
    : null

  panEnd = e => {
    this.node.classList.remove('is-panning')
    if (e.deltaX < 75) {
      this.node.classList.add('is-open')
      this.props.setAppState({ menuIsOpen: true })
    } else {
      this.node.classList.add('is-closed')
      this.props.setAppState({ menuIsOpen: false })
    }
  }

  getSortBys = () => this.sortBys.map(sortBy => 
    <SubmenuItem
      key={sortBy}
      label={sortBy}
      sortBy={this.props.sortBy}
      setAppState={this.props.setAppState}
    />
  )

  getFilters = () => this.filters.map(filter => 
    <SubmenuItem
      key={filter}
      label={filter}
      filter={this.props.filter}
      setAppState={this.props.setAppState}
    />
  )

  render = () => 
    <div className={'Menu-drawer is-closed'}>
      <div className="Menu-close-button" ref="menuCloseButton" onClick={() => {
        this.node.classList.replace('is-open', 'is-closed')
        this.refs.menuCloseButton.classList.add('active')
        this.props.setAppState({ menuIsOpen: false })
        setTimeout(() => this.refs.menuCloseButton.classList.remove('active'), 300)
      }}>
        ×
      </div>
      <div className="Submenu">
        <div className="Submenu-title Sort-by">Sort</div>
        <div className="Submenu-item-container">
          { this.getSortBys() }
        </div>
      </div>
      <div className="Submenu">
        <div className="Submenu-title Filter">Filter</div>
        <div className="Submenu-item-container">
          { this.getFilters() }
        </div>
      </div>
    </div>
}

export default MenuDrawer