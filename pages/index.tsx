import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { paths_ids } from '../data/paths_ids';
import { id_names } from '../data/id_names';
import FooterBar from '../components/FooterBar';
import TopBar from '../components/TopBar';

//#region 
const Container = styled.div`
	min-height: 100vh;
	padding: 2rem 5rem;
	
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
	width: 80%;
	
	padding: 5rem 0 0 0;
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 768px) {
		width: 100%;

		padding: 1.5rem 0 0 0;
	}

	@media screen and (max-width: 1280px) {
		width: 95%;
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

const SearchContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	@media screen and (max-width: 728px) {
		width: 100%;
	}
`;

const Search = styled.input`
	width: 100%;
	border: solid 2px ${props => props.theme.tertiary};
	border-radius: 0.85rem;

	padding: 0.85rem 1.1rem;

	font-size: 1.2rem;

	transition: ease-in-out 0.15s;

	background: ${props => props.theme.controlBackground};
	color: ${props => props.theme.primary};

	&:focus {
		outline: none;

		border: solid 2px ${props => props.theme.primary};
	}
`;

const SearchResults = styled.div`
	max-height: 30vh;

	overflow-y: auto;

	position: absolute;

	border: solid 2px ${props => props.theme.tertiary};
	border-radius: 0.5rem;

	background: ${props => props.theme.controlBackground};

	z-index: 10000;
`;

const SearchResultItem = styled.div`
	width: 100%;
`;

const SearchResultItemActive = styled.div`
	background: rgba(235, 235, 235);
`;

const SearchResultItemText = styled.p`
	font-size: 1rem;
	font-weight: 600;

	color: ${props => props.theme.primary};

	margin: 0;
	padding: 0.5rem;

	cursor: pointer;

	transition: ease-in-out 0.15s;

	&:hover {
		background: ${props => props.theme.hoverBackground};
	}
`;

const Table = styled.table`
	width: 100%;
	max-height: 1000px;

	overflow-y: scroll;

    border-collapse: collapse;
    margin: 3.5rem 0 0 0;

	color: ${props => props.theme.primary};

    tr:nth-child(even) {
        background: ${props => props.theme.tableCellSecondary};
    }
    tr:nth-child(odd) {
        background: ${props => props.theme.tableCellPrimary};
    }

    td, th {
        border: solid 1px ${props => props.theme.quaternary};
        padding: 0.45rem;
    }

    th {
        text-align: left;

        background: ${props => props.theme.accent};
        color: white;
    }

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const TableTD = styled.td`
	transition: ease-in-out 0.15s;
	cursor: pointer;
	
	a:hover {
		border-bottom: solid 1px ${props => props.theme.primary};
	}
`;

const TableButtonsContainer = styled.div`
	width: 100%;
	
	display: flex;
	flex-direction: row;
	align-items: center;

	margin: 1rem 0 0 0;
`;

const TableButton = styled.div`
	color: ${props => props.theme.primary};

	font-size: 1.1rem;
	font-weight: 700;

	padding: 0.45rem 0.75rem;

	border-radius: 0.25rem;

	cursor: pointer;

	transition: ease-in-out 0.15s;

	border: solid 2px ${props => props.theme.quaternary};
	&:hover {
		border: solid 2px ${props => props.theme.primary};
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

const CollegeCompareContainer = styled.div`
	width: 100%;

	margin: 1rem 0 0 0;

	display: flex;
	flex-direction: row;

	position: relative;

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const CompareSearchContainer = styled.div`
	width: 38%;
	margin: 0 5% 0 0;

	position: relative;

	@media screen and (max-width: 768px) {
		width: 100%;

		margin: 0;

		&:nth-child(2) {
			margin: 1rem 0 0 0;
		}
	}
`;

const CompareButton = styled.button`
	flex: 1;

	outline: none;
	border: none;

	background: ${props => props.theme.accent};

	color: white;
	font-weight: 600;
	font-size: 1.1rem;

	border-radius: 0.85rem;

	cursor: pointer;

	transition: ease-in-out 0.12s;
	&:hover {
		opacity: 0.9;
	}

	&:focus {
		background: ${p => p.theme.primaryBackground};
		color: ${p => p.theme.accent};
		border: solid 2px ${p => p.theme.accent};
	}

	@media screen and (max-width: 768px) {
		width: 100%;

		margin: 1rem 0 0 0;
		padding: 1rem 0.5rem;
	}
`;
//#endregion

export default function Home() {
	const router = useRouter();

	const [collegeList, setCollegeList] = useState([]);
	const [collegeListPage, setCollegeListPage] = useState(0);
	const [collegeListMap, setCollegeListMap] = useState([]);

	const [pathValueOne, setPathValueOne] = useState('');
	const [pathValueTwo, setPathValueTwo] = useState('');

	useEffect(() => {
		// 0 - 11, 10 - 21, 20 - 31
		const map = collegeList.slice(10 * collegeListPage, 10 * collegeListPage + 11).map((item, index) => (
			<tr key={index}>
				<TableTD onClick={() => router.push(`/colleges/${item.path}`)}>
					<a>
						{item.displayName}
					</a>
				</TableTD>
			</tr>
		));

		setCollegeListMap(map);

	}, [collegeList, collegeListPage]);

	useEffect(() => {
		const array = Object.entries(paths_ids);
		const modifiedArray = [];
		array.forEach(item => {
			const obj = {
				path: item[0],
				displayName: id_names[item[1]]
			}
			modifiedArray.push(obj);
		});
		setCollegeList(modifiedArray);
	}, []);

	const compare = () => {
		if(pathValueOne.length > 0 && pathValueTwo.length > 0) {
			router.push(`/collegecompare/${pathValueOne}/${pathValueTwo}`);
		}
	}

	return (
		<React.Fragment>
			{/**<TopBar />*/}

			<Container>
				<Head>
					<title>CollegeFacts</title>
					<meta name="description" content="CollegeFacts provides free and extensive data on thousands of U.S. colleges." />
					<meta name="keywords" content="college, common data set, university" />
				</Head>

				<Main>
					<Title>
						Find data on <a style={{ color: 'rgba(83, 82, 237, 1)' }}>thousands</a> of colleges
					</Title>

					<Description>
						Find, compare, and view <span style={{ fontWeight: 600 }}>free</span> data on colleges across the US.
					</Description>

					<SearchContainer>
						<CollegeSearchDropdown
							collegeList={collegeList}
						/>
					</SearchContainer>
					
					<Table>
						<tbody>
							<tr>
								<th>
									College
								</th>
							</tr>

							{collegeListMap}
						</tbody>
					</Table>
			
					<TableButtonsContainer>
						{collegeListPage > 0 ?
							<TableButton onClick={() => setCollegeListPage(collegeListPage - 1)} style={{ marginRight: 'auto' }}>
								Back
							</TableButton>
						: null}

						{collegeListPage < Math.ceil(collegeList.length / 10) ?
							<TableButton onClick={() => setCollegeListPage(collegeListPage + 1)} style={{ marginLeft: 'auto' }}>
								Next
							</TableButton>
						: null}
					</TableButtonsContainer>

					<LowerSectionContainer>
						<LowerSectionTitle>
							College Compare
						</LowerSectionTitle>

						<LowerSectionDescription>
							View and compare data from 2 colleges.
						</LowerSectionDescription>

						<CollegeCompareContainer>
							<CompareSearchContainer>
								<CollegeSearchDropdown
									collegeList={collegeList}

									disableNavigation

									setPathValue={setPathValueOne}

									placeholder='College one...'
								/>
							</CompareSearchContainer>

							
							<CompareSearchContainer>
								<CollegeSearchDropdown
									collegeList={collegeList}

									disableNavigation

									setPathValue={setPathValueTwo}

									placeholder='College two...'
								/>
							</CompareSearchContainer>

							<CompareButton onClick={compare}>Compare</CompareButton>
						</CollegeCompareContainer>
					</LowerSectionContainer>

					<LowerSectionContainer>
						<LowerSectionTitle>
							About
						</LowerSectionTitle>

						<LowerSectionDescription>
							This site provides data on thousands of colleges in the US, including admissions information and financial aid 
							data. The data used on this site comes from <AboutLink href="https://nces.ed.gov/ipeds/" target="_blank" rel="noopener noreferrer">https://nces.ed.gov/ipeds/</AboutLink>.
							The information is based on data collected for the year 2019.

							<br /><br />
							The data on this site is similar to data in the Common Data Sets for colleges. For example, admissions requirements, test scores, admitted applicants, and more is included.
						</LowerSectionDescription>
					</LowerSectionContainer>

					<FooterBar />
				</Main>
			</Container>
		</React.Fragment>
	)
}

function CollegeSearchDropdown(props: {
	collegeList: { displayName: string; path: string; }[];

	setPathValue?: (arg0: string) => void;
	disableNavigation?: boolean;

	style?: React.CSSProperties;

	placeholder?: string;
}): JSX.Element {
	const router = useRouter();

	const [keyboardPosition, setKeyboardPosition] = useState(-1);

	const searchBoxRef = useRef<HTMLInputElement>();
	const searchResultsRef = useRef<HTMLDivElement>();

	const [top, setTop] = useState(0);
	const [width, setWidth] = useState(0);

	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const [isFocused, setIsFocused] = useState(false);

	const recalculatePosition = () => {
		setTop(searchBoxRef.current?.getBoundingClientRect().height + 10);
		setWidth(searchBoxRef.current?.getBoundingClientRect().width);
	}

	useEffect(() => {
		function onKeyup(e: KeyboardEvent) {
			console.log('listen!');

			if (e.key === 'ArrowDown' && keyboardPosition < searchResults.length - 1) {
				setKeyboardPosition(keyboardPosition + 1);

				const item = searchResults[keyboardPosition];
				if(!item) { return }

				const itemElement = document.getElementById("searchResults" + item.path);
				const topPos = itemElement?.offsetTop;

				topPos && searchResultsRef.current.scrollTo(0, topPos);
			}
			else if(e.key === 'ArrowUp' && keyboardPosition > 0) {
				setKeyboardPosition(keyboardPosition - 1);

				const item = searchResults[keyboardPosition];
				const itemElement = document.getElementById("searchResults" + item.path);
				const topPos = itemElement?.offsetTop;

				topPos && searchResultsRef.current.scrollTo(0, topPos - itemElement.getBoundingClientRect().height * 2);
			}
			else if(e.key === 'Enter' && keyboardPosition !== -1 && keyboardPosition < searchResults.length) {
				const item = searchResults[keyboardPosition];

				if(props.disableNavigation === true) {
					setSearchText(item.displayName);
					setKeyboardPosition(-1);
					props.setPathValue(item.path);
					setIsFocused(false);
				}
				else {
					router.push(`/colleges/${item.path}`);
				}
			}
		}

		window.addEventListener('keyup', onKeyup);
		return () => window.removeEventListener('keyup', onKeyup);
	}, [keyboardPosition, searchResults]);

	useEffect(() => {
		recalculatePosition();
	}, [searchBoxRef]);

	useEffect(() => {
		search(searchText);
		setKeyboardPosition(-1);
	}, [searchText]);

	const search = async (searchText: string) => {
		if(searchText?.length < 3) {
			setSearchResults([]);
			setKeyboardPosition(-1);
			return;
		}
		else if(searchText?.length === 3) {
			recalculatePosition();
		}

		const filteredArr = props.collegeList.filter(i => {
			if(i.displayName.toLowerCase().includes(searchText.toLowerCase())) {
				return true;
			}
			return false;
		})

		setSearchResults(filteredArr);
	}

	const handleClick = (item) => {
		if(props.disableNavigation === true) {
			setSearchText(item.displayName);
			setKeyboardPosition(-1);
			props.setPathValue(item.path);
		}
		else {
			router.push(`/colleges/${item.path}`);
		}
	}

	return (
		<React.Fragment>
			<Search
				type='text'
				placeholder={props.placeholder ?? 'Search thousands of colleges...'}
				ref={searchBoxRef}

				value={searchText}
				onChange={e => setSearchText(e.target.value)}

				onFocus={() => setIsFocused(true)}
				onBlur={() => {
					setTimeout(() => {
						setIsFocused(false)
					}, 100);
				}}

				style={props.style}
			/>

			{searchResults?.length > 0 && isFocused ?
			<SearchResults
				ref={searchResultsRef}
				style={{
					width: width,
					top: top
				}}
			>
				{searchResults?.map((item, index) => (
					keyboardPosition === index ? (
						<SearchResultItemActive id={"searchResults" + item.path} onClick={() => handleClick(item)} key={index}>
							<SearchResultItemText>
								{item.displayName}
							</SearchResultItemText>
						</SearchResultItemActive>
					) : (
						<SearchResultItem id={"searchResults" + item.path} onClick={() => handleClick(item)} key={index}>
							<SearchResultItemText>
								{item.displayName}
							</SearchResultItemText>
						</SearchResultItem>
					)
				))}
			</SearchResults> : null}
		</React.Fragment>
	);
}