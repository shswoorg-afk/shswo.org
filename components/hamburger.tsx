import { RxHamburgerMenu } from 'react-icons/rx'
const Hamburger = () => {
    return (
        <>
        <div className='border border-neutral-700/40 flex items-center p-1 rounded-md md:hidden'>
            <button>
                <RxHamburgerMenu size={25} style={{strokeWidth : 0.5}}/>
            </button>
        </div>
        </>
    )
}

export default Hamburger