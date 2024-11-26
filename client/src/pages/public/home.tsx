import useAccountStore from "@/zustand/useAccountStore"

const Home = () => {
    const { info } = useAccountStore()
    return (<>Xin chào {info?.email}</>)
}
export default Home