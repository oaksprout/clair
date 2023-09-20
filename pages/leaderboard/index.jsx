import { Heading, Table, Thead, Tbody, Text, Tr, Th, Td, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LeaderboardTable from "../../components/LeaderboardTable";

const QUERY = `https://api.dune.com/api/v1/query/2850384/results?api_key=${process.env['NEXT_PUBLIC_DUNE_API_KEY']}`;

const Leaderboard = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(QUERY)
			.then((res) => res.json())
			.then((fetchedData) => {
				setData(fetchedData);
			});
	}, []);

	return (
		<Layout>
			<Heading mb={3}>Agent Leaderboard</Heading>
			<Stat mb={3}>
				<StatLabel>Total participating agents</StatLabel>
				<StatNumber>{data?.result.rows.length}</StatNumber>
				<StatHelpText>Refreshes every 4 hrs</StatHelpText>
			</Stat>
			<LeaderboardTable data={data} />
		</Layout>
	);
};

export default Leaderboard;
