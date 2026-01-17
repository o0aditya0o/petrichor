import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ScanPage from '@/app/scan/page'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('ScanPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush })
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders the initial UI correctly', () => {
        render(<ScanPage />)

        expect(screen.getByText('Drop the Impulse')).toBeInTheDocument()
        expect(screen.getByText('Tap to Upload')).toBeInTheDocument()
        expect(screen.getByText('Simulate Camera Scan')).toBeInTheDocument()
    })

    it('shows overlay and redirects on scan click', () => {
        render(<ScanPage />)

        // Click the main upload button
        fireEvent.click(screen.getByLabelText('Upload Screenshot'))

        // Expect overlay to appear (Checking for overlay text)
        expect(screen.getByText('INITIALIZING...')).toBeInTheDocument()

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(2500)
        })

        // Expect redirect
        expect(mockPush).toHaveBeenCalledWith('/product/new')
    })
})
