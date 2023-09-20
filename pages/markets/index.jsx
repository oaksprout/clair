import { Heading, Table, Thead, Text, Tbody, Tr, Th, Td, Link, Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import gql from 'graphql-tag';
import { useQuery } from "@apollo/client";
import dayjs from 'dayjs';

const FETCH_MARKETS = gql`
{
  fixedProductMarketMakers(
    orderBy: creationTimestamp
    where: {creator: "0x89c5cc945dd550bcffb72fe42bff002429f46fec"}
    orderDirection: desc
  ) {
    title
		id
    creationTimestamp
  }
}
`;

const Markets = () => {
	const { loading, error, data } = useQuery(FETCH_MARKETS);

	if (error) return `Error: ${error.message}`;

	return (
		<Layout>
			<Heading mb={3}>Markets</Heading>
			<Stat mb={3}>
				<StatLabel>Total</StatLabel>
				<StatNumber>{data?.fixedProductMarketMakers.length}</StatNumber>
			</Stat>
			{
				loading ? (
					<Box>Loading...</Box>
				) : (
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Question</Th>
								<Th>Posted</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data.fixedProductMarketMakers.map((market, index) => (
								<Tr key={index}>
									<Td>
										<Link href={`https://aiomen.eth.limo/#/${market.id}`} isExternal>
											<Text color="green.600">
												{market.title}
											</Text>
										</Link>
									</Td>
									<Td>
										{dayjs.unix(market.creationTimestamp).format('D MMM h:mm A')}
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				)
			}

		</Layout>
	);
}

export default Markets;
