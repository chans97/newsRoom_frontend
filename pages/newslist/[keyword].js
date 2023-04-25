import { useMediaQuery } from "react-responsive";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsList_pc from './newslist_pc';
import NewsList_mobile from './newlist_mobile'

import { useLoginContext } from '../../context/loginstate';
import NoSsr from "../../components/NoSsr";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";



export default function NewsList() {

    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelDownload = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            [
                'title',
                'summary',
                'broadcaster',
                'broadcastTime',
                'url'
            ]
        ]);
        newsData.map((data) => {
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    [
                        data.title,
                        data.summary,
                        data.broadcaster,
                        data.broadcastTime,
                        data.url,
                    ]
                ],
                { origin: -1 }
            );
            ws['!cols'] = [
                { wpx: 200 },
                { wpx: 200 }
            ]
            return false;
        });
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelFile = new Blob([excelButter], { type: excelFileType });
        FileSaver.saveAs(excelFile, keyword + excelFileExtension);
    }

    const [isNewLoading, setIsNewLoading] = useState(false);
    const [isNewError, setIsNewError] = useState(false);

    const fetchMoreData = async () => {
        // isLoading 상태를 true로 업데이트합니다.
        console.log('fetchMoreData to bottom!', isNewLoading);
        await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${keyword}/${lastIndex + 1}`)
            .then((response) => {
                if (response.data.SUCCESS) {
                    setLastIndex(response.data.DATA.result[9].news_id);
                    const newNewsData = [...newsData, ...response.data.DATA.result];

                    setNewsData(newNewsData);

                } else setIsError(true);
            })
            .catch((e) => {
                console.log("!@#!@#!");
                setIsError(true);
            })
            .finally(() => {
                setIsNewLoading(false); // isLoading 상태를 false로 업데이트합니다.
            });
    };
    useEffect(() => {
        if (isNewLoading) {
            fetchMoreData();
        }

    }, [isNewLoading])

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        console.log(scrollHeight - scrollTop, clientHeight)
        if (((scrollHeight - scrollTop) - clientHeight) < 0.5) {
            setIsNewLoading(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);




    const router = useRouter();
    const { keyword } = router.query;
    const [newsData, setNewsData] = useState([]);
    const [lastIndex, setLastIndex] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const loginContext = useLoginContext();
    useEffect(() => {
        if (!loginContext.loggedIn) router.push('/login');
    })
    // 뉴스 데이터를 받아오는 로직
    useEffect(() => {
        // 뉴스 데이터를 가져오는 비동기 함수를 호출합니다.
        async function fetchData() {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${keyword}/${lastIndex + 1}`)
                .then(response => {
                    if (response.data.SUCCESS) {
                        setNewsData(response.data.DATA.result);
                        setLastIndex(response.data.DATA.result[9].news_id);
                    }
                    else setIsError(true);
                })
                .catch((e) => {
                    setIsError(true)
                }
                )
            setLoading(false);

        }
        if (keyword) {
            fetchData();
        }
    }, [keyword]);

    const isPc = useMediaQuery({
        query: "(min-width:900px)"
    });

    return (
        <NoSsr>
            <>
                {isPc ?
                    <NewsList_pc
                        isNewLoading={isNewLoading}
                        excelDownload={excelDownload}
                        isError={isError}
                        isLoading={isLoading}
                        loginContext={loginContext}
                        keyword={keyword}
                        newsData={newsData}>
                    </NewsList_pc> :
                    <NewsList_mobile
                        isNewLoading={isNewLoading}
                        isError={isError}
                        isLoading={isLoading}
                        loginContext={loginContext}
                        keyword={keyword}
                        newsData={newsData}>
                    </NewsList_mobile>}
            </>
        </NoSsr>
    )
}
