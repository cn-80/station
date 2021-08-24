import { useState } from 'react'
import useWhitelist from '../../lib/cw20/useWhitelist'
import ModalContent from '../../components/ModalContent'
import SearchToken from './SearchToken'
import AddCustomToken from './AddCustomToken'
import styles from './AddToken.module.scss'

const AddToken = () => {
  const [isSearch, setIsSearch] = useState(true)
  const { whitelist } = useWhitelist()

  return !whitelist ? null : (
    <ModalContent>
      <h1>Add token</h1>

      <section>
        <button className={styles.tab} onClick={() => setIsSearch(true)}>
          Search
        </button>

        <button className={styles.tab} onClick={() => setIsSearch(false)}>
          Custom token
        </button>
      </section>

      {isSearch ? (
        <SearchToken whitelist={whitelist} />
      ) : (
        <AddCustomToken whitelist={whitelist} />
      )}

      <button></button>
    </ModalContent>
  )
}

export default AddToken
