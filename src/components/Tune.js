import React from 'react'
import classNames from 'classnames'

const Tune = ({ id, tune, toggleSelected }) =>
  <li 
    id={id} 
    onClick={() => toggleSelected(tune)} 
    className={classNames({ 'Tune': true, 'selected': tune.selected })}
  >
    <div className="Tune-title">{tune.title}</div>
    <div className="Tune-detail">{tune.composer} ({tune.year})</div>
  </li>

export default Tune