import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

const mockUsePathname = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('AppLayout', () => {
  it('renders engineer profile link in submenu', () => {
    mockUsePathname.mockReturnValue('/');

    render(
      <AppLayout>
        <div>Dashboard Content</div>
      </AppLayout>,
    );

    expect(screen.getByRole('link', { name: 'Agmar Putra' })).toHaveAttribute(
      'href',
      '/profile/agmar-putra',
    );
  });

  it('marks Dashboard menu as active on root route', () => {
    mockUsePathname.mockReturnValue('/');

    render(
      <AppLayout>
        <div>Dashboard Content</div>
      </AppLayout>,
    );

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Profile' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('marks Profile menu as active on profile route', () => {
    mockUsePathname.mockReturnValue('/profile');

    render(
      <AppLayout>
        <div>Profile Content</div>
      </AppLayout>,
    );

    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
