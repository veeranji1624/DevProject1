import React from 'react'
import Carousel from './main/Carousel'
import About from './about/About'
import Services from './services/Services'
import Differentiators from './services/Differentiators'
import Partners from './services/Partners'
import Contact from './services/Contact'
import Footer from '../common/Footer'
import Careers from '../common/careers/Careers'
 
const Collection = () => {
  return (
    <div id="home" style={{background: '#F7F0F0'}}>
      <Carousel />
        <div className="social">
          <ul className="social-list">
            <li className="social-list-item">
              <a style={{textDecoration: 'none'}} href="https://www.facebook.com/PION-Global-311056766370111/" target="_blank" rel="noopener noreferrer" className="fa fa-facebook">{null}</a>
            </li>
            <li>
              <a style={{textDecoration: 'none'}} href="https://in.pinterest.com/d422588f0df26ec0b85279ce96db81/
              "target="_blank" rel="noopener noreferrer" className="fa fa-pinterest">{null}</a>
            </li>
            <li>
              <a style={{textDecoration: 'none'}} href="https://twitter.com/GlobalPion" target="_blank" rel="noopener noreferrer" className="fa fa-twitter">{null}</a>
            </li>
            <li>
              <a style={{textDecoration: 'none'}} href="https://www.youtube.com/channel/UCyhodaGPnUfG9DIoVZYRKaQ"target="_blank" rel="noopener noreferrer" className="fa fa-youtube-play">{null}</a>
            </li>
            <li>
              <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/company/pion-global/" target="_blank" rel="noopener noreferrer" className="fa fa-linkedin">{null}</a>
            </li>
          </ul>
        </div>
      <About />
      <Differentiators />
      <Services />      
      <Partners />
      <Careers />
      <Contact />
      <Footer />
    </div>
  )
}
export default Collection;