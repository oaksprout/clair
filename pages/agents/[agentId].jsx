import Layout from "../../components/Layout"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Input, Button, Heading } from '@chakra-ui/react';
import TradeList from '../../components/TradeList';

export default function Home() {
	const router = useRouter();
	const { agentId } = router.query;
	const lowerCaseAgentId = agentId?.toLowerCase();

	return (
		<Layout>
			<Container maxW="xl" centerContent p={8}>
				<Heading textAlign="center" mb={6} size="sm">Agent Safe Address: <br />{agentId}</Heading>
				<TradeList agentId={lowerCaseAgentId} />
			</Container>
		</Layout>
	);
}
