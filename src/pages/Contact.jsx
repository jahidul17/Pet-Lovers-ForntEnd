import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useContactMutation } from "../app/services/petLovers";

const Contact = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [description, setDescription] = useState("");
	const [formError, setFormError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [contact, { data, error, success, isLoading }] = useContactMutation();

	const handleContact = async (e) => {
		e.preventDefault();
		setFormError("");
		setSuccessMessage("");
		if (!name || !phone || !description) {
			setFormError("All fields must be provided");
			return;
		}

		const credentials = {
			name,
			phone,
			description,
		};

		try {
			await contact(credentials)
				.unwrap()
				.then(() => {
					setFormError("");
					setName("");
					setPhone("");
					setDescription("");
					setSuccessMessage("Successfully submitted your contact");
				})
				.catch(() => {
					setSuccessMessage("");
					setFormError("Failed to send message. Please try again later.");
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
					<Card.Title className="mb-4 text-center">Contact</Card.Title>
					{formError && <Alert variant="warning">{formError}</Alert>}
					{successMessage && <Alert variant="success">{successMessage}</Alert>}
					<Form onSubmit={handleContact}>
						<Form.Group className="mb-3" controlId="formName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								placeholder="John Doe"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formPhone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								type="text"
								placeholder="01xxxxxxxxx"
							/>
						</Form.Group>

						<Form.Group
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="mb-3"
							controlId="formDescription"
						>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Do you give me a cat ....."
							/>
						</Form.Group>

						<div className="d-grid">
							<Button disabled={isLoading} variant="primary" type="submit">
								{isLoading ? "Please wait..." : "Submit"}
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Contact;
