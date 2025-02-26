import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import UserImg from "../assets/user.png";
import { NavDropdown } from "react-bootstrap";
import { setAuth } from "../app/features/accounts/authSlice";

const Layout = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state.account);
	console.log("Layout", auth);
	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Link class="navbar-brand" to="/">
						PetLovers
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link className="nav-link active" aria-current="page" to="/">
								Home
							</Link>
							<Link className="nav-link active" aria-current="page" to="/pets">
								Pets
							</Link>
							<Link
								className="nav-link active"
								aria-current="page"
								to="/contact"
							>
								Contact
							</Link>
						</Nav>
						<Nav>
							{auth ? (
								<NavDropdown
									title={
										<img
											style={{ height: "45px", width: "45px" }}
											src={UserImg}
											alt=""
										/>
									}
									id="collapsible-nav-dropdown"
								>
									<NavDropdown.Item onClick={() => dispatch(setAuth(null))}>
										Logout
									</NavDropdown.Item>
									<NavDropdown.Item className="create-post" to="/#">
										Create Post
									</NavDropdown.Item>
									<NavDropdown.Item className="changepass" to="/#">
										Change Password
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<>
									<Link className="nav-link" to="/login">
										Login
									</Link>
									<Link className="nav-link" to="/signup">
										Sign up
									</Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Outlet />
		</>
	);
};

export default Layout;
