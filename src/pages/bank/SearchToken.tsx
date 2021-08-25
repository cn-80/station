import { AccAddress } from '@terra-money/terra.js'
import { useState } from 'react'
import { Token } from '../../lib'
import useWhitelist from '../../lib/cw20/useWhitelist'
import { TokenItem } from './TokenItem'
import styles from './SearchToken.module.scss'

const SearchToken = () => {
  const { whitelist } = useWhitelist()
  const [input, setInput] = useState('')

  const filter = ([token, { symbol }]: [string, Token]) =>
    symbol.toLowerCase().includes(input.toLowerCase()) ||
    (AccAddress.validate(input) && token.includes(input))

  return !whitelist ? null : (
    <>
      <input
        className={styles.search}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search token"
      />

      <ul className={styles.list}>
        {Object.entries(whitelist)
          .filter(filter)
          .map(([address, token]) => {
            return (
              <li className={styles.item} key={address}>
                <TokenItem {...token} />
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default SearchToken
