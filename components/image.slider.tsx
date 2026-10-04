import { Link } from "@tanstack/react-router";
import { useState } from "react";
const images = [
    "/slider-img-1.jpeg",
    "/slider-img-2.jpeg",
    "/slider-img-3.jpeg",
];

const ImageSlider = () => {
    const [changeImage, setchangeImage] = useState<number>(0);

    const handleNextImage = () => {
        setchangeImage((prev) => (prev + 1) % images.length);
    };
    const handlePreviousImage = () => {
        setchangeImage((prev) => (prev - 1 + images.length) % images.length);
    };
    return (
        <div>
            <div className="flex justify-center mt-2">
                <div className="md:w-120 md:h-120 w-full px-2">
                    <Link to="/upcoming-programs">
                    <img
                        src={images[changeImage]}
                        alt={`Event photograph ${changeImage + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    </Link>
                </div>
            </div>
              <div>
                 <p className="text-xs md:text-base xl:text-base text-center mt-1 text-blue-800">Click the image above to visit upcoming programs</p>
              </div>
                <div className="flex justify-center gap-x-4 mt-3">
                    <button className="bg-blue-600 rounded-full p-1 text-white font-bold cursor-pointer" 
                    onClick={handlePreviousImage}>&larr; Previous Image</button>
                    <button className="bg-blue-600 rounded-full p-1 text-white font-bold cursor-pointer" 
                    onClick={handleNextImage}>Next Image &rarr;</button>
                </div>
        </div>
    );
};

export default ImageSlider;