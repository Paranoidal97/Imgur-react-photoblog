import React, { useState } from 'react';
import emailjs from 'emailjs-com'

function Contact() {
	const [emailSend, setEmailSend] = useState(false)
	const [emailError, setEmailError] = useState(false)

	function sendEmail(e) {
		e.preventDefault();

		emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_USER_ID)
			.then((result) => {
				console.log(result.text);
				emailSendPupUp()
			}, (error) => {
				console.log(error.text);
				emailErrorPupUp()
			});
		e.target.reset()
	}

	function emailSendPupUp() {
		setEmailSend(true)
		setTimeout(() => {
			setEmailSend(false)
		}, 5000);
	}

	function emailErrorPupUp() {
		setEmailError(true)
		setTimeout(() => {
			setEmailError(false)
		}, 10000);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-md-offset-2 m-auto">
					<div className="contact-form">
						<h1>Get in Touch</h1>
						<form onSubmit={sendEmail}>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label for="inputName">Name</label>
										<input type="text" className="form-control" id="inputName" name="name" required />
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label for="inputEmail">Email</label>
										<input type="email" className="form-control" id="inputEmail" name="email" required />
									</div>
								</div>
							</div>
							<div className="form-group">
								<label for="inputSubject">Subject</label>
								<input type="text" className="form-control" id="inputSubject" name="subject" required />
							</div>
							<div className="form-group">
								<label for="inputMessage">Message</label>
								<textarea className="form-control" id="inputMessage" rows="5" name="message" required />
							</div>
							<div className="text-center">
								<button type="submit" value="Send Message" className="btn btn-primary"><i className="fa fa-paper-plane"></i> Send</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{emailSend ? <div className="safety_Delate_Container">
				<div id="safetyDelete" className="text-center">
					<h3>Email was sent correctly, I will reply to it soon.</h3>
				</div>
			</div> : null}
			{emailError ? <div className="safety_Delate_Container">
				<div id="safetyDelete" className="text-center">
					<h3>There was a problem with sending an email, please write to me directly to lukaszbiernat02@gmail.com.</h3>
				</div>
			</div> : null}
		</div>
	);
}

export default Contact;

