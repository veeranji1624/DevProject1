import React from 'react'

const Hover = ({ cords, labels, mouse }) => {
  let hoverBoxStyle = {
    position: 'fixed',
    top: `${mouse.y - 50}px`,
    left: `${mouse.x}px`,
    zIndex: 50,    
  }  
  return (
    <div style={hoverBoxStyle} className="hover-box">
      <p className="label-sm bold">{labels.one}:</p>
      <p className="label-sm">{cords&&cords.one}</p>
      {labels.two ? 
      <div>
      <hr />
      <p className="label-sm bold">{labels.two}:</p>
      <p className="label-sm">{cords&&cords.two}</p>
      </div>
      : null}
    </div>
  )
}

export default Hover;