import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Box p={4}>{children}</Box>
			{/* <Footer /> */}
		</>
	)
};

export default Layout