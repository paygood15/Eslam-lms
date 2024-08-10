import React from 'react'
import { useEffect } from 'react';
const Animation = () => {
    useEffect(() => {
        const handleScroll = () => {
          document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      return (
        <div>
          <div className="progress"></div>
          <div className="cube-wrap">
            <div className="cube">
              <div className="side top">Ahmed</div>
              <div className="side bottom">Resha</div>
              <div className="side front">koop</div>
              <div className="side back"></div>
              <div className="side left"></div>
              <div className="side right"></div>
            </div>
          </div>
        </div>
      );
}

export default Animation