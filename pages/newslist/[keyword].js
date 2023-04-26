import { useMediaQuery } from "react-responsive";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsList_pc from './newslist_pc';
import NewsList_mobile from './newslist_mobile'

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
        let api_url = "/api/news/"
        if (isRecentlyActive) api_url = "/api/news/recently/"
        // isLoading 상태를 true로 업데이트합니다.
        await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}${api_url}${keyword}/${lastIndex + 1}`)
            .then((response) => {
                if (response.data.SUCCESS) {
                    setLastIndex(response.data.DATA.result[9].news_id);
                    const newNewsData = [...newsData, ...response.data.DATA.result];

                    setNewsData(newNewsData);

                } else setIsError(true);
            })
            .catch((e) => {
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

    const [isRecentlyActive, setIsRecentlyActive] = useState(false);
    const [reloadRecentlyActive, setReloadRecentlyActive] = useState(false);

    const loginContext = useLoginContext();

    // userEffect chain 을 통해서 비동기 속의 동기성을 확보
    useEffect(() => {
        setLastIndex(0);
        setReloadRecentlyActive(isRecentlyActive)
    }, [isRecentlyActive])

    useEffect(() => {
        if (!loginContext.loggedIn) router.push('/login');
    })
    // 뉴스 데이터를 받아오는 로직
    useEffect(() => {
        // 뉴스 데이터를 가져오는 비동기 함수를 호출합니다.
        async function fetchData() {
            let api_url = "/api/news/"
            if (reloadRecentlyActive) api_url = "/api/news/recently/"
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${api_url}${keyword}/${lastIndex + 1}`)
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
            setLoading(true)
            fetchData();
        }
    }, [keyword, reloadRecentlyActive]);

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
                        newsData={newsData}
                        isRecentlyActive={isRecentlyActive}
                        setIsRecentlyActive={setIsRecentlyActive}
                    >
                    </NewsList_pc> :
                    <NewsList_mobile
                        isNewLoading={isNewLoading}
                        isError={isError}
                        isLoading={isLoading}
                        loginContext={loginContext}
                        keyword={keyword}
                        newsData={newsData}
                        isRecentlyActive={isRecentlyActive}
                        setIsRecentlyActive={setIsRecentlyActive}
                    >
                    </NewsList_mobile>}
            </>
        </NoSsr>
    )
}
