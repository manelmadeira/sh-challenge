import { render, screen } from "@/lib/test-utils"

import { Header } from "./Header"

describe('Header', () => {
  it('should render component', () => {
    render(<Header /> );

    expect(screen.getByText('AI Call Evaluator')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  })
})
