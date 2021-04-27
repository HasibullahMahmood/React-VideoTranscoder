import React, { Component, createRef } from 'react';
import Dropzone from 'react-dropzone';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { FaFileVideo } from 'react-icons/fa';

class Uploader extends Component {
	constructor(props) {
		super(props);
		this.dropzoneRef = createRef();
	}

	state = {
		videoName: '',
		dropzoneBorderColor: '#d9e0ea',
	};

	onDrop = (files) => {
		if (files.length === 0) {
			return;
		}
		const videoName = files[0].name;
		this.setState({ videoName });
		this.props.setVideoRef(files[0]);
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
		const { dropzoneBorderColor, videoName } = this.state;
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
						<div
							{...getRootProps({ className: 'dropzone' })}
							style={{ borderColor: dropzoneBorderColor }}
						>
							{videoName ? (
								<>
									<input
										{...getInputProps()}
										multiple={false}
									/>
									<FaFileVideo size={45} color="#426286" />
									<span className="dz-message1 pt-2">
										{videoName}
									</span>

									<span
										className="choose-another-file-btn"
										onClick={this.openDialog}
									>
										Choose another file
									</span>
								</>
							) : (
								<>
									<input
										{...getInputProps()}
										multiple={false}
									/>
									<IoCloudUploadSharp size={45} />
									<span className="dz-message1">
										Drag & drop a video here
									</span>
									<span className="dz-message2">
										Or click to select a video
									</span>
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
