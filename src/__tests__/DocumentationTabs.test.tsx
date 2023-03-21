import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DocumentationTabs from '../components/DocumentationTabs';

describe('DocumentationTabs', () => {
  it('renders tabs with correct default value', () => {
    render(<DocumentationTabs />);
    expect(screen.getByRole('tab', { name: 'NodeJS' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tabpanel', { name: 'NodeJS' })).toBeVisible();
    expect(
      screen.queryByRole('tabpanel', { name: 'Python' })
    ).not.toBeInTheDocument();
  });

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    render(<DocumentationTabs />);

    await user.click(screen.getByRole('tab', { name: 'Python' }));

    expect(screen.getByRole('tab', { name: 'Python' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tabpanel', { name: 'Python' })).toBeVisible();
    expect(
      screen.queryByRole('tabpanel', { name: 'NodeJS' })
    ).not.toBeInTheDocument();
  });
});
