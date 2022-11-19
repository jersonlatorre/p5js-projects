#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform sampler2D iTexture;
uniform float iTime;

#include "lygia/generative/cnoise.glsl"

void main() {
  vec2 uv = 1.0 - vTexCoord;
  vec3 noise = vec3(cnoise(vec3(uv * 1.2, iTime * 5.0)) * 0.01);
  vec4 color = texture2D(iTexture, uv + vec2(0, noise.r));
  gl_FragColor = color * 1.1;
  // gl_FragColor = texture2D(iTexture, uv);
}