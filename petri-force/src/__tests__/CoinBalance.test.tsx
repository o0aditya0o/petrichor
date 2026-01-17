import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CoinBalance } from '@/components/CoinBalance'

describe('CoinBalance', () => {
    it('renders the coin balance component', () => {
        render(<CoinBalance />)

        // Check for the balance amount
        const balanceText = screen.getByText('10,000')
        expect(balanceText).toBeInTheDocument()

        // Check if it has the correct styling logic (implicit checks can be basic)
        const container = balanceText.closest('div')
        expect(container).toHaveClass('glass')
    })
})
