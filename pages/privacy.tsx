import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';


import NavigationBar from '../components/NavigationBar';

//#region 
const Container = styled.div`
	min-height: 100vh;
	padding: 2rem;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background: ${props => props.theme.primaryBackground};

	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`;

const Main = styled.main`
	width: 75%;
	
	padding: 5rem 5rem 0 5rem;
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 768px) {
		width: 100%;
		padding: 5rem 0 0 0;
	}

	@media screen and (max-width: 1380px) {
		width: 90%;
		padding: 5rem 0 0 0;
	}
`;

const Title = styled.h1`
	margin: 0;
	line-height: 1.15;
	font-size: 4rem;
	font-weight: 800;

	text-align: center;

	color: ${(props) => props.theme.primary};

	@media screen and (max-width: 768px) {
		font-size: 3rem;
	}
`;

const Description = styled.p`
	line-height: 1.5;
	font-size: 1.5rem;

	text-align: center;

	color: ${props => props.theme.secondary};

	@media screen and (max-width: 768px) {
		font-size: 1.25rem;
	}
`;

const LowerSectionContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	margin: 3rem 0 0 0;
`;

const LowerSectionTitle = styled.h2`
	margin: 0;
	font-size: 2.5rem;
	font-weight: 600;

	text-align: center;

	color: ${(props) => props.theme.primary};

	@media screen and (max-width: 768px) {
		font-size: 1.75rem;
	}
`;

const LowerSectionDescription = styled.div`
	line-height: 1.5;
	font-size: 1.25rem;

	text-align: left;

	color: ${props => props.theme.secondary};

	@media screen and (max-width: 768px) {
		font-size: 1.15rem;
	}
`;

const AboutLink = styled.a`
	color: ${props => props.theme.accent};

	text-decoration: none;

	&:active {
		text-decoration: none;
	}
`;

const Button = styled.button`
    color: ${props => props.theme.primary};

    font-size: 1.1rem;
    font-weight: 700;

    margin: 1rem 0 0 0;
    padding: 0.45rem 0.75rem;

    border-radius: 0.25rem;

    cursor: pointer;

    transition: ease-in-out 0.15s;

    background: ${props => props.theme.primaryBackground};

    border: solid 2px ${props => props.theme.quaternary};
    &:hover {
        border: solid 2px ${props => props.theme.primary};
    }
`;
//#endregion

export default function Privacy() {
    const [isOptedOut, setIsOptedOut] = useState(false);

	return (
		<Container>
			<Head>
				<title>Privacy | CollegeFacts</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <NavigationBar />

			<Main>
				<Title>
					Privacy
				</Title>

				<Description>
					Your privacy is important to us. We don't collect personal or sensitive information. We only collect privacy-focused analytics.
				</Description>

				<LowerSectionContainer>
					<LowerSectionTitle>
						Overview
					</LowerSectionTitle>

					<LowerSectionDescription>
						We collect analytics using <AboutLink href="https://www.cloudflare.com/web-analytics/">https://www.cloudflare.com/web-analytics/</AboutLink>.
						<br /><br />
						We do not use cookies or other "fingerprinting" techniques. Your privacy is important, which is why we use a privacy-focused analytics service.
					</LowerSectionDescription>
				</LowerSectionContainer>
			</Main>
		</Container>
	)
}