import { useAddTokens } from '../../data/local'
import { Token } from '../../lib'
import styles from './TokenItem.module.scss'

export const TokenItem = (item: Token) => {
  const { token, symbol, decimals, icon } = item
  const addTokens = useAddTokens()
  const add = () => addTokens({ [token]: item })

  return (
    <article className={styles.token}>
      <img src={icon} alt="" width={32} height={32} />

      <section className={styles.details}>
        <header>
          <h1>{symbol}</h1>
          <button onClick={add}>+Add</button>
        </header>

        <small>
          {token} (decimals: {decimals ?? '6'})
        </small>
      </section>
    </article>
  )
}
