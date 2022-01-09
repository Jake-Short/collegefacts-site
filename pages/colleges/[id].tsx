import { paths } from '../../data/college_paths';
import { paths_ids } from '../../data/paths_ids';
import { promises as fs } from 'fs';
import path from 'path';
import styled from 'styled-components';
import NavigationBar from '../../components/NavigationBar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import data from '../../data/column_title_map.json';

//#region 
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 2rem;

    @media screen and (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;

    margin: 1rem 0 0 0;
`;

const SubTitle = styled.p`
    font-size: 1.25rem;
    font-weight: 600;

    margin: 0.15rem 0 0 0;

    color: rgba(0, 0, 0, 0.7);
`;

const Table = styled.table`
    border-collapse: collapse;
    margin: 1.5rem 0 0 0;

    tr:nth-child(even) {
        background: rgba(0, 0, 0, 0.07);
    }
    tr:nth-child(odd) {
        background: white;
    }

    td, th {
        border: solid 1px rgba(0, 0, 0, 0.2);
        padding: 0.45rem;
    }

    th {
        text-align: left;

        background: rgba(83, 82, 237, 1);
        color: white;
    }
`;
//#endregion

export default function CollegeDataPage(props: {
    data: { [key: string]: Datum },
    financialData: { [key: string]: Datum },
    raceEthnicityData: { [key: string]: Datum }
}): React.ReactNode {
    const [financialData, setFinancialData] = useState<{ [key: string]: Datum }>();

    useEffect(() => {
        setFinancialData(processFinancialData(props.financialData));
    }, [props]);

    const numberWithCommas = (x: string) => {
        return (parseFloat(x)).toLocaleString();
    }

    const processFinancialData = (financialData: { [key: string]: Datum }) => {
        const processedData = {};

        if(financialData) {
            Object.entries(financialData).forEach(([key, value]) => {
                if(key !== "UNITID") {
                    processedData[key] = {
                        "column_title": data[value["c_i"]],
                        "data_processed": value["d_p"]
                    }
                }
                else {
                    processedData[key] = {
                        "column_title": value["c_i"],
                        "data_processed": value["d_p"]
                    }
                }
            });
        }

        return processedData;
    }

    if(props.data === null) {
        return (
            <PageContainer>
                <NavigationBar />

                <Title>
                    No data.
                </Title>

                <SubTitle>
                    No data has been provided for this college.
                </SubTitle>
            </PageContainer>
        )
    }
    
    return (
        <PageContainer>
            <Head>
                <title>
                    {props.data["UNITID"].data_processed} | CollegeFacts
                </title>

                <meta name="description" content={"Admissions statistics, financial data, and related data for " + props.data["UNITID"].data_processed} />
            </Head>

            <NavigationBar />

            <Title>
                {props.data["UNITID"].data_processed}
            </Title>

            <Table>
                <tbody>
                    <tr>
                        <th>
                            Academic Information
                        </th>

                        <th>
                            Requirement
                        </th>
                    </tr>

                    {Object.entries(props.data).filter((i, index) => index > 0 && index <= 9 && !i[0].startsWith('X') && i[1].data_processed.length > 0).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? item[1].data_processed : 'N/A')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Table>
                <tbody>
                    <tr>
                        <th>
                            Admissions Information
                        </th>

                        <th>
                            Data
                        </th>
                    </tr>

                    {Object.entries(props.data).filter((i, index) => index > 9 && index <= 24 && i[1].data_processed.length > 0).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {props.data && Object.entries(props.data).filter((i, index) => index > 24 && i[1].data_processed.length > 0).length > 0 ?
            <Table>
                <tbody>
                    <tr>
                        <th>
                            Admitted Students Information
                        </th>

                        <th>
                            Data
                        </th>
                    </tr>

                    {Object.entries(props.data).filter((i, index) => index > 24 && i[1].data_processed.length > 0).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : null}

            {props.raceEthnicityData ?
            <Table>
                <tbody>
                    <tr>
                        <th>
                            Race &amp; Ethnicity Statistics
                        </th>

                        <th>
                            Data
                        </th>
                    </tr>

                    {Object.entries(props.raceEthnicityData ?? []).filter((i, index) => index > 4 && i[1].data_processed.length > 0).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')} {item[1].column_title.split(' ').pop() === 'total' && index > 1 ? `(${(parseInt(item[1]?.data_processed) / parseInt(props.raceEthnicityData["EFTOTLT"].data_processed) * 100).toFixed(2)}%)` : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : null}

            {financialData ?
                <React.Fragment>
                    <Table>
                        <tbody>
                            <tr>
                                <th>
                                    Net Price by Income
                                </th>

                                <th>
                                    Data
                                </th>
                            </tr>

                            <tr>
                                <td>
                                    $0 - $30,000
                                </td>

                                <td>
                                    ${(financialData["NPT412"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPT412"]?.data_processed) : (financialData["NPIS412"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPIS412"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    $30,001 - $48,000
                                </td>

                                <td>
                                    ${(financialData["NPT422"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPT422"]?.data_processed) : (financialData["NPIS422"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPIS422"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    $48,001 - $75,000
                                </td>

                                <td>
                                    ${(financialData["NPT432"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPT432"]?.data_processed) : (financialData["NPIS432"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPIS432"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    $75,001 - $110,000
                                </td>

                                <td>
                                    ${(financialData["NPT442"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPT442"]?.data_processed) : (financialData["NPIS442"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPIS442"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    $110,001+
                                </td>

                                <td>
                                    ${(financialData["NPT452"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPT452"]?.data_processed) : (financialData["NPIS452"]?.data_processed?.length > 0 ? numberWithCommas(financialData["NPIS452"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Average Scholarship & Grant Aid
                                </td>

                                <td>
                                    ${(financialData["GRN4A2"]?.data_processed?.length > 0 ? numberWithCommas(financialData["GRN4A2"]?.data_processed) : (financialData["GISTA2"]?.data_processed?.length > 0 ? numberWithCommas(financialData["GISTA2"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table>
                        <tbody>
                            <tr>
                                <th>
                                    Full Financial Information
                                </th>

                                <th>
                                    Data
                                </th>
                            </tr>

                            {Object.entries(financialData).filter((i, index) => index > 0 && !i[0].startsWith('X') && i[1].data_processed.length > 0).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item[1].column_title}
                                    </td>

                                    <td>
                                        {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </React.Fragment>
            : null}
        </PageContainer>
    );
}

//#region 
export async function getStaticPaths() {
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(props) {
    const id = paths_ids[props.params.id];

    const outputCollegeDataDirectory = path.join(process.cwd(), 'data', 'output_college_data_files');
    
    let fileData;
    try {
        fileData = await fs.readFile(path.join(outputCollegeDataDirectory, `${id}.json`), 'utf-8');
        fileData = JSON.parse(fileData);
    } catch (error) {
        fileData = null;
    }

    const outputCollegeFinancialDataDirectory = path.join(process.cwd(), 'data', 'college_financial_data_files');
    
    let financialFileData;
    try {
        financialFileData = await fs.readFile(path.join(outputCollegeFinancialDataDirectory, `${id}.json`), 'utf-8');
        financialFileData = JSON.parse(financialFileData);
    } catch (error) {
        //console.log(error);
        financialFileData = null;
    }

    const outputRaceEthnicityDataDirectory = path.join(process.cwd(), 'data', 'output_race_ethnicity_data');
    let raceEthnicityData;
    try {
        raceEthnicityData = await fs.readFile(path.join(outputRaceEthnicityDataDirectory, `${id}.json`), 'utf-8');
        raceEthnicityData = JSON.parse(raceEthnicityData ?? '');
    } catch (error) {
        //console.log(error);
        raceEthnicityData = null;
    }

    return {
        props: {
            data: fileData,
            financialData: financialFileData,
            raceEthnicityData: raceEthnicityData
        }
    }
}

export interface Datum {
    column_title:   string;
    data:           string;
    data_processed: string;
}
//#endregion