import { Card, Col, Placeholder, Row } from "react-bootstrap";
import PetPlaceholder from "../assets/pet-placeholder.png";

const CardSkeleton = ({ xlCount = 4 }) => {
	return (
		<Row xs={1} md={2} lg={3} xl={xlCount} className="g-4">
			{Array.from({ length: 8 }).map((_, idx) => (
				<Col key={idx}>
					<Card>
						<Card.Img
							style={{ height: 190 }}
							variant="top"
							src={PetPlaceholder}
						/>
						<Card.Body>
							<Placeholder as={Card.Title} animation="glow">
								<Placeholder xs={6} />
							</Placeholder>
							<Placeholder as={Card.Text} animation="glow">
								<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
								<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
								<Placeholder xs={8} />
							</Placeholder>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default CardSkeleton;
