import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
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
                <div className="md:w-120 md:h-120 w-full px-2 relative">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-950 to-white/20 font-bold text-sm text-white">
                        <div className="flex justify-between gap-x-4 mt-[30%] absolute w-full px-3">
                            <div className="bg-blue-800/40 rounded-full text-white font-bold cursor-pointer"
                                onClick={handlePreviousImage}><MdArrowLeft size={40} /></div>
                            <div className="bg-blue-800/40 rounded-full text-white font-bold cursor-pointer"
                                onClick={handleNextImage}><MdArrowRight size={40} /></div>
                        </div>
                        <div className="w-full text-left mt-[25%] pl-15 pr-10">
                            <Link to="/upcoming-programs">

                                <h1 className="text-lg whitespace-nowrap underline underline-offset-2">Meeting on health on October</h1>
                                <p className="text-xs italic">Meeting was based on health care particularly on cancer on 2026</p>
                            </Link>
                        </div>
                    </div>
                    <img
                        src={images[changeImage]}
                        alt={`Event photograph ${changeImage + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>
            <div>
                <p className="text-xs md:text-base xl:text-base text-center mt-1 text-blue-800">Click the image above to visit upcoming programs</p>
            </div>
        </div>
    );
};

export default ImageSlider;