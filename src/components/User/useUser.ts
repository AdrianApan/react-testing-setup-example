import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { navigate } from '@reach/router'

import { getUser } from '../../state/slices/user.slice'

const useExample = (userID: number) => {
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser(userID))
  }, [userID])

  const onPrev = () => navigate(`/people/${userID - 1}`)

  const onNext = () => navigate(`/people/${userID + 1}`)

  return { isHidden, setIsHidden, onPrev, onNext }
}

export default useExample
