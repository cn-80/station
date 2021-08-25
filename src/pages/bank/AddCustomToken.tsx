import { useEffect, useState } from 'react'
import { AccAddress } from '@terra-money/terra.js'
import { Token, Whitelist } from '../../lib'
import useLCD from '../../lib/api/useLCD'
import { TokenItem } from './TokenItem'
import styles from './AddCustomToken.module.scss'

const AddCustomToken = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Whitelist>({})
  const lcd = useLCD()

  useEffect(() => {
    const search = async () => {
      try {
        const info = await lcd.wasm.contractQuery<Token>(input, {
          token_info: {},
        })

        setResults((prev) => ({ ...prev, [input]: info }))
      } catch (error) {}
    }

    AccAddress.validate(input) && search()
  }, [input, lcd])

  /* render */
  const result = results[input]

  return (
    <>
      <label>Token Contract Address</label>
      <input
        className={styles.search}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {result && <TokenItem {...result} token={input} />}
    </>
  )
}

export default AddCustomToken
