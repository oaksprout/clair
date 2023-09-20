import Layout from "../../components/Layout"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Input, Button, Heading } from '@chakra-ui/react';
import TradeList from '../../components/TradeList';
import axios from 'axios';  // Import Axios

export default function Home() {
	const router = useRouter();
	const { agentId } = router.query;
	const lowerCaseAgentId = agentId?.toLowerCase();
	const [balance, setBalance] = useState(null);

	useEffect(() => {
		// Fetch balance when agentId is available
		if (agentId) {
			axios.post('https://gno.getblock.io/mainnet/', {
				jsonrpc: "2.0",
				method: "eth_getBalance",
				params: [lowerCaseAgentId, "latest"],
				id: "getblock.io"
			}, {
				headers: {
					'x-api-key': {process.env['NEXT_PUBLIC_GETBLOCK_API_KEY']},
					'Content-Type': 'application/json'
				}
			})
			.then(response => {
				const balanceHex = response.data.result;
				const balanceDec = parseInt(balanceHex, 16);
				setBalance(balanceDec);
			})
			.catch(error => {
				console.error("There was an error fetching the balance", error);
			});
		}
	}, [agentId]);

	return (
		<Layout>
			<Container maxW="xl" centerContent p={8}>
				<Heading textAlign="center" mb={6} size="sm">
					Agent Safe Address: <br />{agentId}
				</Heading>
				<Heading textAlign="center" mb={6} size="sm">
					Current Balance: {balance}
				</Heading>
				<TradeList agentId={lowerCaseAgentId} />
			</Container>
		</Layout>
	);
}
