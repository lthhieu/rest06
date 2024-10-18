import { create } from 'zustand'

type accountType = {
    info: any,
    setInfo: (v: string) => void
    token: string,
    setToken: (v: string) => void
}

const useAccountStore = create<accountType>()((set) => ({
    info: '',
    setInfo: (v: any) => set(() => ({ info: v })),
    token: '',
    setToken: (v: string) => set(() => ({ token: v })),
}))

export default useAccountStore
// function Counter() {
//   const { count, inc } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }