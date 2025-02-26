import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import PetPlaceholder from "../assets/pet-placeholder.png";
import {
	useGetCategoryQuery,
	useGetListQuery,
} from "../app/services/petLovers";
import CardSkeleton from "../components/CardSkeleton";
import { useState } from "react";

const Pets = () => {
	const [selectOrigin, setSelectOrigin] = useState("");
	const [selectType, setSelectType] = useState("");

	const { data, isLoading, error } = useGetListQuery();
	const { data: type, isLoading: typeLoading } = useGetCategoryQuery({
		slug: "type",
	});
	const { data: origin, isLoading: originLoading } = useGetCategoryQuery({
		slug: "origin",
	});

	let content = null;

	if (isLoading) {
		content = <CardSkeleton xlCount={3} />;
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
			<Row xs={1} md={2} lg={3} className="g-4">
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
			<Row>
				<Col
					style={{ width: "280px" }}
					md="auto"
					className="border py-2 rounded"
				>
					<h5 className="mb-4">Filters</h5>
					<h6 className="filter-title">Origin</h6>
					<div className="d-flex flex-column gap-0">
						{typeLoading && (
							<Placeholder as={Card.Text} animation="glow">
								<Placeholder xs={4} />
								<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
								<Placeholder xs={8} />
							</Placeholder>
						)}
						{!typeLoading &&
							type?.map((t) => (
								<button
									style={selectType === t?.slug ? { fontWeight: "bold" } : null}
									key={t?.id}
									onClick={() => setSelectType(t?.slug)}
									className="origin-btn text-start text-secondary"
								>
									{t?.name}
								</button>
							))}
					</div>

					<h6 className="mt-4 filter-title">Type</h6>
					<div className="d-flex flex-column gap-0">
						{originLoading && (
							<Placeholder as={Card.Text} animation="glow">
								<Placeholder xs={4} />
								<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
								<Placeholder xs={8} />
							</Placeholder>
						)}
						{!originLoading &&
							origin?.map((c) => (
								<button
									style={
										selectOrigin === c?.slug ? { fontWeight: "bold" } : null
									}
									key={c?.id}
									onClick={() => setSelectOrigin(c?.slug)}
									className="origin-btn text-start text-secondary"
								>
									{c?.origin_country}
								</button>
							))}
					</div>
				</Col>
				<Col>{content}</Col>
			</Row>
		</Container>
	);
};

export default Pets;
