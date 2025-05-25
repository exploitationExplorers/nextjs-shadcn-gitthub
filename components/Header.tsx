import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ThemeToogle } from './ThemeToggle'
import { UserMenu } from './UserMenu'

interface HeaderProps {
    className?: string
}

export function Header({ className }: HeaderProps) {
    return (
        <header 
        className={cn(
            'fixed top-0 w-full z-50 border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
            className
        )}>
            <div className='container flex h-16 items-center justify-between'>
                <Link 
                href="/"
                className='flex items-center space-x-2 font-bold text-xl hover:text-primary transition-colors'>
                    Projex
                </Link>
                <div className='flex items-center gap-4'>
                    <UserMenu />
                    <div className='border-1 pl-4 dark:border-gray-800'>
                    <ThemeToogle></ThemeToogle>
                </div>
                </div>
            </div>
        </header>
    )
}