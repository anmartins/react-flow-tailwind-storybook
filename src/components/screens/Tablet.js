import React from 'react'
import Media from 'react-media'

const tabletWidth = 1000

export const Tablet = ({children}) => {
  return (
    <Media render={() => children} query={`(min-width: 600px) and (max-width: 999px)`} />
  )
}

export const FromTablet = ({children}) => {
  return (
    <Media render={() => children} query={`(min-width: 600px)`} />
  )
}
