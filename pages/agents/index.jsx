import { Heading, Table, Thead, Tbody, Text, Tr, Th, Td, Stat, StatLabel, StatNumber, Card, StatHelpText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TruncatedEthereumAddress from "../../components/TruncatedEthereumAddress";

const QUERY = `https://api.dune.com/api/v1/query/2850384/results?api_key=${process.env['NEXT_PUBLIC_DUNE_API_KEY']}`;

const Agents = () => {
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
			<Heading mb={3}>Agents</Heading>
				<Stat mb={3}>
					<StatLabel>Total</StatLabel>
					<StatNumber>{data?.result.rows.length}</StatNumber>
					<StatHelpText>Refreshes every 4 hrs</StatHelpText>
				</Stat>
			{data && (
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>Safe Address</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data?.result.rows.map((row) => (
							<Tr key={row.multisig_address}>
								<Td>
									<TruncatedEthereumAddress address={row.multisig_address} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			)}
		</Layout>
	);
};

export default Agents;
