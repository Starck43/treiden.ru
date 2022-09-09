import {Modal, CloseButton} from "react-bootstrap"
import PhotoGallery from "./PhotoGallery"


const LightBox = ({slides, currentSlide, title, excerpt, show, handleClose, className}) => {
    return (
        <Modal
            contentClassName="carousel-content"
            dialogClassName="carousel"
            centered
            fullscreen
            scrollable={false}
            backdrop={false}
            show={show}
            onHide={handleClose}
        >
            <PhotoGallery
                label="lightbox"
                className={className}
                current={currentSlide}
                title={title}
                excerpt={excerpt}
                slides={slides}
                //infinite={slides.length > 1} // infinite loop makes video duplicates in slider
                zoom
            />
            <CloseButton className="white" onClick={handleClose}/>
        </Modal>
    )
}

export default LightBox