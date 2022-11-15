import {Link} from 'react-router-dom'

export default function ChangePSW() {
    return (
        <div className="modalDefaultContainer changePSW">
            <div className="modalContentWrapper">
                <h2>Forgot Password?</h2>
                <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                <div className="formContainer">
                    <form action="">
                        <input type="text" placeholder='Email, Phone, Username' />
                        <button>Send link</button>
                    </form>
                    <div className="errorMessage"></div>
                </div>
                <Link to={"/"}>Back to Log in {' >'} </Link>
            </div>
        </div>
    )
}