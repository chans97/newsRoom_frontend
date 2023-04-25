
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loading_Spinner() {
    return (
        <>
            <div className="spinner-wrapper">
                <FontAwesomeIcon icon={faSpinner} spin size='2x' />
            </div>
            <style jsx>{`
            .spinner-wrapper {
                margin-top: 20px;
            }
            `}</style>
        </>


    )

}
