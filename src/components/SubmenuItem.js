import React from 'react'
import classNames from 'classnames'

const SubmenuItem = ({ label, sortBy, filter, setAppState }) => {
  const labelLowerCase = label.toLowerCase()

  const onClick = () => sortBy 
    ? setAppState({ sortBy: labelLowerCase }) 
    : setAppState({ filter: labelLowerCase })
  
  const getClassNames = () => {
    const current = sortBy ? sortBy : filter
    return classNames({
      'Submenu-item': true,
      'active': current === labelLowerCase
    })
  }
  
  return (
    <div className={getClassNames()} onClick={() => onClick()}>
      { label }
    </div>
  )
}

export default SubmenuItem