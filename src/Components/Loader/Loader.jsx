import { GridLoader } from "react-spinners";

const Loader = () => {
    return (
         <div className='h-screen flex justify-center items-center'>
                <GridLoader color='green' size={50} />
            </div>
    );
};

export default Loader;