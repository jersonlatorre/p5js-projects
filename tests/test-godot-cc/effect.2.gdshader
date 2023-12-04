shader_type spatial;
uniform sampler2D SCREEN_TEXTURE: hint_screen_texture, filter_linear;
uniform sampler2D DEPTH_TEXTURE: hint_depth_texture, filter_linear;

float map(float value, float inputMin, float inputMax, float outputMin, float outputMax) {
  return outputMin + ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin);
}

void fragment() {
	float depth = textureLod(DEPTH_TEXTURE, SCREEN_UV, 0.0).r;
  vec4 upos = INV_PROJECTION_MATRIX * vec4(SCREEN_UV * 2.0 - 1.0, depth, 1.0);
  vec3 pixel_position = upos.xyz / upos.w;
	float z = pixel_position.z;
	z = map(z, -8, 0, 0.2, 1);
	EMISSION = vec3(z);
}
