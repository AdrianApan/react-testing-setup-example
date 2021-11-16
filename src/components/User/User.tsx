import React from 'react'
import { Box, Typography, Button, Divider } from '@material-ui/core'
import { useParams, RouteComponentProps } from '@reach/router'

import { useTypedSelector } from '../../state/reducers'
import UserInterface from '../../types/user'

import { humanize } from '../../utils'
import useUser from './useUser'

const User = (props: RouteComponentProps) => {
  const { details, isLoading, isError } = useTypedSelector((state) => state?.user)
  const { userID } = useParams()
  const { isHidden, setIsHidden, onPrev, onNext } = useUser(Number(userID))
  const displayedFields = [
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
  ]

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>
  }

  if (isError) {
    return <Typography variant="h5">Something went wrong. Please try again.</Typography>
  }

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">{details?.name}</Typography>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setIsHidden((prevIsHidden) => !prevIsHidden)}
        >
          Toggle details
        </Button>
      </Box>

      <Divider />

      <Box mt={2} mb={2}>
        {isHidden
          ? 'Details are hidden'
          : Object.entries(details as Partial<UserInterface>)
              .filter(([key]) => displayedFields.includes(key))
              .map(([key, value]) => (
                <Box mt={1} key={key}>
                  <strong>{humanize(key)}:</strong> {value}
                </Box>
              ))}
      </Box>

      <Divider />

      <Box display="flex" mt={2} justifyContent="flex-end">
        <Box ml={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onPrev}
            disabled={Number(userID) <= 1}
          >
            Previous user
          </Button>
        </Box>
        <Box ml={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onNext}
            disabled={Number(userID) >= 5}
          >
            Next user
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default User
