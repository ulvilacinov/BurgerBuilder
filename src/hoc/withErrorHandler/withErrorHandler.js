import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";
import Auxiliary from "../Auxiliary/Auxiliary";


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
      const [error, errorHandler] = useHttpErrorHandler(axios);

        return (<Auxiliary>
            <Modal
                show={error}
                modalClosed={errorHandler}
            >
                {error ? error.message : null}
            </Modal>
            <WrappedComponent {...props} />
        </Auxiliary>);
    }
}

export default withErrorHandler;