const newsData = [
    {
        id: 1,
        title: '네이버, 새로운 비즈니스 본격화',
        summary:
            '네이버는 인공지능(AI) 기술을 활용한 새로운 비즈니스를 본격화한다. 플랫폼 사업 부문에 앞서 이들 기술을 활용한 신규 서비스를 내놓고 시장에서 경쟁을 이어갈 방침이다.',
        broadcaster: 'KBS',
        broadcastTime: '2022-04-18 10:00:00',
    },
    {
        id: 2,
        title: '카카오, 인공지능 분야에서 독보적인 기술력 발휘',
        summary:
            '카카오는 인공지능 분야에서 독보적인 기술력을 발휘하며 시장을 선도하고 있다. 최근에는 자율주행 자동차 분야에 진출하며 높은 기대를 모은 바 있다.',
        broadcaster: 'MBC',
        broadcastTime: '2022-04-17 15:00:00',
    },
    {
        id: 3,
        title: '애플, 새로운 제품 출시 예고',
        summary:
            '애플이 다음 달 새로운 제품을 출시한다는 소식이 전해졌다. 출시 예고된 제품은 기존 제품들과는 차별화된 기능과 디자인을 제공할 예정이다.',
        broadcaster: 'SBS',
        broadcastTime: '2022-04-17 13:00:00',
    },
    {
        id: 4,
        title: '구글, 새로운 검색 알고리즘 도입',
        summary:
            '구글은 최근에 새로운 검색 알고리즘을 도입하여 사용자들에게 더욱 정확하고 유용한 검색 결과를 제공하고 있다. 이번 알고리즘 도입은 검색 엔진 시장에서 구글의 지위를 다시 한 번 확인하는 계기가 될 것으로 예상된다.',
        broadcaster: 'JTBC',
        broadcastTime: '2022-04-16 18:00:00',
    },
];

export default function handler(req, res) {
    const { keyword } = req.query;
    const filteredNewsData = newsData.filter((news) =>
        news.title.toLowerCase().includes(keyword.toLowerCase())
    );
    res.status(200).json(newsData);
}
