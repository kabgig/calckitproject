'use client';

import { useState } from 'react';
import { FlatButton } from '@/components/ui/FlatButton';
import { exportToPDF } from '@/lib/utils/pdfExport';

interface PDFExportButtonProps {
  elementId: string;
  filename: string;
  label?: string;
}

export function PDFExportButton({
  elementId,
  filename,
  label = 'Export to PDF',
}: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(elementId, filename);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <FlatButton
      onClick={handleExport}
      isLoading={isExporting}
      loadingText="Exporting..."
      width="full"
    >
      {label}
    </FlatButton>
  );
}
