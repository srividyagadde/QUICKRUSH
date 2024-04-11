import Carousel from "react-bootstrap/Carousel";
import img1 from "../images/img2.jpg";
import img2 from "../images/imag3.jpg";
import img3 from "../images/img3.jpg";
import "./Home.css";
function Home() {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img src={img1} text="First slide" className="carousel" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} text="First slide" className="carousel" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={img3} text="First slide" className="carousel" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
