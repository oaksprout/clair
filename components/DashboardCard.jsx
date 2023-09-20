import { Card, CardBody, CardFooter, CardHeader, Heading, Link, Table, TableCaption } from "@chakra-ui/react";

const DashboardCard = ({ heading, loading, emptyMessage = "No data", tableHead, tableBody, href }) => {
	return (
		<Card variant="outline">
			<CardHeader>
				<Heading size="md">
					{heading}
				</Heading>
			</CardHeader>
			<CardBody overflowX="auto" p={0}>
				<Table variant="simple" size="sm" width="100%">
					{<TableCaption>{loading && "Loading..."}</TableCaption>}
					{tableHead}
					{tableBody}
				</Table>
			</CardBody>
			<CardFooter>
				<Link href={href}>See leaderboard &rarr;</Link>
			</CardFooter>
		</Card>
	);

};


export default DashboardCard;