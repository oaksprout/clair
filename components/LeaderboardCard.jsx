import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TruncatedEthereumAddress from "./TruncatedEthereumAddress";


const QUERY = `https://api.dune.com/api/v1/query/2850384/results?api_key=${process.env['NEXT_PUBLIC_DUNE_API_KEY']}`;

const TableHead = () => <Thead>
	<Tr>
		<Th isNumeric>Rank</Th>
		<Th>Agent Safe Address</Th>
		<Th isNumeric>Transactions Count</Th>
	</Tr>
</Thead>

const TableBody = ({ data }) => <Tbody>
	{data.result.rows.slice(0,3).map((row) => (
		<Tr key={row.multisig_address}>
			<Td isNumeric>{row.Rank}</Td>
			<Td color="green.600"><TruncatedEthereumAddress address={row.multisig_address} /></Td>
			<Td isNumeric>{row.TransactionsCount}</Td>
		</Tr>
	))}
</Tbody>

const LeaderboardCard = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(QUERY)
			.then((res) => res.json())
			.then((fetchedData) => {
				setData(fetchedData);
			});
	}, []);

	return (
			<DashboardCard heading="Leading agents" loading={data === null} emptyMessage="No data" tableHead={<TableHead />} tableBody={data && <TableBody data={data} />} href='/leaderboard' />
	);
};

export default LeaderboardCard;
