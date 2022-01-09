import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BackButton = styled.div`
    color: rgba(0, 0, 0, 0.9);

    font-size: 1.1rem;
    font-weight: 700;

    padding: 0.45rem 0.75rem;

    border-radius: 0.25rem;

    cursor: pointer;

    transition: ease-in-out 0.15s;

    border: solid 2px rgba(0, 0, 0, 0.15);
    &:hover {
        border: solid 2px rgba(0, 0, 0, 0.9);
    }
`;

export default function NavigationBar() {

    return (
        <Container>

            <Link href="/">
                <BackButton>
                    &#8249; Back
                </BackButton>
            </Link>

        </Container>
    );
}