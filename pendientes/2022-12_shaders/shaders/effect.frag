#ifdef GL_ES
precision highp float;
#endif

uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uPixelDensity;

#include "lygia/sample/clamp2edge.glsl"
#define NOISEBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/noiseBlur.glsl"

void main() {
  vec2 uv = gl_FragCoord.xy / (uPixelDensity * uResolution);
  uv.y = 1.0 - uv.y;
  vec2 pixel = 1.0 / uResolution;
  vec3 base = texture2D(uTexture, uv).rgb;
  vec3 blur1 = noiseBlur(uTexture, uv, pixel, 5.0).rgb;
  vec3 blur2 = noiseBlur(uTexture, uv, pixel, 15.0).rgb;
  gl_FragColor = vec4(max(blur1, blur2), 1.0);
}