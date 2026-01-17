import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
    it('renders the main heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', { level: 1, name: 'Petri Force' })
        expect(heading).toBeInTheDocument()
    })

    it('renders the tagline', () => {
        render(<Home />)

        const tagline = screen.getByText(/Stop the impulse/i)
        expect(tagline).toBeInTheDocument()
    })

    it('renders the coin balance', () => {
        render(<Home />)
        // Should be able to find the balance text rendered by the child component
        const balance = screen.getByText('10,000')
        expect(balance).toBeInTheDocument()
    })
})
