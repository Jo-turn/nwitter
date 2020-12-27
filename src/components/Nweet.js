import React from 'react'

const Nweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete button</button>
        <button>Edit button</button>
      </>
    )}
  </div>
)

export default Nweet
