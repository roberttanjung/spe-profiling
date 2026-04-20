'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AppLayout.module.css';
import type { AppLayoutProps } from './AppLayout.types';
import { engineerNavigationItems } from '@/utils/navigation';

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname === '/';
  const isProfileRoute = pathname.startsWith('/profile');

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          <div>
            <p className={styles.brandTitle}>ACT SPV Monitor</p>
            <p className={styles.brandSubtitle}>Frontend Engineer Insights</p>
          </div>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <nav aria-label="Sidebar navigation">
          <ul className={styles.menuList}>
            <li>
              <Link
                className={`${styles.menuLink} ${
                  isDashboardRoute
                    ? styles.menuLinkActive
                    : styles.menuLinkInactive
                }`}
                href="/"
                aria-current={isDashboardRoute ? 'page' : undefined}
              >
                Dashboard
              </Link>
            </li>
            <li className={styles.menuGroup}>
              <Link
                className={`${styles.menuLink} ${
                  isProfileRoute
                    ? styles.menuLinkActive
                    : styles.menuLinkInactive
                }`}
                href="/profile"
                aria-current={isProfileRoute ? 'page' : undefined}
              >
                Profile
              </Link>
              <ul className={styles.submenuList}>
                {engineerNavigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`${styles.submenuItem} ${
                        pathname === item.path
                          ? styles.submenuItemActive
                          : styles.submenuItemInactive
                      }`}
                      aria-current={pathname === item.path ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
