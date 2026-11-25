import type { ReactNode, MouseEvent } from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';

type Props = {
  children: ReactNode;
  href: string;
  light?: boolean;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function PillButton({ children, href, light = false, external = false, onClick }: Props) {
  return (
    <a
      className={`pill-button${light ? ' pill-button-light' : ''}`}
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="pill-label">{children}</span>
      <span className="pill-icon" aria-hidden="true">
        <span><IconArrowUpRight size={18} stroke={1.75} /></span>
      </span>
    </a>
  );
}

