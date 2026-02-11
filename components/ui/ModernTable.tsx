import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableProps,
} from '@chakra-ui/react';

interface ModernTableProps extends TableProps {
  headers: string[];
  data: (string | number | React.ReactNode)[][];
}

export function ModernTable({ headers, data, ...props }: ModernTableProps) {
  return (
    <TableContainer
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      overflowX="auto"
      boxShadow="sm"
    >
      <Table variant="simple" {...props}>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                bg="gray.50"
                borderColor="gray.200"
                color="gray.600"
                fontWeight="semibold"
                textTransform="uppercase"
                fontSize="xs"
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr 
              key={rowIndex} 
              _hover={{ bg: 'gray.50' }}
              transition="background-color 0.15s"
            >
              {row.map((cell, cellIndex) => (
                <Td
                  key={cellIndex}
                  borderColor="gray.200"
                  color="gray.700"
                >
                  {cell}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
