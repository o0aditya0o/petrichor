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

// Mock Confetti
jest.mock('canvas-confetti', () => jest.fn())

describe('ProductView', () => {
    beforeEach(() => {
        // Reset store state before each test if possible, or Mock the store if complex.
        // simpler to just mock the window.alert
        jest.spyOn(window, 'alert').mockImplementation(() => { });
    })

    it('renders product details for "new" product', () => {
        render(<ProductView id="new" />)
        expect(screen.getByText('Wireless Noise Canceling Headphones Pro')).toBeInTheDocument()
        expect(screen.getByText('2,500')).toBeInTheDocument()
    })

    it('renders default product for unknown id', () => {
        render(<ProductView id="unknown-id" />)
        expect(screen.getByText('Ergonomic Mechanical Keyboard')).toBeInTheDocument()
    })

    it('renders the Buy button', () => {
        render(<ProductView id="new" />)
        const buyBtn = screen.getByText('Buy with Coins')
        expect(buyBtn).toBeInTheDocument()
    })

    it('shows processing state on click and triggers logic', () => {
        render(<ProductView id="new" />)
        const buyBtn = screen.getByText('Buy with Coins')
        fireEvent.click(buyBtn)
        expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
})
