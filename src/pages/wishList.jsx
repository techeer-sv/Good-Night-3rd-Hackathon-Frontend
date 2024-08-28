import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import '../styles/wishList.css'; // CSS 파일 임포트
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 임포트
import defaultImage from '../assets/dragon.png'; // 기본 이미지 임포트

const WishList = () => {
    const size = 9; // 한 번에 가져올 아이템 수
    const [wishes, setWishes] = useState([]); // 가져온 위시리스트 아이템 저장
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [page, setPage] = useState(0); // 현재 페이지
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
    const [filters, setFilters] = useState({ category: 'ALL', status: 'ALL' }); // 필터 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    // 데이터 가져오기 함수
    const fetchPosts = useCallback(async () => {
        if (!hasMore) return; // 더 가져올 데이터가 없으면 중단

        setLoading(true);
        setError(null);

        try {
            // API 호출
            const response = await fetch('http://localhost:8080/api/wishes?' + new URLSearchParams({
                category: filters.category === 'ALL' ? '' : filters.category,
                status: filters.status === 'ALL' ? '' : filters.status,
                page: page, // 현재 페이지
                size: size, // 한 번에 가져올 데이터 수
            }));

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // JSON 데이터 변환
            if (data.length < size) {
                setHasMore(false); // 더 이상 로드할 데이터가 없으면 false로 설정
            }

            // 이전 데이터에 새 데이터 추가
            if (page === 0) {
                setWishes(data);
            } else {
                setWishes(prevWishes => [...prevWishes, ...data]);
            }

        } catch (error) {
            setError('Error fetching posts');
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }, [filters, page, hasMore]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Observer를 위한 ref 생성
    const observerRef = useRef();

    // 마지막 요소에 대한 참조
    const lastElementRef = useCallback((node) => {
        if (loading) return; // 로딩 중이면 중단
        if (observerRef.current) observerRef.current.disconnect(); // 기존의 observer를 해제

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                console.log('마지막 컨텐츠 조회 완료', page); // 콘솔에 메시지 출력
                setPage((prevPage) => prevPage + 1); // 페이지 증가
            }
        });

        if (node) observerRef.current.observe(node); // 새 요소 관찰 시작
    }, [loading, hasMore]);

    // 필터 변경 시 처리
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
        setPage(0); // 필터 변경 시 페이지를 0으로 초기화
        setWishes([]); // 데이터 초기화
        setHasMore(true); // 더 많은 데이터가 있을 수 있으므로 재설정
    };

    // 이미지 클릭 시 상세 페이지로 이동
    const handleImageClick = (id) => {
        navigate(`/wishdetail/${id}`); // WishDetail 페이지로 이동
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='wish-list-container'>
                <div className='filters'>
                    <label>
                        Category:
                        <select name="category" value={filters.category} onChange={handleFilterChange}>
                            <option value='ALL'>All</option>
                            <option value='CAREER'>Career</option>
                            <option value='HEALTH'>Health</option>
                            <option value='RELATIONSHIP'>Relationship</option>
                            <option value='MONEY'>Money</option>
                            <option value='GOAL'>Goal</option>
                            <option value='ACADEMICS'>Academics</option>
                            <option value='OTHER'>Other</option>
                        </select>
                    </label>
                    <label>
                        Status:
                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value='ALL'>All</option>
                            <option value='APPROVED'>Approved</option>
                            <option value='PENDING'>Pending</option>
                            <option value='REJECTED'>Rejected</option>
                        </select>
                    </label>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <div className='wish-grid'>
                        {wishes.length > 0 ? (
                            wishes.map((wish, index) => {
                                // 마지막 요소에 대한 참조 설정
                                if (index === wishes.length - 1) {
                                    return (
                                        <div
                                            key={wish.id}
                                            className='wish-card'
                                            ref={lastElementRef}
                                            onClick={() => handleImageClick(wish.id)} // 이미지 클릭 이벤트 처리
                                        >
                                            <img src={wish.image || defaultImage} alt={wish.title} className='wish-image' />
                                            <div className='wish-info'>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>제목:</span> {wish.title}
                                                </div>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>카테고리:</span> {wish.category}
                                                </div>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>작성일:</span> {new Date(wish.createDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={wish.id}
                                            className='wish-card'
                                            onClick={() => handleImageClick(wish.id)} // 이미지 클릭 이벤트 처리
                                        >
                                            <img src={wish.image || defaultImage} alt={wish.title} className='wish-image' />
                                            <div className='wish-info'>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>제목:</span> {wish.title}
                                                </div>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>카테고리:</span> {wish.category}
                                                </div>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>작성일:</span> {new Date(wish.createDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;