import { useState } from 'react'
import { Token, Whitelist } from '../../lib'
import styles from './SearchToken.module.scss'

const TokenItem = ({ token, symbol, decimals, icon }: Token) => (
  <article className={styles.item}>
    <img src={icon} alt="" width={32} height={32} />

    <section className={styles.details}>
      <h1>{symbol}</h1>
      <small>{token}</small>
      {decimals && <p>{decimals}</p>}
    </section>
  </article>
)

const SearchToken = ({ whitelist }: { whitelist: Whitelist }) => {
  const [input, setInput] = useState('')
  const filter = ([token, { symbol }]: [string, Token]) =>
    symbol.toLowerCase().includes(input.toLowerCase()) || token.includes(input)

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <ul className={styles.list}>
        {Object.entries(whitelist)
          .filter(filter)
          .map(([address, token]) => (
            <li key={address}>
              <TokenItem {...token} />
            </li>
          ))}
      </ul>
    </>
  )
}

export default SearchToken
