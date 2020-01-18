import React from 'react'
import Media from 'react-media'


export const Mobile = ({children}) => {
  return (
    <Media render={() => children} query={`(max-width: 599px)`} />
  )
}