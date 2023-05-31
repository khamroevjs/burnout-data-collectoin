import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import {FaVk, FaTelegram, FaFacebook} from 'react-icons/fa';
import {ReactNode} from 'react';

const SocialButton = ({children, label, href,}: { children: ReactNode; label: string; href: string; }) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <chakra.footer
            // marginTop='auto'
            position='sticky'
            top='100%'
            bg={useColorModeValue('gray.100', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{base: 'column', md: 'row'}}
                spacing={4}
                justify={{base: 'center', md: 'space-between'}}
                align={{base: 'center', md: 'center'}}>
                <Text>© 2023 Burnout Stopper. Все права защищены</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Telegram'} href={'#'}>
                        <FaFacebook/>
                    </SocialButton>
                    <SocialButton label={'Vk'} href={'#'}>
                        <FaVk/>
                    </SocialButton>
                    <SocialButton label={'Facebook'} href={'#'}>
                        <FaTelegram/>
                    </SocialButton>
                </Stack>
            </Container>
        </chakra.footer>
    );
}
