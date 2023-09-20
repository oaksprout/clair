import Layout from '../components/Layout';
import PredictionsCard from '../components/PredictionsCard';
import LeaderboardCard from '../components/LeaderboardCard';
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link'


const Predictions = () => <Layout>
	<Box>
		<SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
			<LeaderboardCard />
			{/* <Text color="green"><Link href="/agents">All prediction agents</Link></Text> */}
			<PredictionsCard />
			{/* <Text color="green"><Link href="/markets">All markets that prediction agents are active on</Link></Text> */}
		</SimpleGrid>


	</Box>
</Layout>

export default Predictions;