import React from "react"

type UnsplashCreditPropType = {
  image: string
  profile: string
  photographer: string
}

export function UnsplashCredit({
  image,
  profile,
  photographer,
}: UnsplashCreditPropType) {
  const unsplashreferral =
    "utm_source=bitesizeadventure.com&utm_medium=referral"

  return (
    <div className="unsplash-credit">
      <p>
        <a href={image} target="_blank" rel="noreferrer">
          photo
        </a>{" "}
        by{" "}
        <a
          href={`${profile}?${unsplashreferral}`}
          target="_blank"
          rel="noreferrer"
        >
          {photographer}
        </a>{" "}
        on{" "}
        <a
          href={`https://unsplash.com/?${unsplashreferral}`}
          target="_blank"
          rel="noreferrer"
        >
          unsplash
        </a>
      </p>
    </div>
  )
}
