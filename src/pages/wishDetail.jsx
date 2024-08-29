import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/WishDetail.css'; // 스타일 적용
import Navbar from '../components/Navbar';

const WishDetail = () => {
    const { id } = useParams(); // URL에서 ID를 가져옴
    const [wish, setWish] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userRole') === 'Admin');
    console.log('Is Admin:', isAdmin); // 확인용

    useEffect(() => {
        // 소원 상세 정보 가져오기
        const fetchWishDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/wishes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch wish detail');
                }
                const data = await response.json();
                setWish(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchWishDetail();
    }, [id]);

    const handleDelete = async () => {
        if (!isAdmin) {
            alert('관리자만 삭제할 수 있습니다.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/wishes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('소원이 성공적으로 삭제되었습니다.');
                navigate('/'); // 삭제 후 홈으로 이동
            } else {
                alert('삭제에 실패했습니다.');
            }
        } catch (err) {
            alert('서버 오류로 인해 삭제할 수 없습니다.');
        }
    };

    if (error) return <p>{error}</p>;
    if (!wish) return <p>Loading...</p>;

    return (
        <div className="container">
            <Navbar />
            <div className="wish-detail-container">
                <h1 className="wish-detail-title">소원 상세 정보</h1>
                <div className="wish-detail-group">
                    <div>
                        <label className="wish-detail-label">제목:</label>
                        <p className="wish-detail-info">{wish.title}</p>
                    </div>
                    <div>
                        <label className="wish-detail-label">카테고리:</label>
                        <p className="wish-detail-info">{wish.category}</p>
                    </div>
                    <div>
                        <label className="wish-detail-label">내용:</label>
                        <p className="wish-detail-info">{wish.content}</p>
                    </div>
                </div>
                {isAdmin && (
                    <button className="wish-detail-button" onClick={handleDelete}>
                        삭제하기
                    </button>
                )}
            </div>
        </div>
    );
};

export default WishDetail;