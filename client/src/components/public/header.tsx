// import Link from "next/link"
import appLogo from '@/assets/logo.svg'
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { forwardRef } from "react"
import { Link } from 'react-router-dom'
import slugify from 'slugify'

type subType = {
    title: string,
    slug: string
}
type navigationType = {
    id: number,
    title: string,
    hasSub: boolean,
    subs?: subType[]
}

const soldTypes: subType[] = [
    "Bán căn hộ chung cư",
    "Bán chung cư mini, căn hộ dịch vụ",
    "Bán nhà riêng",
    "Bán nhà biệt thự, liền kề",
    "Bán nhà mặt phố",
    "Bán shophouse, nhà phố thương mại",
    "Bán đất nền dự án",
    "Bán đất",
    "Bán trang trại, khu nghỉ dưỡng",
    "Bán condotel",
    "Bán kho, nhà xưởng",
    "Bán loại bất động sản khác"
].map(el => ({ title: el, slug: slugify(el, { locale: 'vi', lower: true }) }))
const rentTypes: subType[] = [
    "Cho thuê căn hộ chung cư",
    "Cho thuê chung cư mini, căn hộ dịch vụ",
    "Cho thuê nhà riêng",
    "Cho thuê nhà biệt thự, liền kề",
    "Cho thuê nhà mặt phố",
    "Cho thuê shophouse, nhà phố thương mại",
    "Cho thuê nhà trọ, phòng trọ",
    "Cho thuê văn phòng",
    "Cho thuê, sang nhượng cửa hàng, ki ốt",
    "Cho thuê kho, nhà xưởng, đất",
    "Cho thuê loại bất động sản khác"
].map(el => ({ title: el, slug: slugify(el, { locale: 'vi', lower: true }) }))

const nav: navigationType[] = [
    {
        id: 1,
        title: 'Nhà đất bán',
        hasSub: true,
        subs: soldTypes
    },
    {
        id: 1,
        title: 'Nhà đất cho thuê',
        hasSub: true,
        subs: rentTypes
    },
    {
        id: 1,
        title: 'Tin tức',
        hasSub: false
    }
]

const Header = () => {
    return (
        <div className="w-full h-24 px-[15px] py-[17px] bg-[#fff] shadow-[0_4px_10px_rgba(182,182,182,0.18)] flex items-center">
            <div className='mr-6'>
                <Link to="/">
                    <img className='h-12 w-40 mt-2' src={appLogo} alt="App logo" />
                </Link>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    {nav.map(el => (<NavigationMenuItem key={el.id}>
                        {!el.hasSub ? <Link to={slugify(el.title, { locale: 'vi', lower: true })}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {el.title}
                            </NavigationMenuLink>
                        </Link> : <><NavigationMenuTrigger>{el.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-[350px] p-4">
                                    {el.subs!.map((el) => (
                                        <ListItem
                                            key={el.title}
                                            title={el.title}
                                            href={el.slug}
                                        >
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent></>}
                    </NavigationMenuItem>))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
export default Header
