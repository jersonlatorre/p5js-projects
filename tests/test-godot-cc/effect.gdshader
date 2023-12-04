shader_type spatial;

uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear;
uniform sampler2D noise_texture_x;
uniform sampler2D noise_texture_y;
uniform sampler2D gradient_texture: filter_nearest;

void fragment(){
	float noise_x = texture(noise_texture_x, SCREEN_UV).r;
	float noise_y = texture(noise_texture_y, SCREEN_UV).r;
	noise_x = (noise_x * 2.0) - 1.0;
	noise_y = (noise_y * 2.0) - 1.0;
	vec4 c1 = texture(SCREEN_TEXTURE, SCREEN_UV + vec2(noise_x, noise_y) * 0.01);
	vec4 c2 = texture(SCREEN_TEXTURE, SCREEN_UV + vec2(noise_x, noise_y) * 0.1);
	vec4 c3 = texture(SCREEN_TEXTURE, SCREEN_UV + vec2(noise_x, noise_y) * 0.2);
	vec4 c = (c1 + c2 * 0.0 + c3 * 0.0) / 3.0;
	vec4 color = c;
	ALBEDO = color.rgb;
	// ALBEDO = vec3(z, z, z);
}
