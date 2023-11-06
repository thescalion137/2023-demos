import { useEffect, useRef } from 'react';
import './App.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';


function App() {
  gsap.registerPlugin(ScrollTrigger);
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    });
    const addImages = (formate, length) => {
      const array = [];
      for (let i = 22; i <= length; i++) {
        const str = '0'.repeat(3 - `${i}`.length);
        array.push(`/${str}${i}.${formate}`);
      }
      return array;
    };

    function files(index) {
      var data1 = addImages('jpg', 683);
      return data1[index];
    }

    const frameCount = 662;
    const images = [];
    const imageSeq = {
      frame: 1,
    };

    for (let i = 0; i <=frameCount; i++) {
      const img = new Image();
      img.src = files(i);
      images.push(img);
    }
    images[1].onload = render;
    function render() {
      scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.max(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }

    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: `none`,
      scrollTrigger: {
        trigger: '#page1',
        scroller: 'body',
        start: 'top top',
        end: 'top -5000%',
        scrub: 0.3,
        pin: true,
      },
      onUpdate: render,
    });

    gsap.to('#page1', {
      delay: 0.7,
      duration: 2,
      scrollTrigger: {
        trigger: '#page1',
        scroller: 'body',
        start: 'top top',
        end: '10% top',
        scrub: 0.3,
      },
    });

    // const tl=gsap.timeline()
    // tl.to("#page2")
  }, []);

  return (
    <>
      <div id="page1">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div id="page2">

      </div>
    </>
  );
}

export default App;
