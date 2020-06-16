import React, { Component} from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component {
        state ={
            error: null
        }

        errorHandler = () => {
            this.setState({error:false});
        }

        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error});
            });
        }


        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        render (){
            return <Auxiliary>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorHandler}
                >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Auxiliary>
        }
    }
}

export default withErrorHandler;