import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useSignupMutation } from "../app/services/petLovers";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [username, setUserName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [formError, setFormError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [signup, { data, isLoading }] = useSignupMutation();

	const handleSignup = async (e) => {
		e.preventDefault();
		setFormError("");
		if (
			!username ||
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword
		) {
			setFormError("All fields must be provided");
			return;
		}

		const credentials = {
			username,
			first_name: firstName,
			last_name: lastName,
			email,
			password,
			confirm_password: confirmPassword,
		};

		try {
			await signup(credentials)
				.unwrap()
				.then((payload) => {
					console.log("payload", payload);
					if (payload?.error) {
						setSuccessMessage("");
						setFormError(payload?.error);
						return;
					}
					navigate("/login");
					setFormError("");
					setUserName("");
					setFirstName("");
					setLastName("");
					setEmail("");
					setPassword("");
					setConfirmPassword("");
					setSuccessMessage("Successfully user created");
				})
				.catch(() => {
					setSuccessMessage("");
					setFormError("Failed to user create! Please try again");
				});
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
					<Card.Title className="mb-4 text-center">Sign Up</Card.Title>
					{formError && <Alert variant="warning">{formError}</Alert>}
					{successMessage && <Alert variant="success">{successMessage}</Alert>}
					<Form onSubmit={handleSignup}>
						<Form.Group className="mb-3" controlId="formBasicUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								value={username}
								onChange={(e) => setUserName(e.target.value)}
								type="text"
								placeholder="johndoe123"
							/>

							<Form.Text className="text-muted">
								Max 150 chars. Use letters, numbers, and @/./+/-/_ only.
							</Form.Text>
						</Form.Group>

						<Row>
							<Col>
								<Form.Group className="mb-3" controlId="formBasicFirstName">
									<Form.Label>First name</Form.Label>
									<Form.Control
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										type="text"
										placeholder="John"
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3" controlId="formBasicLastName">
									<Form.Label>Last name</Form.Label>
									<Form.Control
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										type="text"
										placeholder="Doe"
									/>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								placeholder="john@example.com"
							/>
						</Form.Group>

						<Form.Group
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="************" />
						</Form.Group>

						<Form.Group
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="mb-3"
							controlId="formBasicConfirmPassword"
						>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="************" />
						</Form.Group>

						<div className="d-grid">
							<Button disabled={isLoading} variant="primary" type="submit">
								{isLoading ? "Pleas wait..." : "Sign Up"}
							</Button>
						</div>

						<div className="mt-2 d-flex align-items-center gap-1">
							<p className="p-0 m-0">Already have an account?</p>
							<Link variant="link" to="/login">
								Login here.
							</Link>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Signup;
