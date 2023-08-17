interface StarRatingProps {
  rating: number
  size: number
}

function StarRating({ rating, size }: StarRatingProps) {
  rating = Math.round(rating * 2) / 2

  const fullStars = Math.floor(rating)
  const halfStars = rating % 1 !== 0 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStars

  const dimension = `${25 * size}px`
  const scaleValue = 1.2 * size

  const fullStar = (key: number) => (
    <svg
      key={key}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2 2 20 20"
      fill="gold"
      width={dimension}
      height={dimension}
      style={{ margin: '0', padding: '0' }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        transform={`scale(${scaleValue})`}
        d="M12 2c.4 0 .8.2 1 .6l1.2 3.4 3.7.3c.4 0 .8.2 1 .6s0 .8-.3 1.1l-2.7 2.5.6 3.7c.1.4 0 .8-.3 1.1s-.7.4-1.1.3l-3.3-1.7-3.3 1.7c-.2.1-.4.1-.6.1s-.4-.1-.6-.2c-.4-.2-.6-.6-.6-1l.6-3.7-2.7-2.5c-.2-.2-.4-.5-.3-.8s.3-.5.6-.7l3.7-.3 1.2-3.4c.2-.4.6-.6 1-.6z"
      />
    </svg>
  )

  const halfStar = (key: number) => (
    <svg
      key={key}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2 2 20 20"
      width={dimension}
      height={dimension}
      style={{ margin: '0', padding: '0' }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        transform={`scale(${scaleValue})`}
        d="M12 2c.4 0 .8.2 1 .6l1.2 3.4 3.7.3c.4 0 .8.2 1 .6s0 .8-.3 1.1l-2.7 2.5.6 3.7c.1.4 0 .8-.3 1.1s-.7.4-1.1.3l-3.3-1.7-3.3 1.7c-.2.1-.4.1-.6.1s-.4-.1-.6-.2c-.4-.2-.6-.6-.6-1l.6-3.7-2.7-2.5c-.2-.2-.4-.5-.3-.8s.3-.5.6-.7l3.7-.3 1.2-3.4c.2-.4.6-.6 1-.6z"
        fill="gold"
      />
      <rect
        transform={`scale(${scaleValue})`}
        x="12"
        y="0"
        width="12"
        height="24"
        fill="white"
      />
    </svg>
  )

  const emptyStar = (key: number) => (
    <svg
      key={key}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={dimension}
      height={dimension}
      style={{ margin: '0', padding: '0' }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c.4 0 .8.2 1 .6l1.2 3.4 3.7.3c.4 0 .8.2 1 .6s0 .8-.3 1.1l-2.7 2.5.6 3.7c.1.4 0 .8-.3 1.1s-.7.4-1.1.3l-3.3-1.7-3.3 1.7c-.2.1-.4.1-.6.1s-.4-.1-.6-.2c-.4-.2-.6-.6-.6-1l.6-3.7-2.7-2.5c-.2-.2-.4-.5-.3-.8s.3-.5.6-.7l3.7-.3 1.2-3.4c.2-.4.6-.6 1-.6z" />
    </svg>
  )

  return (
    <div
      className="stars"
      style={{
        display: 'inline-flex',
        margin: '0',
        padding: '0',
        lineHeight: dimension,
      }}
    >
      {[...Array(fullStars)].map((_, i) => fullStar(i))}
      {halfStars ? halfStar(fullStars) : null}
      {[...Array(emptyStars)].map((_, i) => emptyStar(i))}
    </div>
  )
}

export default StarRating
