import { useMediaQuery } from "react-responsive";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewsCardScraped from '../../../components/newsCardScraped'
import Navigation from '../../../components/navbar'

import { useLoginContext } from '../../../context/loginstate';
import axios from 'axios';
import TogglePeriod from '../../../components/toggle_period';
import NoSsr from '../../../components/NoSsr';
import NewsList_pc from './newslist_pc';
import NewsList_mobile from './newslist_mobile';

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function NewsList() {
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelDownload_scraped = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            [
                'title',
                'summary',
                'broadcaster',
                'created_at',
                'url'
            ]
        ]);
        renderdNews.map((data) => {
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    [
                        data.title,
                        data.summary,
                        data.broadcaster,
                        data.created_at,
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


    const router = useRouter();
    const { keyword_id, keyword } = router.query;
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [newsListChange, setNewsListChange] = useState(false);
    const [isNoNews, setIsNoNews] = useState(false);
    const [isTodayOnlyActive, setIsTodayOnlyActive] = useState(false);
    const [renderdNews, setRenderdNews] = useState([]);
    const loginContext = useLoginContext();


    const newsToday = () => {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = ("0" + (today.getMonth() + 1)).slice(-2);
        const todayDate = ("0" + today.getDate()).slice(-2);
        const todayStr = `${todayYear}-${todayMonth}-${todayDate}`;

        return newsData.filter((news) => {
            const createdAt = new Date(news.created_at);
            const newsYear = createdAt.getFullYear();
            const newsMonth = ("0" + (createdAt.getMonth() + 1)).slice(-2);
            const newsDate = ("0" + createdAt.getDate()).slice(-2);
            const newsStr = `${newsYear}-${newsMonth}-${newsDate}`;
            return todayStr === newsStr;
        });
    };

    useEffect(() => {
        if (!loginContext.loggedIn) router.push('/login');
    })
    // 뉴스 데이터를 받아오는 로직
    useEffect(() => {
        // 키워드를 가져오는 비동기 함수를 호출합니다.
        async function fetchData() {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/scraped_news?keyword_id=${keyword_id}`)
                .then(response => {
                    if (response.data.SUCCESS) setNewsData(response.data.DATA.scraped_news)
                    else setIsError(true);
                })
                .catch(e => {
                    setIsError(true)
                    console.error(error);
                })
            setLoading(false);
        }
        setLoading(true)
        fetchData();
    }, [newsListChange]);

    useEffect(() => {
        if (isNoNews) {
            router.push('/customKeywordList')
        }
    }, [isNoNews])

    useEffect(() => {
        const newsToRender = isTodayOnlyActive ? newsToday() : newsData;
        setRenderdNews(newsToRender);
    }, [newsData, isTodayOnlyActive])

    const isPc = useMediaQuery({
        query: "(min-width:900px)"
    });
    return (
        <NoSsr>
            <>
                {isPc ? <NewsList_pc
                    excelDownload_scraped={excelDownload_scraped}
                    keyword={keyword}
                    isLoading={isLoading}
                    isError={isError}
                    renderdNews={renderdNews}
                    newsListChange={newsListChange}
                    setNewsListChange={setNewsListChange}
                    setIsNoNews={setIsNoNews}
                    isTodayOnlyActive={isTodayOnlyActive}
                    setIsTodayOnlyActive={setIsTodayOnlyActive}
                ></NewsList_pc> : <NewsList_mobile
                    keyword={keyword}
                    isLoading={isLoading}
                    isError={isError}
                    renderdNews={renderdNews}
                    newsListChange={newsListChange}
                    setNewsListChange={setNewsListChange}
                    setIsNoNews={setIsNoNews}
                    isTodayOnlyActive={isTodayOnlyActive}
                    setIsTodayOnlyActive={setIsTodayOnlyActive}
                ></NewsList_mobile>}
            </>
        </NoSsr>
    );
}

export default NewsList;
