'use client';

import { useBreakpointValue } from '@chakra-ui/react';
import { MobileMortgage } from '@/components/calculators/mortgage/MobileMortgage';
import { TabletMortgage } from '@/components/calculators/mortgage/TabletMortgage';
import { DesktopMortgage } from '@/components/calculators/mortgage/DesktopMortgage';

export default function MortgagePage() {
  const device = useBreakpointValue<'mobile' | 'tablet' | 'desktop'>({
    base: 'mobile',
    md: 'tablet',
    lg: 'desktop',
  });

  if (device === 'mobile') {
    return <MobileMortgage />;
  }

  if (device === 'tablet') {
    return <TabletMortgage />;
  }

  return <DesktopMortgage />;
}
