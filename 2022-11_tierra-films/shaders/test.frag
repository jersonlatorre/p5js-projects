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

float square(vec2 uv, vec2 center, float width, float height) { return 0.0; }

float curl(vec2 uv, float offset) {
  return fbm(vec3(uv * detail, iTime * speed + offset));
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  float mask = circle(uv, iMouse / iResolution, radius, smooth);
  vec2 perlin = vec2(curl(uv, 100.0), curl(uv, 0.0)) * amount;
  vec2 noise =
      vec2(random(uv * 5.0 + iTime * 10.0), random(uv + 100.0 + iTime * 10.0)) *
      grain;
  vec2 displacement = (perlin + noise) * mask;
  vec4 color = texture2D(iTexture, uv + displacement);
  gl_FragColor = color;
}