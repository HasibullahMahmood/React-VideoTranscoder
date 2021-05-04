import React, { Component } from 'react';
import { RiPlayCircleLine } from 'react-icons/ri';
import { CgSoftwareDownload } from 'react-icons/cg';
import { ProgressBar } from 'react-bootstrap';
import openSocket from 'socket.io-client';
import axios from 'axios';

class OutputCart extends Component {
	state = {
		dataResolutions: [],
	};

	componentDidMount = () => {
		const socket = openSocket(axios.defaults.baseURL, { transports: ['websocket'] });

		socket.on('Encoding', (data) => {
			if (data.action === 'start') {
				this.handleEncodingStart(data);
			} else if (data.action === 'progress') {
				this.handleEncodingProgress(data);
			} else if (data.action === 'end') {
				this.handleEncodingEnded(data);
			}
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
		const resolutionId = data.resolution.value;
		let updatedDataResolutions = [...this.state.dataResolutions];
		updatedDataResolutions = updatedDataResolutions.map((item) => {
			if (item.id === resolutionId) {
				return { ...data, id: item.id, targetSize: item.targetSize };
			} else {
				return item;
			}
		});

		this.setState({ dataResolutions: updatedDataResolutions });
	};

	cancelUploadHandler = () => {
		const { cancel, reset } = this.props;
		if (cancel) {
			cancel();
			reset();
		}
	};

	render() {
		const { uploadingProgress, uploadSucceed, selectedResolutionLength } = this.props;
		const { dataResolutions } = this.state;

		// calculate total progress percentage
		let totalEncodingProgress = 0;
		dataResolutions.forEach((element) => {
			totalEncodingProgress += element.percent || 100;
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
				<div>
					<div className="upload-label-container">
						<span className="upload-label">
							{uploadSucceed ? 'Encoding ' : 'Uploading '}
							{progressBarPercent}%
						</span>
						<span
							className="cancel-label"
							onClick={() => {
								uploadSucceed ? this.props.reset() : this.cancelUploadHandler();
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
	const { resolution, targetSize } = props.data;
	return (
		<tr>
			<td className="col-3 col-lg-2 text-center">{resolution.label}</td>
			<td className="col-2 col-lg-2 text-center">{(targetSize / 1024).toFixed(2)} MB</td>
			<td className="col-7 col-lg-8">
				<div className="status__btns">
					<button>
						<RiPlayCircleLine size={20} className="mr-1" />
						Play
					</button>
					<button>
						<CgSoftwareDownload size={20} className="mr-1" />
						Download
					</button>
				</div>
			</td>
		</tr>
	);
};

export { OutputCart };
