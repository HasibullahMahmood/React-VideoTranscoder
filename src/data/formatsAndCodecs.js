const formats = [
	{
		label: 'MP4',
		value: 'mp4',
		codecs: [
			{ label: 'H.264', value: 'libx264' },
			{ label: 'H.265', value: 'libx265' },
			{ label: 'AV1', value: 'av1' },
		],
	},
	{
		label: 'HLS',
		value: 'hls',
		codecs: [
			{ label: 'H.264', value: 'libx264' },
			{ label: 'H.265', value: 'libx265' },
		],
	},
	{
		label: 'MPEG-DASH',
		value: 'dash',
		codecs: [
			{ label: 'H.264', value: 'libx264' },
			{ label: 'H.265', value: 'libx265' },
			{ label: 'VP9', value: 'vp9' },
		],
	},
	{
		label: 'WEBM',
		value: 'webm',
		codecs: [
			{ label: 'VP8', value: 'vp8' },
			{ label: 'VP9', value: 'vp9' },
		],
	},
];

export default formats;
