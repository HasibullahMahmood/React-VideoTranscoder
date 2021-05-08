import React, { Component, useState } from 'react';
import { RiPlayCircleLine } from 'react-icons/ri';
import { CgSoftwareDownload } from 'react-icons/cg';
import { ProgressBar } from 'react-bootstrap';
import openSocket from 'socket.io-client';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class OutputCart extends Component {
	state = {
		dataResolutions: [],
	};

	componentDidMount = () => {
		const socket = openSocket(axios.defaults.baseURL, {
			transports: ['websocket'],
		});

		socket.on('Encoding', (data) => {
			if (data.action === 'start') {
				this.handleEncodingStart(data);
			} else if (data.action === 'progress') {
				this.handleEncodingProgress(data);
			} else if (data.action === 'end') {
				this.handleEncodingEnded(data);
			}
		});
		socket.on('Error', (data) => {
			console.log('Server Encoding Video Error: ', data.error);
		});
	};

	handleEncodingStart = (data) => {
		// console.log('start: ', data);
		const updatedDataResolutions = [...this.state.dataResolutions];
		updatedDataResolutions.push({ ...data, id: data.resolution.value });
		this.setState({ dataResolutions: updatedDataResolutions });
	};

	handleEncodingProgress = (data) => {
		// console.log('progress: ', data);
		const resolutionId = data.resolution.value;
		let updatedDataResolutions = [...this.state.dataResolutions];
		updatedDataResolutions = updatedDataResolutions.map((item) => {
			if (item.id === resolutionId) {
				return { ...item, ...data };
			} else {
				return item;
			}
		});

		this.setState({ dataResolutions: updatedDataResolutions });
	};

	handleEncodingEnded = (data) => {
		// console.log('end: ', data);
		console.log(data);
		const resolutionId = data.resolution.value;
		let updatedDataResolutions = [...this.state.dataResolutions];
		updatedDataResolutions = updatedDataResolutions.map((item) => {
			if (item.id === resolutionId) {
				return { ...data, id: item.id, targetSize: item.targetSize, percent: 100 };
			} else {
				return item;
			}
		});

		this.setState({ dataResolutions: updatedDataResolutions });
	};

	cancelUploadHandler = () => {
		const { cancel } = this.props;
		if (cancel) {
			cancel();
			this.resetHandler();
		}
	};

	resetHandler = () => {
		this.props.reset();
		this.setState({ dataResolutions: [] });
	};

	render() {
		const { showOutput, uploadingProgress, uploadSucceed, selectedResolutionLength } = this.props;
		const { dataResolutions } = this.state;

		// calculate total progress percentage
		let totalEncodingProgress = 0;
		dataResolutions.forEach((element) => {
			totalEncodingProgress += element.percent;
		});

		let progressBarPercent = 0;
		if (!uploadSucceed) {
			progressBarPercent = uploadingProgress.toFixed(0);
		} else {
			progressBarPercent = (totalEncodingProgress / selectedResolutionLength || 0.01).toFixed(0);
		}

		const sortedDataResolutions = [...dataResolutions].sort((a, b) => a.id - b.id);

		return (
			<>
				<div className="text-center">
					<h4 className="home__cart-title">Outputs</h4>
				</div>
				{showOutput && (
					<>
						<div>
							<div className="upload-label-container">
								<span className="upload-label">
									{uploadSucceed ? 'Encoding ' : 'Uploading '}
									{progressBarPercent}%
								</span>
								<span
									className="cancel-label"
									onClick={() => {
										uploadSucceed ? this.resetHandler() : this.cancelUploadHandler();
									}}
								>
									{uploadSucceed ? 'Reset' : 'Cancel'}
								</span>
							</div>

							<ProgressBar now={progressBarPercent} className="custom-progress-bar" />
						</div>
						{uploadSucceed ? (
							<div>
								<table className="table output__table">
									<thead>
										<tr>
											<th className="col-3 col-lg-2 text-center">Resolution</th>
											<th className="col-2 col-lg-2 text-center">Size</th>
											<th className="col-7 col-lg-8">Status</th>
										</tr>
									</thead>
									<tbody>
										{sortedDataResolutions.map((item) => {
											if (item.action === 'progress') {
												return <EncodingOutputRow data={item} key={item.id} />;
											} else {
												return null;
											}
										})}
										{sortedDataResolutions.map((item) => {
											if (item.action === 'end') {
												return <EndedOutputRow data={item} key={item.id} />;
											} else {
												return null;
											}
										})}
									</tbody>
								</table>
							</div>
						) : null}
					</>
				)}
			</>
		);
	}
}

const EncodingOutputRow = (props) => {
	const { resolution, targetSize, percent } = props.data;

	return (
		<tr>
			<td className="col-3 col-lg-2 text-center">{resolution.label}</td>
			<td className="col-2 col-lg-2 text-center">{(targetSize / 1024).toFixed(2)} MB</td>
			<td className="col-7 col-lg-8">
				<label>encoding {percent.toFixed(0)}%</label>
				<ProgressBar className="status__encoding" now={percent.toFixed(0)} />
			</td>
		</tr>
	);
};

const EndedOutputRow = (props) => {
	const { videoFile, resolution, targetSize, videoFolder } = props.data;

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const downloadHandler = () => {
		const { videoFile, videoFolder } = props.data;
		const url = axios.defaults.baseURL + `/download?folder-name=${videoFolder}&file-name=${videoFile}`;
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
		if (newWindow) newWindow.opener = null;
	};

	return (
		<tr>
			<td className="col-3 col-lg-2 text-center">{resolution.label}</td>
			<td className="col-2 col-lg-2 text-center">{(targetSize / 1024).toFixed(2)} MB</td>
			<td className="col-7 col-lg-8">
				<div className="status__btns">
					<button onClick={handleShow}>
						<RiPlayCircleLine size={20} className="mr-1" />
						Play
					</button>
					<button onClick={downloadHandler}>
						<CgSoftwareDownload size={20} className="mr-1" />
						Download
					</button>
				</div>
				<VideoStreamPopUp
					show={show}
					videoFile={videoFile}
					videoFolder={videoFolder}
					handleClose={handleClose}
				/>
			</td>
		</tr>
	);
};

function VideoStreamPopUp(props) {
	const { show, handleClose, videoFolder, videoFile } = props;

	return (
		<>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Video</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ReactPlayer
						width="100%"
						height="100%"
						controls={true}
						config={{
							file: {
								attributes: {
									controlsList: 'nodownload',
								},
							},
						}}
						playing={true}
						className="react-player"
						url={`${axios.defaults.baseURL}/stream?folder-name=${videoFolder}&file-name=${videoFile}`}
					/>
					{/* <video controls autoPlay muted>
						<source
							src={`${axios.defaults.baseURL}/stream?folder-name=${videoFolder}&file-name=${videoFile}`}
							type="video/mp4"
						></source>
					</video> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export { OutputCart };
