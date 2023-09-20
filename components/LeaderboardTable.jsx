import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import TruncatedEthereumAddress from "./TruncatedEthereumAddress";

const LeaderboardTable = ({ data }) => {
	if (!data || !data.result.rows) {
		return <Box>No data available.</Box>;
	}

	return (
		<Box mt={5} maxWidth="100%" overflowX="auto">
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th isNumeric>Rank</Th>
						<Th isNumeric>Olas Service ID</Th>
						<Th>Agent Safe Address</Th>
						<Th isNumeric>Total Amount Bought</Th>
						{/* <Th isNumeric>Total Amount Claimed</Th>
						<Th isNumeric>Overall Profit</Th>
						<Th isNumeric>Overall Gain %</Th> */}
						<Th isNumeric>Transactions Count</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.result.rows.map((row) => (
						<Tr key={row.multisig_address}>
							<Td isNumeric>{row.Rank}</Td>
							<Td isNumeric color="green.600"><a href={`https://registry.olas.network/services/${row.serviceId}`}>{row.serviceId}</a></Td>
							<Td color="green.600"><TruncatedEthereumAddress address={row.multisig_address} /></Td>
							<Td isNumeric>{row.TotalAmountBought}</Td>
							{/* <Td isNumeric>{row.TotalAmountClaimed}</Td>
							<Td isNumeric>{row.OverallProfit}</Td>
							<Td isNumeric>{row.OverallPercentageGain}</Td> */}
							<Td isNumeric>{row.TransactionsCount}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default LeaderboardTable;
