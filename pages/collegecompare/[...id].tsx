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

function Table(props): JSX.Element {
    return (
        <TableContainer>
            <TableInner>
                {props.children}
            </TableInner>
        </TableContainer>
    );
}

const TableContainer = styled.div`
    width: 100%;
    overflow: auto;
`;

const TableInner = styled.table`
    width: 100%;
    
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
    financialDataOne: { [key: string]: Datum },
    financialDataTwo: { [key: string]: Datum },
    collegeDataOne: { [key: string]: Datum },
    collegeDataTwo: { [key: string]: Datum },
    raceEthnicityDataOne: { [key: string]: Datum },
    raceEthnicityDataTwo: { [key: string]: Datum }
}): React.ReactNode {
    //const router = useRouter();

    const [dataCollegeOne, setDataCollegeOne] = useState<{ [key: string]: Datum }>();
    const [dataCollegeTwo, setDataCollegeTwo] = useState<{ [key: string]: Datum }>();

    const [financialDataCollegeOne, setFinancialDataCollegeOne] = useState<{ [key: string]: Datum }>();
    const [financialDataCollegeTwo, setFinancialDataCollegeTwo] = useState<{ [key: string]: Datum }>();

    const [raceEthnicityDataCollegeOne, setRaceEthnicityCollegeOne] = useState<{ [key: string]: Datum }>();
    const [raceEthnicityDataCollegeTwo, setRaceEthnicityCollegeTwo] = useState<{ [key: string]: Datum }>();

    useEffect(() => {
        setFinancialDataCollegeOne(processFinancialData(props.financialDataOne));
        setFinancialDataCollegeTwo(processFinancialData(props.financialDataTwo));

        setDataCollegeOne(props.collegeDataOne);
        setDataCollegeTwo(props.collegeDataTwo);

        setRaceEthnicityCollegeOne(props.raceEthnicityDataOne);
        setRaceEthnicityCollegeTwo(props.raceEthnicityDataTwo);
    }, [props]);

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

    const numberWithCommas = (x: string) => {
        return (parseFloat(x)).toLocaleString();
    }

    if(!dataCollegeOne || !dataCollegeTwo) {
        return (
            <PageContainer>
                <NavigationBar />

                <Title>
                    No data.
                </Title>

                <SubTitle>
                    One or both of these colleges is missing data, and cannot be compared.
                </SubTitle>
            </PageContainer>
        )
    }
    
    return (
        <PageContainer>
            <Head>
                <title>
                    {dataCollegeOne["UNITID"].data_processed} vs {dataCollegeTwo["UNITID"].data_processed} | CollegeFacts
                </title>

                <meta name="description" content={"Comparison of admissions statistics, financial data, and related data for " + dataCollegeOne["UNITID"].data_processed + " and " + dataCollegeTwo["UNITID"].data_processed} />
            </Head>

            <NavigationBar />

            <Title>
                {dataCollegeOne["UNITID"].data_processed} vs {dataCollegeTwo["UNITID"].data_processed}
            </Title>

            <Table>
                <tbody>
                    <tr>
                        <th>
                            Academic Information
                        </th>

                        <th>
                            {dataCollegeOne["UNITID"].data_processed}
                        </th>

                        <th>
                            {dataCollegeTwo["UNITID"].data_processed}
                        </th>
                    </tr>

                    {Object.entries(dataCollegeOne).filter((i, index) => index > 0 && index <= 9 && !i[0].startsWith('X') && (dataCollegeTwo[i[0]]?.data_processed.length > 0 || i[1].data_processed.length > 0)).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? item[1].data_processed : 'N/A')}
                            </td>

                            <td>
                                {dataCollegeTwo[item[0]].data_processed}
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
                            {dataCollegeOne["UNITID"].data_processed}
                        </th>

                        <th>
                            {dataCollegeTwo["UNITID"].data_processed}
                        </th>
                    </tr>

                    {Object.entries(dataCollegeOne).filter((i, index) => index > 9 && index <= 24 && (dataCollegeTwo[i[0]]?.data_processed.length > 0 || i[1].data_processed.length > 0)).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')}
                            </td>

                            <td>
                                {dataCollegeTwo[item[0]]?.data_processed?.length > 0 ? numberWithCommas(dataCollegeTwo[item[0]].data_processed) : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Table>
                <tbody>
                    <tr>
                        <th>
                            Admitted Students Information
                        </th>

                        <th>
                            {dataCollegeOne["UNITID"].data_processed}
                        </th>

                        <th>
                            {dataCollegeTwo["UNITID"].data_processed}
                        </th>
                    </tr>

                    {Object.entries(dataCollegeOne).filter((i, index) => index > 24 && (dataCollegeTwo[i[0]]?.data_processed.length > 0 || i[1].data_processed.length > 0)).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')}
                            </td>

                            <td>
                                {dataCollegeTwo[item[0]]?.data_processed?.length > 0 ? numberWithCommas(dataCollegeTwo[item[0]].data_processed) : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {raceEthnicityDataCollegeOne && raceEthnicityDataCollegeTwo ?
            <Table>
                <tbody>
                    <tr>
                        <th>
                            Race &amp; Ethnicity Statistics
                        </th>

                        <th>
                            {dataCollegeOne["UNITID"].data_processed}
                        </th>

                        <th>
                            {dataCollegeTwo["UNITID"].data_processed}
                        </th>
                    </tr>

                    {Object.entries(raceEthnicityDataCollegeOne ?? []).filter((i, index) => index > 4 && (raceEthnicityDataCollegeTwo[i[0]]?.data_processed.length > 0 || i[1].data_processed.length > 0)).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[1].column_title}
                            </td>

                            <td>
                                {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')} {item[1].column_title.split(' ').pop() === 'total' && index > 1 ? `(${(parseInt(item[1]?.data_processed) / parseInt(raceEthnicityDataCollegeOne["EFTOTLT"].data_processed) * 100).toFixed(2)}%)` : ''}
                            </td>

                            <td>
                                {raceEthnicityDataCollegeTwo[item[0]]?.data_processed?.length > 0 ? numberWithCommas(raceEthnicityDataCollegeTwo[item[0]].data_processed) : 'N/A'} {raceEthnicityDataCollegeTwo[item[0]].column_title.split(' ').pop() === 'total' && index > 1 ? `(${(parseInt(raceEthnicityDataCollegeTwo[item[0]]?.data_processed) / parseInt(props.raceEthnicityDataTwo["EFTOTLT"].data_processed) * 100).toFixed(2)}%)` : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : null}
            
            {financialDataCollegeOne && financialDataCollegeTwo ?
                <React.Fragment>
                    <Table>
                        <tbody>
                            <tr>
                                <th>
                                    Net Price by Income
                                </th>

                                <th>
                                    {dataCollegeOne["UNITID"].data_processed}
                                </th>

                                <th>
                                    {dataCollegeTwo["UNITID"].data_processed}
                                </th>
                            </tr>

                            <tr>
                                <td>
                                    $0 - $30,000
                                </td>

                                <td>
                                    ${(financialDataCollegeOne["NPT412"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPT412"]?.data_processed) : (financialDataCollegeOne["NPIS412"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPIS412"]?.data_processed) : 'N/A'))}
                                </td>

                                <td>
                                    ${(financialDataCollegeTwo["NPT412"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPT412"]?.data_processed) : (financialDataCollegeTwo["NPIS412"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPIS412"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    $30,001 - $48,000
                                </td>

                                <td>
                                    ${(financialDataCollegeOne["NPT422"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPT422"]?.data_processed) : (financialDataCollegeOne["NPIS422"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPIS422"]?.data_processed) : 'N/A'))}
                                </td>

                                <td>
                                    ${(financialDataCollegeTwo["NPT422"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPT422"]?.data_processed) : (financialDataCollegeTwo["NPIS422"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPIS422"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    $48,001 - $75,000
                                </td>

                                <td>
                                    ${(financialDataCollegeOne["NPT432"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPT432"]?.data_processed) : (financialDataCollegeOne["NPIS432"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPIS432"]?.data_processed) : 'N/A'))}
                                </td>

                                <td>
                                    ${(financialDataCollegeTwo["NPT432"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPT432"]?.data_processed) : (financialDataCollegeTwo["NPIS432"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPIS432"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    $75,001 - $110,000
                                </td>

                                <td>
                                    ${(financialDataCollegeOne["NPT442"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPT442"]?.data_processed) : (financialDataCollegeOne["NPIS442"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPIS442"]?.data_processed) : 'N/A'))}
                                </td>

                                <td>
                                    ${(financialDataCollegeTwo["NPT442"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPT442"]?.data_processed) : (financialDataCollegeTwo["NPIS442"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPIS442"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    $110,001+
                                </td>

                                <td>
                                    ${(financialDataCollegeOne["NPT452"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPT452"]?.data_processed) : (financialDataCollegeOne["NPIS452"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["NPIS452"]?.data_processed) : 'N/A'))}
                                </td>

                                <td>
                                    ${(financialDataCollegeTwo["NPT452"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPT452"]?.data_processed) : (financialDataCollegeTwo["NPIS452"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["NPIS452"]?.data_processed) : 'N/A'))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Average Scholarship & Grant Aid
                                </td>

                                <td>
                                    ${(financialDataCollegeOne["GRN4A2"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["GRN4A2"]?.data_processed) : (financialDataCollegeOne["GISTA2"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeOne["GISTA2"]?.data_processed) : 'N/A'))}
                                </td>

                                <td>
                                    ${(financialDataCollegeTwo["GRN4A2"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["GRN4A2"]?.data_processed) : (financialDataCollegeTwo["GISTA2"]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo["GISTA2"]?.data_processed) : 'N/A'))}
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
                                    {dataCollegeOne["UNITID"].data_processed}
                                </th>

                                <th>
                                    {dataCollegeTwo["UNITID"].data_processed}
                                </th>
                            </tr>

                            {Object.entries(financialDataCollegeOne).filter((i, index) => index > 0 && !i[0].startsWith('X') && (dataCollegeTwo[i[0]]?.data_processed.length > 0 || i[1].data_processed.length > 0)).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item[1].column_title}
                                    </td>

                                    <td>
                                        {(item[1].data_processed?.length > 0 ? numberWithCommas(item[1].data_processed) : 'N/A')}
                                    </td>

                                    <td>
                                        {financialDataCollegeTwo[item[0]]?.data_processed?.length > 0 ? numberWithCommas(financialDataCollegeTwo[item[0]].data_processed) : 'N/A'}
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

export async function getServerSideProps(context) {
    try {
        let id = context.params.id;

        if(id.length > 2) {
            return {
                notFound: true
            }
        }
        
        const collegeOneID = paths_ids[id[0]];
        const collegeTwoID = paths_ids[id[1]];

        const fileOne = path.join(process.cwd(), 'data', 'college_financial_data_files', `${collegeOneID}.json`);
        const fileTwo = path.join(process.cwd(), 'data', 'college_financial_data_files', `${collegeTwoID}.json`);

        const financialDataOne = await fs.readFile(fileOne);
        const financialDataTwo = await fs.readFile(fileTwo);

        const collegeDataFileOne = path.join(process.cwd(), 'data', 'output_college_data_files', `${collegeOneID}.json`);
        const collegeDataFileTwo = path.join(process.cwd(), 'data', 'output_college_data_files', `${collegeTwoID}.json`);

        const collegeDataOne = await fs.readFile(collegeDataFileOne);
        const collegeDataTwo = await fs.readFile(collegeDataFileTwo);

        const raceEthnicityDataFileOne = path.join(process.cwd(), 'data', 'output_race_ethnicity_data', `${collegeOneID}.json`);
        const raceEthnicityDataFileTwo = path.join(process.cwd(), 'data', 'output_race_ethnicity_data', `${collegeTwoID}.json`);

        const raceEthnicityDataOne = await fs.readFile(raceEthnicityDataFileOne);
        const raceEthnicityDataTwo = await fs.readFile(raceEthnicityDataFileTwo);

        return {
            props: {
                financialDataOne: JSON.parse(financialDataOne.toString()),
                financialDataTwo: JSON.parse(financialDataTwo.toString()),
                collegeDataOne: JSON.parse(collegeDataOne.toString()),
                collegeDataTwo: JSON.parse(collegeDataTwo.toString()),
                raceEthnicityDataOne: JSON.parse(raceEthnicityDataOne?.toString() ?? ''),
                raceEthnicityDataTwo: JSON.parse(raceEthnicityDataTwo?.toString() ?? '')
            }
        };
    }
    catch {
        return {
            props: {

            }
        }
    }
};

//#region
export interface Datum {
    column_title:   string;
    data:           string;
    data_processed: string;
}
//#endregion