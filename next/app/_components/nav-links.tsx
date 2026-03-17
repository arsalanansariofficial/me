'use client';

import Link from 'next/link';
import { ComponentProps, useState } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/_lib/utils';

export default function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex justify-center bg-primary px-4 text-primary-foreground">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathName = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        'navbar-link block px-2 py-4 text-xs text-light-gray transition-colors duration-300 ease-in hover:text-light-gray-70 focus-visible:text-light-gray-70 sm:text-sm md:text-base xl:text-xl',
        pathName === props.href &&
          'text-orange-yellow-crayola hover:text-orange-yellow-crayola focus-visible:text-orange-yellow-crayola'
      )}
    >
      {props.children}
    </Link>
  );
}
