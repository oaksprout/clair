import {
	Box,
	Flex,
	Avatar,
	HStack,
	Text,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'

interface Props {
	children: React.ReactNode
}

const Links = ['Leaderboard', 'Markets', 'Predictions', 'Agents']

const NavLink = (props: Props) => {
	const { children } = props
	return (
		<Box
			as="a"
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href={'#'}>
			{children}
		</Box>
	)
}

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Link href='/'><Text fontWeight="bold">Prediction Agents</Text></Link>
						<HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
							{Links.map((link) => (
								<Link href={`/${link.toLowerCase()}`} key={link}>
									{link}
								</Link>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<a
							href="https://hackathon.olas.network"
							target="_blank"
							rel="noreferrer noopener">
							<Button
								variant={'solid'}
								colorScheme={'green'}
								size={'sm'}
								mr={4}>
								Hackathon
							</Button>
						</a>
						<a
							href="https://github.com/valory-xyz/trader-quickstart"
							target="_blank"
							rel="noreferrer noopener">
							<Button
								variant={'solid'}
								colorScheme={'green'}
								size={'sm'}
								mr={4}

							>
								Run an agent
							</Button>
						</a>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<Link href={`/${link.toLowerCase()}`} key={link}>
									{link}
								</Link>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	)
}
