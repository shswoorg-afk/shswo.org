import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { RxArrowRight } from "react-icons/rx";

const images = [
    "/slider-img-1.jpeg",
    "/slider-img-2.jpeg",
    "/slider-img-3.jpeg",
];

const ImageSlider = () => {
    const [changeImage, setchangeImage] = useState<number>(0);

    const handleImage = () => {
        setchangeImage((prev) => (prev + 1) % images.length);
    };
    return (
        <div>
            <div className="flex justify-center mt-2">
                <div className="md:w-120 md:h-120 w-full relative px-2">
                    <div className="absolute right-0 top-[50%] bg-blue-400 rounded-full p-3 border border-white" onClick={handleImage}>
                        <RxArrowRight style={{strokeWidth : "0.5"}}/>
                    </div>
                    <Link to="/upcoming-programs">
                    <img
                        src={images[changeImage]}
                        alt={`Event photograph ${changeImage + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;