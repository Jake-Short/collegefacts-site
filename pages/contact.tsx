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

const EmailLink = styled.a`
	color: ${props => props.theme.accent};

	text-decoration: none;

	&:active {
		text-decoration: none;
	}
`;
//#endregion

export default function Contact() {
	return (
		<Container>
			<Head>
				<title>Contact | CollegeFacts</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <NavigationBar />

			<Main>
				<Title>
					Contact
				</Title>

				<Description>
					You can email us at <EmailLink href="mailto:contact@collegefacts.org">contact@collegefacts.org</EmailLink>.
				</Description>
			</Main>
		</Container>
	)
}