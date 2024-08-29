import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import '../styles/wishList.css'; // CSS 파일 임포트
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 임포트

const WishAllow = () => {
    const size = 9; // 한 번에 가져올 아이템 수
    const [wishes, setWishes] = useState([]); // 가져온 위시리스트 아이템 저장
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [page, setPage] = useState(0); // 현재 페이지
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
    const [filters, setFilters] = useState({ status: 'PENDING' }); // 기본 필터는 PENDING 상태만
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    // 데이터 가져오기 함수
    const fetchPosts = useCallback(async () => {
        if (!hasMore) return; // 더 가져올 데이터가 없으면 중단

        setLoading(true);
        setError(null);

        try {
            // API 호출
            const response = await fetch('http://localhost:8080/api/wishes?' + new URLSearchParams({
                status: filters.status,
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
                setPage((prevPage) => prevPage + 1); // 페이지 증가
            }
        });

        if (node) observerRef.current.observe(node); // 새 요소 관찰 시작
    }, [loading, hasMore]);

    // 승인 처리 함수
    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/wishes/${id}/approve`, {
                method: 'PATCH',
            });
            if (response.ok) {
                alert('소원이 승인되었습니다.');
                setWishes(prevWishes => prevWishes.filter(wish => wish.id !== id)); // 승인된 소원은 리스트에서 제거
            } else {
                alert('승인에 실패했습니다.');
            }
        } catch (err) {
            alert('서버 오류로 인해 승인을 처리할 수 없습니다.');
        }
    };

    // 거절 처리 함수
    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/wishes/${id}/reject`, {
                method: 'PATCH',
            });
            if (response.ok) {
                alert('소원이 거절되었습니다.');
                setWishes(prevWishes => prevWishes.filter(wish => wish.id !== id)); // 거절된 소원은 리스트에서 제거
            } else {
                alert('거절에 실패했습니다.');
            }
        } catch (err) {
            alert('서버 오류로 인해 거절을 처리할 수 없습니다.');
        }
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='wish-list-container'>
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
                                        >
                                            <div className='wish-info'>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>제목:</span> {wish.title}
                                                </div>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>카테고리:</span> {wish.category}
                                                </div>
                                                <div className='wish-item'>
                                                    <button className='approve-button' onClick={() => handleApprove(wish.id)}>O</button>
                                                    <button className='reject-button' onClick={() => handleReject(wish.id)}>X</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={wish.id}
                                            className='wish-card'
                                        >
                                            <div className='wish-info'>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>제목:</span> {wish.title}
                                                </div>
                                                <div className='wish-item'>
                                                    <span className='wish-label'>카테고리:</span> {wish.category}
                                                </div>
                                                <div className='wish-item'>
                                                    <button className='approve-button' onClick={() => handleApprove(wish.id)}>O</button>
                                                    <button className='reject-button' onClick={() => handleReject(wish.id)}>X</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <p>No pending wishes available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishAllow;