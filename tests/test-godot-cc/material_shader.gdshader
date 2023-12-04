shader_type spatial;

uniform sampler2D image;
varying vec2 tex_position;

void vertex() {
	POINT_SIZE = 3.0;
	vec3 vv = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
	tex_position = vv.xz / 2.0 + 0.5;
}

void fragment() {
//	ALPHA = 0.8;
	vec4 color = texture(image, tex_position);
	EMISSION = vec3(color.r, color.g, color.b);
}
