#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform sampler2D iTexture;
uniform float iTime;
uniform vec2 iResolution;

#define PLATFORM_WEBGL
#define GAUSSIANBLUR_2D
#include "lygia/sample/clamp2edge.glsl"
#define GAUSSIANBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/gaussianBlur/2D.glsl"


#include "lygia/generative/snoise.glsl"
#include "lygia/generative/random.glsl"

float circle(vec2 uv, vec2 center, float radius, float blur) {
  return smoothstep(radius, radius - blur, length(center - uv));
}

float curl(vec2 uv, float offset) {
  return snoise(vec3(uv * 2.5, iTime));
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec2 pixel = 1.0 / iResolution;
  vec2 st = gl_FragCoord.xy * pixel;
  vec2 perlin = vec2(curl(uv, 0.0), curl(uv + 1.0, 0.0));
  vec2 noise = vec2(random(uv), random(uv + 1.0)) - 0.5;
  vec2 displacement = (perlin * 0.2 + noise * 0.08);

  vec3 color = vec3(0.0);
  // color += texture2D(iTexture, uv).rgb;
  // color += gaussianBlur2D(iTexture, uv, 2.0 * pixel, 20).rgb * 0.1;
  // color += gaussianBlur2D(iTexture, uv, 5.0 *pixel, 20).rgb;
  color += texture2D(iTexture, uv + displacement).rgb;
  gl_FragColor = vec4(color, 1.0);
}