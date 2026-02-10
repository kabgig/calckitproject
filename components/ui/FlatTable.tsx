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

interface FlatTableProps extends TableProps {
  headers: string[];
  data: (string | number | React.ReactNode)[][];
}

export function FlatTable({ headers, data, ...props }: FlatTableProps) {
  return (
    <TableContainer
      border="1px solid"
      borderColor="black"
      overflowX="auto"
    >
      <Table variant="simple" {...props}>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                bg="gray.100"
                borderColor="black"
                borderWidth="1px"
                color="black"
                fontWeight="bold"
                textTransform="none"
                fontSize="md"
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex} bg={rowIndex % 2 === 0 ? 'white' : 'gray.50'}>
              {row.map((cell, cellIndex) => (
                <Td
                  key={cellIndex}
                  borderColor="black"
                  borderWidth="1px"
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
