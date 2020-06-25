import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://react-my-burger-548e2.firebaseio.com/"
});

export default instance;