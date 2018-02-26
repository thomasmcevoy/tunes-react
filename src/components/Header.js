import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

const Header = ({ menuIsOpen, animateOpenMenu, setAppState }) =>
  <header className="App-header">
    <div className="Router">
      <NavLink className="Router-link" to="/tunes">Tunes</NavLink>
      <NavLink className="Router-link" to="/setlist">Setlist</NavLink>
      <NavLink className="Router-link" to="/random">Random</NavLink>
    </div>
    <svg viewBox="0 0 26 26" width="50px" height="50px"
      onClick={() => {
        document.querySelector('.Menu-drawer').classList.replace(
          'is-closed', 'is-open')
        setAppState({ menuIsOpen: true })
      }}
      className={classNames({ 'Menu-open-button': true, 'active': menuIsOpen})}
    >
      <path d="M 0 4 L 0 6 L 26 6 L 26 4 Z M 0 12 L 0 14 L 26 14 L 26 12 Z M 0 20 L 0 22 L 26 22 L 26 20 Z "/>
    </svg>
  </header>

export default Header