export default function WishPost() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 w-screen h-screen flex flex-col items-center justify-between py-12">
      <header className="bg-white shadow-lg rounded-lg px-8 py-4 text-4xl font-bold text-yellow-600">
        Techeer Tree
      </header>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 my-auto">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
          소원 열매 달기
        </h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700">제목</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">내용</label>
            <textarea className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div>
            <label className="block text-gray-700">카테고리</label>
            <select className="w-full p-2 border border-gray-300 rounded mt-1">
              <option value="">카테고리 선택</option>
              <option value="진로">진로</option>
              <option value="건강">건강</option>
              <option value="인간 관계">인간 관계</option>
              <option value="돈">돈</option>
              <option value="목표">목표</option>
              <option value="학업/성적">학업/성적</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
          >
            소원 등록
          </button>
        </form>
      </div>
    </div>
  )
}
