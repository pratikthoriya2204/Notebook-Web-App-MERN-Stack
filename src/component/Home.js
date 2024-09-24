import React from 'react'
import Notes from './Notes'

export default function Home(props) {

  const {showALert} = props

  return (
   <>
   <Notes showALert={showALert}/>
   </>
  )
}
