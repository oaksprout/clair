import { useQuery } from '@apollo/client';
import { Text, Box, Link, Table, Thead, Tbody, Button, Tr, Th, Td, TableCaption, Card, CardHeader, CardBody, Heading, CardFooter } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import TruncatedEthereumAddress from './TruncatedEthereumAddress';


const FETCH_PREDICTIONS = gql`
  query fetchTrades {
    fpmmTrades(
      where: {
        type: Buy, 
        fpmm_: {creator: "0x89c5cc945dd550bcffb72fe42bff002429f46fec"}
      }
			orderBy: creationTimestamp
	 		orderDirection: desc
      first: 5
    ) {
      outcomeTokensTraded
      fpmm {
        title
        id
      }
			collateralAmountUSD
      feeAmount
			creationTimestamp
			outcomeIndex
      creator {
        id
      }
      transactionHash
    }
  }
`;




const PredictionsCard = () => {
	const { loading, error, data } = useQuery(FETCH_PREDICTIONS);

	if (error) return <Box>Error: {error.message}</Box>;

	const trades = data?.fpmmTrades || [];

	return (
		<Card variant="outline">
			<CardHeader>
				<Heading size="md">
						Latest Predictions
				</Heading>
			</CardHeader>
			<CardBody overflowX="auto" p={0}>
				<Table variant="simple" size="sm" width="100%">
					{trades.length === 0 && <TableCaption>{loading ? "Loading..." : "No predictions. Enter an active agent's Safe address."}</TableCaption>}
					<Thead>
						<Tr>
							<Th>Market</Th>
							<Th>Prediction</Th>
							<Th>Agent</Th>
							<Th isNumeric>Amount (XDAI)</Th>
						</Tr>
					</Thead>
					<Tbody>
						{trades.map((trade) => (
							<Tr key={trade.transactionHash}>
								<Td>
									<Link href={`https://aiomen.eth.limo/#/${trade.fpmm.id}`} isExternal>
										<Text color="green.600" noOfLines={1}>{trade.fpmm.title}</Text>
									</Link>
								</Td>
								<Td>{trade.outcomeIndex === "0" && "Yes"}{trade.outcomeIndex === "1" && "No"}</Td>
								<Td>
									<TruncatedEthereumAddress address={trade.creator.id} />
								</Td>
								<Td isNumeric>{parseFloat(trade.collateralAmountUSD).toFixed(2)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</CardBody>
			<CardFooter>
				<Link href="/predictions">See all &rarr;</Link>
			</CardFooter>
		</Card>
	);
};


export default PredictionsCard;
