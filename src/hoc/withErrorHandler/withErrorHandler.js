import React, { useState, useEffect } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const errorHandler = () => {
            setError(null);
        }

        const reqInterceptors = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        })
        const resInterceptors = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });


        useEffect(()=>{
            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
        }, [reqInterceptors,resInterceptors]);

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