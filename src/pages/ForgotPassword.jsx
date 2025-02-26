import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useForgotPasswordMutation } from "../app/services/petLovers";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const [username, setUserName] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [formError, setFormError] = useState("");

	const [forgotPassword, { data, error, success, isLoading }] =
		useForgotPasswordMutation();

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		setFormError("");
		if (!oldPassword || !newPassword) {
			setFormError("All fields must be provided");
			return;
		}

		const credentials = {
			old_password: oldPassword,
			new_password: newPassword,
		};

		try {
			await forgotPassword(credentials);
			// setFormError("");
			// setUserName("");
			// setEmail("");
			// setPassword("");
		} catch (error) {
			setFormError(error.message);
		}
	};

	return (
		<div
			style={{ height: "100vh" }}
			className="container d-flex justify-content-center align-items-center"
		>
			<Card style={{ width: "30rem" }}>
				<Card.Body>
					<Card.Title className="mb-4 text-center">Change Password</Card.Title>
					{formError && <Alert variant="warning">{formError}</Alert>}
					<Form onSubmit={handlePasswordChange}>
						<Form.Group
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label>Old password</Form.Label>
							<Form.Control type="password" placeholder="xyz@123" />
						</Form.Group>
						<Form.Group
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label>New password</Form.Label>
							<Form.Control type="password" placeholder="mnz@963" />
						</Form.Group>

						<div className="d-grid">
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ForgotPassword;
