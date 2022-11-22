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
uniform float noise;
uniform float speed;
uniform float amount;
uniform float detail;

#include "lygia/generative/cnoise.glsl"
#include "lygia/generative/random.glsl"

vec4 circle(vec2 uv, vec2 center, float radius, float blur) {
  float color = smoothstep(radius, radius - blur, length(center - uv));
  return vec4(color);
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec3 perlinx = vec3(cnoise(vec3(uv * detail, iTime * speed + 1.0)) * amount);
  vec3 perliny = vec3(cnoise(vec3(uv * detail, iTime * speed)) * amount);
  vec3 noise = vec3(random(vec2(uv))) * noise;

  vec4 mask = circle(uv, iMouse / iResolution, radius, smooth);

  vec2 displacement =
      vec2((perlinx.x + noise.x) * mask.x, (perliny.x + noise.x) * mask.x);
  vec4 color = texture2D(iTexture, uv + displacement);
  gl_FragColor = color;
  // gl_FragColor = mask;
}