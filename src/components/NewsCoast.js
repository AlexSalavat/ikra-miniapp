import React, { useEffect, useState } from 'react';

// Список RSS Google Alerts (можно расширять)
const RSS_URLS = [
  'https://www.google.com/alerts/feeds/01774507790294298106/845110848427929712',
  'https://www.google.com/alerts/feeds/01774507790294298106/6882105407994878657',
  'https://www.google.com/alerts/feeds/01774507790294298106/17971983383204798536',
  'https://www.google.com/alerts/feeds/01774507790294298106/17971983383204800557',
];

// Официальный rss2json бесплатный (ограничение по частоте запросов, для MVP хватает)
const makeFeedApi = (url) =>
  `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

const NewsCoast = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      // Запросим все RSS параллельно
      const results = await Promise.all(
        RSS_URLS.map((url) =>
          fetch(makeFeedApi(url))
            .then((res) => res.json())
            .catch(() => null),
        ),
      );
      // Собираем все новости, фильтруем ошибки
      let allNews = [];
      results.forEach((feed) => {
        if (feed && feed.status === 'ok' && Array.isArray(feed.items)) {
          allNews = allNews.concat(feed.items);
        }
      });
      // Сортировка по дате (свежие в начале)
      allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setNews(allNews);
    } catch (err) {
      setError('Ошибка загрузки');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '16px 0 64px 0' }}>
      <div
        style={{
          maxWidth: 440,
          margin: '0 auto',
          padding: '0 8px',
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            marginBottom: 18,
            padding: '7px 18px',
            borderRadius: 10,
            background: '#23232a',
            color: '#fff',
            border: 'none',
            fontWeight: 500,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ← Назад
        </button>
        <h2
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 18,
            letterSpacing: 0.08,
          }}
        >
          Новости побережья
        </h2>
        <button
          onClick={fetchNews}
          style={{
            background: '#37e08a',
            color: '#18181d',
            border: 'none',
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 14,
            padding: '7px 19px',
            cursor: 'pointer',
            marginBottom: 15,
          }}
        >
          Обновить
        </button>
        {loading && (
          <div style={{ color: '#bdbdbd', fontSize: 15, marginTop: 30 }}>Загрузка...</div>
        )}
        {error && <div style={{ color: 'red', marginTop: 18 }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {!loading &&
            !error &&
            news.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#18181d',
                  borderRadius: 17,
                  boxShadow: '0 2px 10px #13121c44',
                  padding: 0,
                  display: 'flex',
                  textDecoration: 'none',
                  color: '#fff',
                  minHeight: 100,
                  overflow: 'hidden',
                  transition: 'box-shadow .12s',
                  border: '1.2px solid #23232a',
                  alignItems: 'stretch',
                }}
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt=""
                    style={{
                      width: 95,
                      height: '100%',
                      objectFit: 'cover',
                      background: '#222',
                      flexShrink: 0,
                    }}
                    onError={(e) => {
                      e.target.src = '/images/no-image.webp';
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 95,
                      background: '#24242a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#888', fontSize: 12 }}>No&nbsp;Image</span>
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    padding: '13px 13px 13px 15px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14.4,
                      marginBottom: 4,
                      color: '#fff',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      color: '#bdbdbd',
                      fontSize: 12,
                      marginBottom: 4,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.author || item.source || ''}
                  </div>
                  <div
                    style={{
                      color: '#c3e4c7',
                      fontSize: 11.5,
                      marginBottom: 3,
                    }}
                  >
                    {item.pubDate ? new Date(item.pubDate).toLocaleDateString() : ''}
                  </div>
                  <div
                    style={{
                      color: '#bbb',
                      fontSize: 12,
                      lineHeight: 1.26,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      maxHeight: 36,
                      whiteSpace: 'normal',
                    }}
                  >
                    {item.description
                      ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 96) + '...'
                      : ''}
                  </div>
                </div>
              </a>
            ))}
        </div>
        {!loading && !error && news.length === 0 && (
          <div style={{ color: '#aaa', fontSize: 15, marginTop: 22 }}>Пока новостей нет.</div>
        )}
      </div>
    </div>
  );
};

export default NewsCoast;
