'use client';

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, ReactNode } from 'react';
import styles from './AdaptiveTooltip.module.css';

const VIEWPORT_PADDING = 12;
const CLOSE_DELAY_MS = 220;

interface AdaptiveTooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  role?: 'tooltip';
  preferredSide?: 'top' | 'bottom';
  maxWidth?: number;
}

export default function AdaptiveTooltip({
  trigger,
  content,
  className,
  role = 'tooltip',
  preferredSide = 'top',
  maxWidth = 240,
}: AdaptiveTooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({
    top: -9999,
    left: -9999,
    maxWidth,
  });
  const tooltipId = useId();

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const place = () => {
      const triggerEl = triggerRef.current;
      const tooltipEl = tooltipRef.current;

      if (!triggerEl || !tooltipEl) {
        return;
      }

      const triggerRect = triggerEl.getBoundingClientRect();

      tooltipEl.style.top = '-9999px';
      tooltipEl.style.left = '-9999px';
      tooltipEl.style.maxWidth = `${maxWidth}px`;
      tooltipEl.style.maxHeight = `${window.innerHeight - VIEWPORT_PADDING * 2}px`;

      const tooltipRect = tooltipEl.getBoundingClientRect();
      const enoughTop =
        triggerRect.top - VIEWPORT_PADDING >= tooltipRect.height + 8;
      const enoughBottom =
        window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING >=
        tooltipRect.height + 8;

      const side =
        preferredSide === 'top'
          ? enoughTop || !enoughBottom
            ? 'top'
            : 'bottom'
          : enoughBottom || !enoughTop
            ? 'bottom'
            : 'top';

      let top =
        side === 'top'
          ? triggerRect.top - tooltipRect.height - 8
          : triggerRect.bottom + 8;
      top = Math.max(
        VIEWPORT_PADDING,
        Math.min(
          top,
          window.innerHeight - tooltipRect.height - VIEWPORT_PADDING,
        ),
      );

      let left =
        triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      left = Math.max(
        VIEWPORT_PADDING,
        Math.min(
          left,
          window.innerWidth - tooltipRect.width - VIEWPORT_PADDING,
        ),
      );

      const maxHeight =
        side === 'top'
          ? Math.max(96, triggerRect.top - VIEWPORT_PADDING - 8)
          : Math.max(
              96,
              window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING - 8,
            );

      setStyle({
        top,
        left,
        maxWidth,
        maxHeight,
      });
    };

    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);

    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [maxWidth, open, preferredSide]);

  const tooltipClassName = useMemo(
    () => [styles.tooltip, className].filter(Boolean).join(' '),
    [className],
  );

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleOpen = () => {
    clearCloseTimeout();
    setStyle({ top: -9999, left: -9999, maxWidth });
    setOpen(true);
  };

  const handleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, CLOSE_DELAY_MS);
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={styles.trigger}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        aria-describedby={open ? tooltipId : undefined}
      >
        {trigger}
      </span>
      {open &&
        createPortal(
          <span
            id={tooltipId}
            ref={tooltipRef}
            role={role}
            className={tooltipClassName}
            style={style}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={handleClose}
          >
            {content}
          </span>,
          document.body,
        )}
    </>
  );
}
