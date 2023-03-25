#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform sampler2D iTexture;
uniform float iTime;
uniform float iPunch;

#include "lygia/generative/snoise.glsl"
#include "lygia/generative/random.glsl"

float circle(vec2 uv, vec2 center, float radius, float blur) {
  return smoothstep(radius, radius - blur, length(center - uv));
}

float curl(vec2 uv, float offset) {
  return snoise(vec3(uv * iPunch * 2.5, iTime));
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  float gap = 0.05;
  uv *= 1.0 - 2.0 * gap;
  uv += vec2(gap, gap);
  vec2 perlin = vec2(curl(uv, 0.0), curl(uv, 10.0));
  vec2 noise = vec2(random(uv), random(uv + 10.0)) - 0.5;
  vec2 displacement = (perlin * 0.02 * iPunch + noise * 0.02 * iPunch);
  vec4 color = texture2D(iTexture, uv + displacement);
  gl_FragColor = color;
}