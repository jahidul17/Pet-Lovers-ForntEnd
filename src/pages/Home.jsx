import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useGetListQuery } from "../app/services/petLovers";
import PetPlaceholder from "../assets/pet-placeholder.png";
import CardSkeleton from "../components/CardSkeleton";
import { Link } from "react-router-dom";

const Home = () => {
	const { data, isLoading, error } = useGetListQuery();

	let content = null;

	if (isLoading) {
		content = <CardSkeleton />;
	}

	if (!isLoading && (error || data.length === 0)) {
		content = (
			<div className="text-center">
				<h2 className="mt-5">No pets found</h2>
			</div>
		);
	}

	if (!isLoading && !error && data?.length) {
		content = (
			<Row xs={1} md={2} lg={3} xl={4} className="g-4">
				{data?.map((pet) => (
					<Col key={pet?.id}>
						<Card>
							<Card.Img
								style={{ height: 190 }}
								variant="top"
								src={pet?.image || PetPlaceholder}
							/>
							<Card.Body>
								<Card.Title>
									<Link to={`/details/${pet.id}`}>{pet?.title}</Link>
								</Card.Title>
								<Card.Text>
									{pet?.description.length > 20
										? pet.description.slice(0, 100) + "..."
										: ""}
								</Card.Text>
								<Card.Text>
									Category: {pet?.category} | Price: {pet?.price}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		);
	}

	return (
		<Container className="my-5">
			<div className="d-flex align-items-center justify-content-between">
				<div>
					<p className="mb-1">Whats new?</p>
					<h4 className="mb-4">Take a look at some of our pets</h4>
				</div>
				<Link to="/pets">
					<Button
						className="d-flex flex-grow-0 align-items-center"
						variant="outline-primary"
					>
						View more{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
							height="16"
							width="16"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</Button>
				</Link>
			</div>
			{content}
		</Container>
	);
};

export default Home;
