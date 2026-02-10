'use client';

import { useBreakpointValue } from '@chakra-ui/react';
import { MobileAPY } from '@/components/calculators/apy/MobileAPY';
import { TabletAPY } from '@/components/calculators/apy/TabletAPY';
import { DesktopAPY } from '@/components/calculators/apy/DesktopAPY';

export default function APYPage() {
  const device = useBreakpointValue<'mobile' | 'tablet' | 'desktop'>({
    base: 'mobile',
    md: 'tablet',
    lg: 'desktop',
  });

  if (device === 'mobile') {
    return <MobileAPY />;
  }

  if (device === 'tablet') {
    return <TabletAPY />;
  }

  return <DesktopAPY />;
}
