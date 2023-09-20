import { FC } from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';

type Props = {
    address: string;
}

const TruncatedEthereumAddress: FC<Props> = ({ address }) => {
    const truncatedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

    return (
        <Link href={`/agents/${address}`}><Text color="green.600">{truncatedAddress}</Text></Link>
    );
};

export default TruncatedEthereumAddress;
