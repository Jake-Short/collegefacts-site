import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

//#region 
const OuterContainer = styled.div`
    width: 100%;
    
    display: flex;
`;

const Container = styled.div`
    width: 80%;
    padding: 1rem 5rem;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;

	@media screen and (max-width: 768px) {
		width: 100%;

		padding: 1.5rem 1rem 0 1rem;
	}

	@media screen and (max-width: 1280px) {
		width: 95%;
	}
`;

const Text = styled.p`
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.05rem;

    margin: 0 0 0 0.65rem;
`;

const ImageLinkContainer = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;
`;

const LinksContainer = styled.div`
    margin: 0 0 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

const LinkText = styled.a`
    font-size: 1.1rem;
    font-weight: 700;

    cursor: pointer;

    margin: 0 0 0 1.5rem;

    transition: ease-in-out 0.12s;
    &:hover {
        color: ${p => p.theme.accent}
    }
`;
//#endregion

export default function TopBar(): JSX.Element {
    return (
        <OuterContainer>
            <Container>
                <Link href="/">
                    <ImageLinkContainer>
                        <Image
                            src="/PurpleBackgroundIcon.png"
                            width="45"
                            height="45"
                        />

                        <Text>
                            CollegeFacts
                        </Text>
                    </ImageLinkContainer>
                </Link>

                <LinksContainer>
                    <Link href="/">
                        <LinkText>
                            Home
                        </LinkText>
                    </Link>

                    <Link href="/blog">
                        <LinkText>
                            Blog
                        </LinkText>
                    </Link>
                </LinksContainer>
            </Container>
        </OuterContainer>
    );
}