'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './AppLayout.module.css';
import type { AppLayoutProps } from './AppLayout.types';
import { engineerNavigationItems } from '@/utils/navigation';

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path d="M4 4h7v7H4V4Zm9 0h7v11h-7V4ZM4 13h7v7H4v-7Zm9 4h7v3h-7v-3Z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path d="M12 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 11Zm0 2c-3.59 0-6.5 1.79-6.5 4v1h13v-1c0-2.21-2.91-4-6.5-4Z" />
    </svg>
  );
}

function ToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.toggleSvg}>
      {collapsed ? <path d="m9 6 6 6-6 6" /> : <path d="m15 6-6 6 6 6" />}
    </svg>
  );
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const isDashboardRoute = pathname === '/';
  const isProfileRoute = pathname.startsWith('/profile');

  return (
    <div
      className={`${styles.appShell} ${
        isSidebarCollapsed ? styles.appShellCollapsed : ''
      }`}
    >
      <header className={styles.header}>
        <div className={styles.brandCluster}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true" />
            <div>
              <p className={styles.brandTitle}>ACT SPV Monitor</p>
              <p className={styles.brandSubtitle}>Frontend Engineer Insights</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.sidebarToggle}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            aria-expanded={!isSidebarCollapsed}
            aria-controls="app-sidebar-nav"
            aria-label={
              isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
          >
            <ToggleIcon collapsed={isSidebarCollapsed} />
            {isSidebarCollapsed ? 'Expand' : 'Minimize'}
          </button>
        </div>
      </header>

      <aside
        className={`${styles.sidebar} ${
          isSidebarCollapsed ? styles.sidebarCollapsed : ''
        }`}
      >
        <nav id="app-sidebar-nav" aria-label="Sidebar navigation">
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
                title="Dashboard"
              >
                <span className={styles.menuLinkText}>Dashboard</span>
                <span className={styles.menuLinkCompact} aria-hidden="true">
                  <DashboardIcon />
                </span>
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
                title="Profile"
              >
                <span className={styles.menuLinkText}>Profile</span>
                <span className={styles.menuLinkCompact} aria-hidden="true">
                  <ProfileIcon />
                </span>
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
                      title={item.name}
                    >
                      <span className={styles.submenuItemText}>
                        {item.name}
                      </span>
                      <span
                        className={styles.submenuItemCompact}
                        aria-hidden="true"
                      >
                        <PersonIcon />
                      </span>
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
