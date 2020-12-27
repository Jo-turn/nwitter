import Nweet from 'components/Nweet'
import { dbService } from 'myBase'
import React, { useEffect, useState } from 'react'

const Home = ({ userObj }) => {
  // console.log(userObj)
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetArray)
    })
  }, [])
  const onSubmit = async e => {
    e.preventDefault()
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
    setNweet('')
  }
  const onChange = e => {
    const {
      target: { value },
    } = e
    setNweet(value)
  }
  // console.log(nweets)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.id}
          />
        ))}
      </div>
    </div>
  )
}
export default Home
