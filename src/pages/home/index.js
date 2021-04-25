import React, { Component } from 'react';
import { Container, Row, Col, FormLabel, Button } from 'react-bootstrap';

import Uploader from '../../components/Uploader';
import VideoFormatSelect from './VideoFormatSelect';
import CodecSelect from './CodecSelect';
import ResolutionSelect from './ResolutionSelect';
import OutputCart from './OutputCart';

class Home extends Component {
	render() {
		return (
			<main>
				<div className="home__header">
					<h1>Welcome to Video Converter Website</h1>
				</div>

				<Container>
					<Row>
						<Col lg={6} className="px-2 mb-3">
							<div className="home__left-cart">
								<div className="text-center">
									<h4 className="home__cart-title">Inputs</h4>
								</div>
								<div>
									<FormLabel className="label">
										Source
									</FormLabel>
									<Uploader />
								</div>
								<VideoFormatSelect />
								<CodecSelect />
								<ResolutionSelect />
								<Button className="start-btn">Start</Button>
							</div>
						</Col>
						<Col lg={6} className="px-2 mb-3">
							<div className="home__right-cart">
								<OutputCart />
							</div>
						</Col>
					</Row>
				</Container>
			</main>
		);
	}
}

export default Home;
