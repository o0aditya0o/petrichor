import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/Navigation'

// Mock usePathname
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}))

import { usePathname } from 'next/navigation'

describe('Navigation', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/')
    })

    it('renders all three navigation items', () => {
        render(<Navigation />)

        expect(screen.getByText('Home')).toBeInTheDocument()
        // Scan doesn't have text because it is just an icon, so we look for the link
        const scanLink = screen.getAllByRole('link')[1]
        expect(scanLink).toHaveAttribute('href', '/scan')

        expect(screen.getByText('Profile')).toBeInTheDocument()
    })

    it('highlights the active link', () => {
        (usePathname as jest.Mock).mockReturnValue('/profile')
        render(<Navigation />)

        const profileText = screen.getByText('Profile')
        const profileLink = profileText.closest('a')

        // Check for active class (text-primary)
        expect(profileText).toHaveClass('text-primary')
    })
})
