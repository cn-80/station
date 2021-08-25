import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { useCurrentChainName, Whitelist } from '../lib'

export const tokensState = atom<Dictionary<Whitelist>>({
  key: 'tokensState',
  default: {},
})

export const useAddTokens = () => {
  const name = useCurrentChainName()
  const setTokens = useSetRecoilState(tokensState)
  return (tokens: Whitelist) =>
    setTokens((prev) => ({ ...prev, [name]: { ...prev[name], ...tokens } }))
}

export const useTokens = () => {
  const tokens = useRecoilValue(tokensState)
  const name = useCurrentChainName()
  return tokens[name]
}
