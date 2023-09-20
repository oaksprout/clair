import { Box, ButtonGroup, Container, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const Footer = () => (
	<Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
		<Stack spacing={{ base: '4', md: '5' }}>
			<Text fontSize="sm" color="fg.subtle">
				<Box bg={useColorModeValue('gray.100', 'gray.900')} p={4}>
					<a href="https://hackathon.olas.network" rel="noopener noreferrer" target="_blank">Learn about the Prediction Agents Hackathon</a>
				</Box>
			</Text>
		</Stack>
	</Container>
)

export default Footer