import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductView } from '@/components/ProductView'

// Mock Lucide icons
jest.mock('lucide-react', () => ({
    Share2: () => <div data-testid="icon-share" />,
    Heart: () => <div data-testid="icon-heart" />,
    ShoppingBag: () => <div data-testid="icon-bag" />,
    ArrowLeft: () => <div data-testid="icon-back" />,
}))

// Mock Next.js Link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    )
})

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
}))

describe('ProductView', () => {
    it('renders product details for "new" product', () => {
        // No async/suspense needed now!
        render(<ProductView id="new" />)

        expect(screen.getByText('Wireless Noise Canceling Headphones Pro')).toBeInTheDocument()
        expect(screen.getByText('2,500')).toBeInTheDocument()
        expect(screen.getByText(/Experience silence/)).toBeInTheDocument()
    })

    it('renders default product for unknown id', () => {
        render(<ProductView id="unknown-id" />)

        expect(screen.getByText('Ergonomic Mechanical Keyboard')).toBeInTheDocument()
    })

    it('renders the Buy button', () => {
        render(<ProductView id="new" />)

        const buyBtn = screen.getByText('Buy with Coins')
        expect(buyBtn).toBeInTheDocument()
        expect(buyBtn.closest('button')).toHaveClass('bg-primary')
    })

    it('shows processing state on click', () => {
        render(<ProductView id="new" />)

        const buyBtn = screen.getByText('Buy with Coins')
        fireEvent.click(buyBtn)

        expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
})
