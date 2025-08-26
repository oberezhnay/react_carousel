import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration: number;
  infinite?: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const safeFrameSize = Math.max(1, frameSize);
  const safeStep = Math.max(1, step);

  const [carouselWidth, setCarouselWidth] = useState(0);
  const maxCarouselWidth = Math.max(0, (images.length - safeFrameSize) * itemWidth);

  const isPrevDisabled =
    !(images.length > safeFrameSize) || (!infinite && carouselWidth === 0);
  const isNextDisabled =
    !(images.length > safeFrameSize) ||
    (!infinite && carouselWidth >= maxCarouselWidth);

  useEffect(() => {
    if (carouselWidth > maxCarouselWidth) {
      setCarouselWidth(maxCarouselWidth);
    }
  }, [images, safeFrameSize, itemWidth, maxCarouselWidth]);

  const handleNextClick = () => {
    const newWidth = carouselWidth + safeStep * itemWidth;

    if (infinite) {
      setCarouselWidth(newWidth > maxCarouselWidth ? 0 : newWidth);
    } else {
      setCarouselWidth(Math.min(newWidth, maxCarouselWidth));
    }
  };

  const handlePrevClick = () => {
    const newWidth = carouselWidth - safeStep * itemWidth;

    if (infinite) {
      setCarouselWidth(newWidth < 0 ? maxCarouselWidth : newWidth);
    } else {
      setCarouselWidth(Math.max(newWidth, 0));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="container"
        style={{ width: itemWidth * frameSize + 'px' }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${carouselWidth}px)`,
            animationDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{ width: `${itemWidth}px`}}
            >
              <img
                src={image}
                alt={`Image ${image.match(/\d+/)?.[0] ?? ''}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrevClick} disabled={isPrevDisabled}>
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
