import React from 'react'
import Image from 'next/image';

export default function CircleImage({
    src,
    alt,
}: {
    src: string,
    alt: string,
}) {

  return (
    <>
      <Image
        className="rounded-full object-cover shadow-xl w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48"
        src={src}
        alt={alt}
        width="150" height="150"
      />
    </>
  )
}
