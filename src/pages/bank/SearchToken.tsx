import { AccAddress } from '@terra-money/terra.js'
import { without } from 'ramda'
import { useState } from 'react'
import Checkbox from '../../components/Checkbox'
import { Token, Whitelist } from '../../lib'
import styles from './SearchToken.module.scss'

const TokenItem = ({ token, symbol, decimals, icon }: Token) => (
  <article className={styles.token}>
    <img src={icon} alt="" width={32} height={32} />

    <section className={styles.details}>
      <h1>{symbol}</h1>
      <small>
        {token} (decimals: {decimals ?? '6'})
      </small>
    </section>
  </article>
)

const SearchToken = ({ whitelist }: { whitelist: Whitelist }) => {
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState<string[]>([])

  const filter = ([token, { symbol }]: [string, Token]) =>
    symbol.toLowerCase().includes(input.toLowerCase()) ||
    (AccAddress.validate(input) && token.includes(input))

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <ul className={styles.list}>
        {Object.entries(whitelist)
          .filter(filter)
          .map(([address, token]) => {
            const isChecked = checked.includes(address)
            const handleClick = () => {
              setChecked((checked) =>
                isChecked ? without([address], checked) : [...checked, address]
              )
            }

            return (
              <li className={styles.item} key={address}>
                <Checkbox onClick={handleClick} checked={isChecked}>
                  <TokenItem {...token} />
                </Checkbox>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default SearchToken
