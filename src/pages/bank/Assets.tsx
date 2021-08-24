import React from 'react'
import { useAssets, AssetsUI, User } from '../../lib'
import { isExtension } from '../../utils/env'
import { localSettings } from '../../utils/localStorage'
import { useApp, useRemovePadding } from '../../hooks'
import ErrorComponent from '../../components/ErrorComponent'
import Loading from '../../components/Loading'
import Info from '../../components/Info'
import AvailableList from './AvailableList'
import VestingList from './VestingList'
import AddToken from './AddToken'

const Assets = ({ user }: { user: User }) => {
  useRemovePadding()

  const { hideSmallBalances: hideSmall = false } = localSettings.get()
  const { error, loading, ui } = useAssets(user, { hideSmall })

  const { modal } = useApp()

  const render = ({ card, available, tokens, vesting }: AssetsUI) => (
    <>
      <button onClick={() => modal.open(<AddToken />)}>Add token</button>
      {card && <Info icon="info_outline" {...card} card={!isExtension} />}
      {available && <AvailableList {...available} />}
      {tokens && <AvailableList {...tokens} />}
      {vesting && <VestingList {...vesting} />}
    </>
  )

  return error ? (
    <ErrorComponent error={error} />
  ) : loading ? (
    <Loading card />
  ) : ui ? (
    render(ui)
  ) : null
}

export default Assets
