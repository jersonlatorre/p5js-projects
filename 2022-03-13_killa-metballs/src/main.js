window.onload = function() {
	let div = document.querySelector('#metaballs')
	let backgroundColor = [ 162, 210, 255 ]
	let color1 = [ 254, 249, 239 ]
	let color2 = [ 255, 134, 94 ]
	let color3 = [ 254, 228, 64 ]

	new MetaBalls(
		div,
		[
			[ color1[0] / 255, color1[1] / 255, color1[2] / 255 ],
			[ color2[0] / 255, color2[1] / 255, color2[2] / 255 ],
			[ color3[0] / 255, color3[1] / 255, color3[2] / 255 ]
		],
		[ backgroundColor[0] / 255, backgroundColor[1] / 255, backgroundColor[2] / 255 ]
	)
}
