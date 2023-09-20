import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Text, Box, Link, Table, Thead, Tbody, Button, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import TruncatedEthereumAddress from './TruncatedEthereumAddress';


const ITEMS_PER_PAGE = 10;

const FETCH_PREDICTIONS = gql`
  query fetchTrades($creatorId: ID) {
    fpmmTrades(
      where: {
        type: Buy, 
        fpmm_: {creator: "0x89c5cc945dd550bcffb72fe42bff002429f46fec"}
      }
			orderBy: creationTimestamp
	 		orderDirection: desc
		   skip: $skip
      first: $first
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

const PREDICTION_SUBSCRIPTION = gql`
  subscription onNewTrade {
    fpmmTrades(
      where: {
        type: Buy, 
        fpmm_: {creator: "0x89c5cc945dd550bcffb72fe42bff002429f46fec"}
      }
    ) {
      outcomeTokensTraded
      fpmm {
        title
        id
      }
      collateralAmountUSD
      feeAmount
      outcomeIndex
			creationTimestamp
      creator {
        id
      }
      transactionHash
    }
  }
`;


const PredictionsList = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const { loading, error, data, refetch } = useQuery(FETCH_PREDICTIONS, {
		variables: {
			skip: (currentPage - 1) * ITEMS_PER_PAGE,
			first: ITEMS_PER_PAGE
		}
	});

	const { data: subscriptionData } = useSubscription(PREDICTION_SUBSCRIPTION);

	useEffect(() => {
		if (subscriptionData) {
			refetch();
		}
	}, [subscriptionData]);

	if (error) return <Box>Error: {error.message}</Box>;

	const trades = data?.fpmmTrades || [];

	const totalItems = trades.length;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	return (
		<Box w={{ md: "800px", lg: '1000px', xl: "1200px" }}>
			<Table variant="simple" width="100%">
				{trades.length === 0 && <TableCaption>{loading ? "Loading..." : "No predictions. Enter an active agent's Safe address."}</TableCaption>}
				<Thead>
					<Tr>
						<Th>Market</Th>
						<Th>Prediction</Th>
						<Th>Agent</Th>
						<Th isNumeric>Amount (XDAI)</Th>
						<Th w={200}>Predicted</Th>
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
							<Td>{dayjs.unix(trade.creationTimestamp).format('D MMM h:mm A')}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
			{
				totalItems > 1 && (
					<Box mt={4}>
						<Button
							mr={3}
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(prev => prev - 1)}
						>
							Previous
						</Button>
						<span> Page {currentPage}</span>
						<Button
							ml={3}
							disabled={totalItems < ITEMS_PER_PAGE}
							onClick={() => setCurrentPage(prev => prev + 1)}
						>
							Next
						</Button>
					</Box>
				)
			}
		</Box>
	);
};


export default PredictionsList;
