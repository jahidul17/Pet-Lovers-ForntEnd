import { Card, Col, Placeholder, Row } from "react-bootstrap";
import PetPlaceholder from "../assets/pet-placeholder.png";

const DetailsSkeleton = () => {
	return (
		<Row>
			<Col md={12} lg={6}>
				<Card>
					<Card.Img variant="top" src={PetPlaceholder} />
				</Card>
			</Col>
			<Col md={12} lg={6}>
				<div className="filter-title mt-4 mt-lg-0">
					<Placeholder className="mb-2" as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={4} />
					</Placeholder>
					<Placeholder animation="glow">
						<Placeholder xs={3} />
					</Placeholder>
				</div>
				<div>
					<Placeholder className="mb-2" as={Card.Title} animation="glow">
						<Placeholder xs={2} size="sm" />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
						<Placeholder xs={6} /> <Placeholder xs={8} />
					</Placeholder>
				</div>
				<div className="mt-3">
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={5} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={4} /> <Placeholder xs={3} />
					</Placeholder>
					<Placeholder.Button variant="primary" xs={3} />
				</div>
			</Col>
		</Row>
	);
};

export default DetailsSkeleton;
