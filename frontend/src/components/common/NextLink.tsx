import Link from 'next/link';
import React, { ReactNode } from 'react';

import { useTranslation } from '~/i18n/TranslationProvider';

interface NextLinkProps {
  href: string;
  children: ReactNode; // Add children prop
}

export const NextLink = ({ href, children, ...props }: NextLinkProps) => {
  const { locale } = useTranslation();
  return (
    <Link href={`${locale}${href}`} {...props}>
      {children}
    </Link>
  );
};
