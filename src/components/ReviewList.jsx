const ReviewList = ({ reviews }) => {
  // Função para renderizar as estrelas de avaliação
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold">{review.clientName}</h3>
              <p className="text-gray-500 text-sm">{review.projectTitle}</p>
            </div>
            <div className="text-sm text-gray-500">{review.date}</div>
          </div>
          <div className="mb-3">{renderStars(review.rating)}</div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Ainda não há avaliações para este arquiteto.</p>
        </div>
      )}
    </div>
  )
}

export default ReviewList
