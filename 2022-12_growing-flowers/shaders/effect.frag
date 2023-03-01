#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform vec2 iResolution;
uniform sampler2D iTexture;
uniform float iPixelDensity;

#include "lygia/sample/clamp2edge.glsl"
#define NOISEBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/noiseBlur.glsl"

void main() {
  vec2 pixel = 1.0 / iResolution;
  vec2 st = gl_FragCoord.xy / iPixelDensity;
  vec2 uv = st * pixel;
  uv.y = 1.0 - uv.y;
  vec3 base = texture2D(iTexture, uv).rgb;
  vec3 blur = vec3(0.0);

  const float n = 10.0;
  for (float i = 0.0; i < n; ++i) {
    vec3 b = noiseBlur(iTexture, uv, pixel, 2.0 + 10.0 * i).rgb;
    float factor = 1.0 - i / n;
    factor = pow(factor, 0.9);
    blur = max(blur, b * factor);
  }

  gl_FragColor = vec4(blur, 1.0);
}