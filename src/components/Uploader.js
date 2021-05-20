import React, { Component, createRef } from 'react';
import Dropzone from 'react-dropzone';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { FaFileVideo } from 'react-icons/fa';

import mp4Icon from '../assets/icons/mp4.svg';
import aviIcon from '../assets/icons/avi.svg';
import movIcon from '../assets/icons/mov.svg';
import mpgIcon from '../assets/icons/mpg.svg';
//import mpegIcon from '../assets/icons/mpeg.svg';

class Uploader extends Component {
	constructor(props) {
		super(props);
		this.dropzoneRef = createRef();
	}

	state = {
		videoName: '',
		videoSize: '',
		videoFormat: '',
		dropzoneBorderColor: '#d9e0ea',
	};

	onDrop = (files) => {
		if (files.length === 0) {
			return;
		}

		const videoName = files[0].name;
		const videoSize = files[0].size;
		const videoFormat = files[0].type;

		this.setState({ videoName, videoSize, videoFormat });
		this.props.setVideoRef(files[0]);

		console.log(files[0]);
	};

	onDragEnter = () => {
		this.setState({ dropzoneBorderColor: '#426286' });
	};

	onDragLeave = () => {
		this.setState({ dropzoneBorderColor: '#d9e0ea' });
	};

	openDialog = () => {
		if (this.dropzoneRef.current) {
			this.dropzoneRef.dropzone.open();
		}
	};

	reset = () => {
		this.setState({ videoName: '' });
	};

	render() {
		let { dropzoneBorderColor, videoName, videoSize, videoFormat } = this.state;
		if (videoSize) {
			videoSize = (videoSize / 1024 / 1024).toFixed(2);
		}

		let videoIcon = <FaFileVideo size={45} color="#426286" />;
		if (videoFormat) {
			let src;
			switch (videoFormat) {
				case 'video/mp4':
					src = mp4Icon;
					break;
				case 'video/avi':
					src = aviIcon;
					break;
				case 'video/quicktime':
					src = movIcon;
					break;
				case 'video/mpeg':
					src = mpgIcon;
					break;
				// case 'video/mpeg':
				// 	src = mpegIcon;
				// 	break;
				default:
					break;
			}

			if (src) {
				videoIcon = <img src={src} alt="" width="45" />;
			}
		}

		return (
			<Dropzone
				onDrop={this.onDrop}
				accept={['video/*']}
				maxFiles={1}
				onDragEnter={this.onDragEnter}
				onDragLeave={this.onDragLeave}
				ref={(ref) => {
					this.dropzoneRef = ref;
				}}
			>
				{({ getRootProps, getInputProps }) => (
					<section className="dropzone-container">
						<div {...getRootProps({ className: 'dropzone' })} style={{ borderColor: dropzoneBorderColor }}>
							{videoName ? (
								<>
									<input {...getInputProps()} multiple={false} />
									{videoIcon}
									<span className="dz-message1 pt-2">{videoName}</span>
									<span className="dz-message1">{videoSize} MB</span>

									<span className="choose-another-file-btn" onClick={this.openDialog}>
										Choose another file
									</span>
								</>
							) : (
								<>
									<input {...getInputProps()} multiple={false} />
									<IoCloudUploadSharp size={45} />
									<span className="dz-message1">Drag & drop a video here</span>
									<span className="dz-message2">Or click to select a video</span>
								</>
							)}
						</div>
					</section>
				)}
			</Dropzone>
		);
	}
}

export default Uploader;
