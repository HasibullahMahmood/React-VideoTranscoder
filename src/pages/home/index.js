import React, { Component } from 'react';
import { Container, Row, Col, FormLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

import Uploader from '../../components/Uploader';
import VideoFormatSelect from './VideoFormatSelect';
import CodecSelect from './CodecSelect';
import ResolutionSelect from './ResolutionSelect';
import OutputCart from './OutputCart';

const CancelToken = axios.CancelToken;
let cancel;

class Home extends Component {
	constructor(props) {
		super(props);
		this.resetUploaderCompRef = React.createRef();
	}
	state = {
		videoRef: null,
		progress: 0,
		selectedVideoFormat: {
			label: 'mp4',
			value: 1,
		},
		selectedCodec: {
			label: 'H.264',
			value: 1,
		},
		selectedResolutions: [
			{
				label: '720p',
				value: 3,
			},
			{
				label: '480p',
				value: 4,
			},
		],

		disableInputs: false,
		sweetAlertOpen: false,
		uploadSucceed: false,
	};
	setVideoRef = (videoRef) => {
		this.setState({ videoRef });
	};

	startBtnHandler = () => {
		const { videoRef, selectedResolutions } = this.state;

		if (!videoRef || selectedResolutions.length === 0) {
			this.setState({ sweetAlertOpen: true });
			return;
		}
		this.setState({ disableInputs: true });
		this.postVideo();
	};

	postVideo = async () => {
		let {
			videoRef,
			selectedVideoFormat,
			selectedCodec,
			selectedResolutions,
		} = this.state;

		try {
			let url = '/videos';

			const config = {
				onUploadProgress: this.onUploadProgress,
				cancelToken: new CancelToken(function executor(c) {
					cancel = c;
				}),
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			selectedVideoFormat = JSON.stringify(selectedVideoFormat);
			selectedCodec = JSON.stringify(selectedCodec);
			selectedResolutions = JSON.stringify(selectedResolutions);

			const formData = new FormData();
			formData.append('sourceVideo', videoRef);
			formData.append('selectedVideoFormat', selectedVideoFormat);
			formData.append('selectedCodec', selectedCodec);
			formData.append('selectedResolutions', selectedResolutions);

			const response = await axios.post(url, formData, config);

			if (Boolean(response.data.result) === true) {
				this.setState({ uploadSucceed: true, progress: 0 });
			} else {
				console.log('False result in posting the video');
			}
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log('Video upload canceled');
			} else {
				console.log("I'm server response error");
				console.log(error);
			}
		}
	};

	onUploadProgress = (progressEvent) => {
		let uploadPercentage =
			(progressEvent.loaded / progressEvent.total) * 100;
		this.setState({ progress: uploadPercentage });
	};

	onVideoFormatSelect = (selectedVideoFormat) => {
		this.setState({ selectedVideoFormat });
	};

	onCodecSelect = (selectedCodec) => {
		this.setState({ selectedCodec });
	};

	onResolutionsSelect = (selectedResolutions) => {
		this.setState({ selectedResolutions });
	};

	resetHandler = () => {
		this.setState({
			disableInputs: false,
			progress: 0,
			uploadSucceed: false,
		});
		this.resetUploaderCompRef.current.reset();
	};
	render() {
		const {
			disableInputs,
			sweetAlertOpen,
			progress,
			selectedVideoFormat,
			selectedCodec,
			selectedResolutions,
			uploadSucceed,
		} = this.state;
		return (
			<main>
				<div className="home__header">
					<h1>Welcome to Video Converter Website</h1>
				</div>

				<Container>
					<Row>
						<Col
							lg={6}
							className={
								disableInputs
									? 'px-2 mb-3 not-allowed'
									: 'px-2 mb-3 no-select'
							}
						>
							<div
								className={
									disableInputs
										? 'home__left-cart pointer-none'
										: 'home__left-cart'
								}
							>
								<div className="text-center">
									<h4 className="home__cart-title">Inputs</h4>
								</div>
								<div>
									<FormLabel className="label">
										Source
									</FormLabel>
									<Uploader
										setVideoRef={this.setVideoRef}
										ref={this.resetUploaderCompRef}
									/>
								</div>
								<VideoFormatSelect
									selectedObj={selectedVideoFormat}
									onSelect={this.onVideoFormatSelect}
								/>
								<CodecSelect
									selectedObj={selectedCodec}
									onSelect={this.onCodecSelect}
								/>
								<ResolutionSelect
									selectedObjects={selectedResolutions}
									onSelect={this.onResolutionsSelect}
								/>
								<Button
									className="start-btn"
									onClick={this.startBtnHandler}
								>
									Start
								</Button>
							</div>
						</Col>
						<Col lg={6} className="px-2 mb-3">
							<div className="home__right-cart">
								<OutputCart
									progress={progress}
									cancel={cancel}
									uploadSucceed={uploadSucceed}
									reset={this.resetHandler}
								/>
							</div>
						</Col>
					</Row>
				</Container>
				{sweetAlertOpen ? (
					<SweetAlert
						warning
						title="Warning!"
						onConfirm={() => {
							this.setState({ sweetAlertOpen: false });
						}}
					>
						Please upload a video & fill-in the blanks!
					</SweetAlert>
				) : null}
			</main>
		);
	}
}

export default Home;
