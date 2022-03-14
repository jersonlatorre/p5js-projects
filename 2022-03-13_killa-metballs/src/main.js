window.onload = function() {
	let div = document.querySelector('#metaballs')
	let backgroundColor = [ 255, 255, 255 ]
	let color1 = [ 200, 200, 200 ]
	let color2 = [ 155, 155, 155 ]
	let color3 = [ 96, 96, 96 ]

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
