import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '../theme/theme';

function MyApp({ Component, pageProps }) {
  	return (
		<ThemeProvider theme={light}>
			<React.Fragment>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" /> 
					<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet" />

					<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3b5d97aecd3f4c5f893690862011f5c3"}' />
				</Head>

				<Component {...pageProps} />
			</React.Fragment>
		</ThemeProvider>
  	);
}

export default MyApp;