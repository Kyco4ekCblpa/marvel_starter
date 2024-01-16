import errorGif from './error.gif';

import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img src={errorGif} alt='error gif' className='error' />
    )
}

export default ErrorMessage;