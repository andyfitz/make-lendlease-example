import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
function App({ slides, logoUrl }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const timeoutRef = useRef(null);

  const handleSlideTimeout = useCallback(() => {
    if (currentSlideIdx < slides.length - 1) {
      console.log('Pause recording from template');
      setCurrentSlideIdx(currentSlideIdx + 1);
      console.log('Resume recording from template');
    } else {
      console.log('Stop recording from template');
    }
  }, [currentSlideIdx, slides]);

  useEffect(() => {
    console.log('Start recording from template');
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleSlideTimeout, slides[currentSlideIdx].seconds * 1000);
  }, [currentSlideIdx, handleSlideTimeout, slides]);

  return (
    <div className="App">
      {slides.map((slide, index) => (
        <section
          key={index}
          className={currentSlideIdx === index ? 'slide active': 'slide'}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <p>{slide.content}</p>
        </section>
      ))}
      <img
        alt="logo"
        src={logoUrl}
        className="logo"
      />
    </div>
  );
}

App.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    seconds: PropTypes.number.isRequired
  })).isRequired,
  logoUrl: PropTypes.string.isRequired,
}

App.defaultProps = {
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logo_Login_Lendlease.svg/1200px-Logo_Login_Lendlease.svg.png',
  slides: [
    {
      imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/tud-media/raw/images/023ef0ce-92c3-4994-8b38-6db0711b195e.jpg',
      content: 'This is page 1',
      seconds: 5,
    },
    {
      imageUrl: 'https://www.lendlease.com/au/-/media/llcom/ch02-proposition/expertise/expertiselandingpage_all_1900x500px.jpg?as=0&mh=500&hash=A61730C9E50E523DB89B95313A232C6788EEE4AF',
      content: 'This is page 2',
      seconds: 5,
    },
    {
      imageUrl: 'https://www.thefifthestate.com.au/wp-content/uploads/2019/06/vuepix-creative-display-lendlease.jpg',
      content: 'This is page 3',
      seconds: 5,
    },
    {
      imageUrl: 'https://officesnapshots.com/wp-content/uploads/2018/08/lendlease-hq-sydney-5.jpg',
      content: 'This is page 4',
      seconds: 5,
    }
  ]
}


export default App;
