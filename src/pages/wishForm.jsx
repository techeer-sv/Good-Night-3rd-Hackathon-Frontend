import React, { useState } from 'react';
import '../styles/wishForm.css';
import Navbar from '../components/Navbar';

// API 호출 함수
const createWish = async (wishData) => {
    try {
        const response = await fetch('http://localhost:8080/api/wishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wishData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

const WishForm = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('CAREER');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null); // 오류 메시지 상태 추가

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const wishData = {
            title,
            category,
            content,
        };

        try {
            const result = await createWish(wishData);
            console.log('Wish created successfully:', result);
            // 성공적으로 생성되었을 때 페이지 리다이렉트
            window.location.href = '/';
        } catch (error) {
            setError('Failed to create wish. Please try again.'); // 오류 메시지 설정
        }
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='wish-form-container'>
                <h1 className='wish-form-title'>소원 작성하기</h1>
                <form className='wish-form' onSubmit={handleSubmit}>
                    <div className='wish-form-group'>
                        <label className='wish-form-label' htmlFor='title'>제목</label>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='제목을 입력하세요'
                        />
                    </div>

                    <div className='wish-form-group'>
                        <label className='wish-form-label' htmlFor='category'>카테고리</label>
                        <select
                            id='category'
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value='CAREER'>Career</option>
                            <option value='HEALTH'>Health</option>
                            <option value='RELATIONSHIP'>Relationship</option>
                            <option value='MONEY'>Money</option>
                            <option value='GOAL'>Goal</option>
                            <option value='ACADEMICS'>Academics</option>
                            <option value='OTHER'>Other</option>
                        </select>
                    </div>

                    <div className='wish-form-group'>
                        <label className='wish-form-label' htmlFor='content'>내용</label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='내용을 입력하세요'
                        />
                    </div>

                    {error && <p className='error-message'>{error}</p>} {/* 오류 메시지 표시 */}

                    <button type='submit'>제출하기</button>
                </form>
            </div>
        </div>
    );
};

export default WishForm;