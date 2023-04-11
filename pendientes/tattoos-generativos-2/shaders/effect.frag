#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform sampler2D iTexture;
uniform float iTime;
uniform vec2 iResolution;

#define PLATFORM_WEBGL
#include "lygia/filter/gaussianBlur/2D.glsl"
#include "lygia/generative/snoise.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/sample/clamp2edge.glsl"


#define NOISEBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/noiseBlur.glsl"

#define BOXBLUR_2D
#define BOXBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/boxBlur.glsl"

#include "lygia/filter/bilateralBlur.glsl"

float circle(vec2 uv, vec2 center, float radius, float blur) {
  return smoothstep(radius, radius - blur, length(center - uv));
}

float curl(vec2 uv, float offset) {
  return snoise(vec3(uv * 8.0, iTime));
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec2 pixel = 1.0 / iResolution;
  vec2 st = gl_FragCoord.xy * pixel;
  vec2 perlin = vec2(curl(uv, 0.0), curl(uv + 1.0, 0.0));
  vec2 noise = vec2(random(uv), random(uv + 1.0)) - 0.5;
  vec2 displacement = (perlin * 0.05 + noise * 0.0);

  vec3 color = vec3(0.0);
  // color += texture2D(iTexture, uv).rgb;
  // color += gaussianBlur2D(iTexture, uv, 2.0 * pixel, 20).rgb * 2.0;
  color += texture2D(iTexture, uv + displacement).rgb * 1.0;
  // color += noiseBlur(iTexture, uv, pixel, 20.0).rgb;
  // color += boxBlur(iTexture, uv, pixel, 20).rgb;
  // color += bilateralBlur(iTexture, uv, pixel, 20).rgb * 100.0;
  gl_FragColor = vec4(color, 1.0);
}