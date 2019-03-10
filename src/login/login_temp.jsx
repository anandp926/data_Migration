import React,{ Component } from 'react';
import Button from '../components/form/button/button'
import ArrowLeft from '@material-ui/icons/ArrowLeft'

class LoginTemp extends Component {
    render(){
        return(
            <div className="container text-center">
            <Button color="secondary" size="large"><ArrowLeft/>Sign In With Google</Button>
            </div>
        )
    }
}

export default LoginTemp