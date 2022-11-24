#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform sampler2D iTexture;
uniform float iTime;

uniform float radius;
uniform float smooth;
uniform float speed;
uniform float detail;

#include "lygia/generative/snoise.glsl"
#include "lygia/generative/random.glsl"

float circle(vec2 uv, vec2 center, float radius, float blur) {
  return smoothstep(radius, radius - blur, length(center - uv));
}

float curl(vec2 uv, float offset) {
  return snoise(vec3(uv * detail, iTime * speed + offset)) * 0.5 - 0.5;
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  float mask = circle(uv, iMouse / iResolution, radius, smooth);
  vec2 perlin = vec2(curl(uv, 100.0), curl(uv, 0.0));
  vec2 noise = vec2(random(uv), random(uv + 100.0));
  vec2 displacement = (perlin + noise) * mask;
  vec4 color = texture2D(iTexture, uv + displacement);
  gl_FragColor = color;
}