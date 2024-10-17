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

const soldTypes: { title: string; slug: string }[] = [
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
const rentTypes: { title: string; slug: string }[] = [
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

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
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
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Nhà đất bán</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="w-[350px] p-4">
                                {soldTypes.map((el) => (
                                    <ListItem
                                        key={el.title}
                                        title={el.title}
                                        href={el.slug}
                                    >
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Nhà đất cho thuê</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="w-[350px] p-4">
                                {rentTypes.map((el) => (
                                    <ListItem
                                        key={el.title}
                                        title={el.title}
                                        href={el.slug}
                                    >
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/docs">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Tin tức
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
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
