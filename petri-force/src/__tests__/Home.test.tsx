import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock icons
jest.mock('lucide-react', () => ({
    Package: () => <div data-testid="icon-package" />,
    TrendingUp: () => <div data-testid="icon-trending" />,
    Heart: () => <div data-testid="icon-heart" />,
}))

// Mock Dashboard child if needed, or integration test
// Let's integration test since Dashboard is client component
jest.mock('@/components/Dashboard', () => ({
    Dashboard: () => <div data-testid="dashboard-mock">Mock Dashboard</div>
}))

describe('Home', () => {
    it('renders fixed structural elements', () => {
        render(<Home />)

        // Header
        expect(screen.getByText('Petri Force')).toBeInTheDocument()
        expect(screen.getByText('Control your impulse.')).toBeInTheDocument()

        // Dashboard
        expect(screen.getByTestId('dashboard-mock')).toBeInTheDocument()
    })
})
