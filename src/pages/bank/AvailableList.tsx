import React, { ReactNode } from 'react'
import { AvailableUI } from '../../lib'
import { isExtension } from '../../utils/env'
import Card from '../../components/Card'
import Available from './Available'

const AvailableList = ({ title, list, send }: AvailableUI) => {
  const content = list.map((item, i) => (
    <Available {...item} buttonLabel={send} key={i} />
  ))

  const renderCard = (children: ReactNode) => (
    <Card title={title}>{children}</Card>
  )

  return <>{isExtension ? content : renderCard(content)}</>
}

export default AvailableList
