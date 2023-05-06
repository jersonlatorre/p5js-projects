#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform sampler2D iTexture;
uniform vec2 iResolution;
uniform float iTime;

#include "lygia/generative/snoise.glsl"


float circle(vec2 uv, vec2 center, float radius, float blur) {
  return smoothstep(radius, radius - blur, length(center - uv));
}

float curl(vec2 uv, float offset) {
  return snoise(vec3(uv * 3.0, iTime)) * 0.1;
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec2 pixel = 1.0 / iResolution;
  vec2 st = gl_FragCoord.xy * pixel;
  vec2 perlin = vec2(curl(uv, 0.0), curl(uv + 1.0, 0.0));

  vec3 color = vec3(0.0);
  color += texture2D(iTexture, uv + perlin).rgb;
  gl_FragColor = vec4(color, 1.0);
}