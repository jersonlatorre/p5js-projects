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
uniform float grain;
uniform float speed;
uniform float amount;
uniform float detail;

#include "lygia/generative/fbm.glsl"
#include "lygia/generative/random.glsl"

float circle(vec2 uv, vec2 center, float radius, float blur) {
  return smoothstep(radius, radius - blur, length(center - uv));
}

float curl(vec2 uv) {
  return fbm(vec3(uv * detail, iTime * speed));
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  float mask = circle(uv, iMouse / iResolution, radius, smooth);
  vec2 perlin = vec2(curl(uv + iTime * 0.05), curl(uv + 1.0)) * amount;
  vec2 noise = vec2(random(uv), random(uv + 1.0)) * grain;
  vec2 displacement = (perlin + noise) * mask;
  vec4 color = texture2D(iTexture, uv + displacement);
  gl_FragColor = color;
}