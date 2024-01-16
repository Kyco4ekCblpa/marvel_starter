import spinnerGif from './Rhombus.gif';

import './spinner.scss';

const Spinner = () => {
    return (
        <img src={spinnerGif} alt='loading spinner' className='spinner'/>
    )
}

export default Spinner;