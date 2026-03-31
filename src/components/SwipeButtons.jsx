export default function SwipeButtons({ onLike, onPass }) {
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <button
        onClick={onPass}
        className="w-16 h-16 rounded-full bg-pass-bg border-2 border-pass/30 flex items-center justify-center text-pass hover:scale-110 hover:shadow-lg hover:shadow-pass/20 transition-all cursor-pointer"
        title="Pass (←)"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        onClick={onLike}
        className="w-16 h-16 rounded-full bg-like-bg border-2 border-like/30 flex items-center justify-center text-like hover:scale-110 hover:shadow-lg hover:shadow-like/20 transition-all cursor-pointer"
        title="Like (→)"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0Z" />
        </svg>
      </button>
    </div>
  );
}
