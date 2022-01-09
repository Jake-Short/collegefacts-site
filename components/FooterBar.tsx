import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 5rem 0 0 0;
`;

const LinkText = styled.a`
    font-size: 1rem;
    font-weight: 600;

    color: ${props => props.theme.secondary};

    cursor: pointer;
`;

export default function FooterBar() {

    return (
        <Container>

            <Link href="/privacy">
                <LinkText>
                    Privacy Policy
                </LinkText>
            </Link>

            <Link href="/contact">
                <LinkText style={{ marginLeft: "2rem" }}>
                    Contact
                </LinkText>
            </Link>

        </Container>
    );
}