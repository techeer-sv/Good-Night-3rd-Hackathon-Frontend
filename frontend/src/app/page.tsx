import WishSection from '@/app/_component/WishSection'
import AuthButton from '@/app/_component/AuthButton'

export default function WishTree() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 w-screen h-screen flex flex-col items-center justify-between py-12">
      <header className="bg-white shadow-lg rounded-lg px-8 py-4 text-4xl font-bold text-yellow-600">
        Techeer Tree
      </header>
      <div className="w-full flex items-center justify-center">
        <WishSection />
      </div>
      <button className="btn bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200">
        소원 열매 달기
      </button>
    </div>
  )
}
