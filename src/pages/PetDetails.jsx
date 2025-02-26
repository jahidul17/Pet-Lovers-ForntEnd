import { Card, Col, Container, Row } from "react-bootstrap";
import {
	useGetPetDetailsQuery,
	useGetReviewByIdQuery,
} from "../app/services/petLovers";
import { useParams } from "react-router-dom";
import DetailsSkeleton from "../components/DetailsSkeleton";
import PetPlaceholder from "../assets/pet-placeholder.png";

function formatDate(dateString) {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString("en-US", options);
}

const PetDetails = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetPetDetailsQuery({ id: id });
	const {
		data: review,
		isLoading: reviewLoading,
		error,
	} = useGetReviewByIdQuery({
		id: id,
	});

	return (
		<Container className="my-5">
			{isLoading && <DetailsSkeleton />}
			{!isLoading && data && (
				<Row>
					<Col md={12} lg={6}>
						<Card>
							<Card.Img variant="top" src={data?.image || PetPlaceholder} />
						</Card>
					</Col>
					<Col md={12} lg={6}>
						<div className="filter-title mt-4 mt-lg-0">
							<h3>{data?.title}</h3>

							<p className="text-secondary">
								<b>Origin:</b> {data?.origin}
							</p>
							<h5>${data?.price}</h5>
						</div>
						<div>
							<h5 className="mt-3">Details</h5>
							<p className="text-secondary">{data?.description}</p>
						</div>
						<div>
							<h5 className="mt-3">Additional Information</h5>
							<p className="text-secondary">
								<b>Category:</b> {data?.category} | <b>Age:</b> {data?.age} |{" "}
								<b>Gender:</b> {data?.gender}
							</p>
							<p className="text-secondary">
								<b>Contact:</b> {data?.contact}
							</p>
							<button className="btn btn-primary">Contact Seller</button>
						</div>
					</Col>
				</Row>
			)}

			<div className="mt-5 filter-title"></div>

			<div>
				<h6 className="my-4 text-secondary">
					Rating & Reviews
					{/* <span>({3})</span> */}
				</h6>
				{!reviewLoading && review && (
					<div className="card p-3 shadow-sm mb-3">
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">
								<h5 className="mb-1">{review?.reviewer}</h5>
								<small className="text-muted">
									{formatDate(review?.created)}
								</small>
							</div>
							<div className="text-warning">{review?.rating}</div>
						</div>
						<p className="mt-3">{review?.body}</p>
					</div>
				)}

				{!reviewLoading && error && (
					<div className="alert alert-warning p-4">
						<h5>No Reviews Available</h5>
						<p className="mb-0">{error?.data?.detail}</p>
					</div>
				)}
			</div>
		</Container>
	);
};

export default PetDetails;
