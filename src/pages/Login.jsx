import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useLoginMutation } from "../app/services/petLovers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/features/accounts/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [login, { isLoading }] = useLoginMutation();

	const handleLogin = async (e) => {
		e.preventDefault();
		setFormError("");
		if (!username || !email || !password) {
			setFormError("All fields must be provided");
			return;
		}

		const credentials = {
			username,
			email,
			password,
		};

		try {
			await login(credentials)
				.unwrap()
				.then((payload) => {
					if (payload?.error) {
						setSuccessMessage("");
						setFormError(payload?.error);
						return;
					}
					dispatch(setAuth(payload));
					navigate("/");
					setFormError("");
					setFormError("");
					setUserName("");
					setEmail("");
					setPassword("");
					setSuccessMessage("Successfully login!");
				})
				.catch(() => {
					setSuccessMessage("");
					setFormError("Failed to login! Please try again");
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
					<Card.Title className="mb-4 text-center">Login</Card.Title>
					{formError && <Alert variant="warning">{formError}</Alert>}
					{successMessage && <Alert variant="success">{successMessage}</Alert>}
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-3" controlId="formBasicUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								value={username}
								onChange={(e) => setUserName(e.target.value)}
								type="text"
								placeholder="johndoe123"
							/>
						</Form.Group>

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
							<Form.Control type="password" placeholder="**********" />
						</Form.Group>
						<div className="mb-3 d-flex justify-content-end">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div>
						<div className="d-grid">
							<Button disabled={isLoading} variant="primary" type="submit">
								{isLoading ? "Pleas wait..." : "Login"}
							</Button>
						</div>
						<div className="mt-2 d-flex align-items-center gap-1">
							<p className="p-0 m-0">Don't have an account?</p>
							<Link variant="link" to="/signup">
								Sign up here.
							</Link>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Login;
