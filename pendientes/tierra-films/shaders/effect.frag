#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D iTexture;
uniform float iTime;
uniform vec2 iMouse;
uniform float iRadius;
uniform float iForce;
uniform vec2 iResolution;

vec2 pixel = 1.0 / iResolution;
vec2 m = iMouse / iResolution;

#define PLATFORM_WEBGL
#include "lygia/filter/gaussianBlur/2D.glsl"
#include "lygia/generative/fbm.glsl"
#include "lygia/generative/random.glsl"

float circle(vec2 uv, vec2 center, float radius, float blur) {
  float d = distance(uv, center);
  return 1.0 - smoothstep(radius - blur * radius, radius + blur * radius, d);
}

float perlin(vec2 uv) { return fbm(vec3(uv * 15.0, iTime * 1.)); }

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec2 displacement = vec2(perlin(uv), perlin(uv + 1.0)) * 0.04 * iForce;
  vec2 noise = (vec2(random(uv) - 0.5, random(uv + 1.0) - 0.5)) * 0.04 * iForce;

  float circleMask = circle(uv, m, iRadius, 0.3);
  vec3 original = texture2D(iTexture, uv).rgb;
  vec3 blur = gaussianBlur2D(iTexture, uv + (displacement + noise) * circleMask,
                             pixel * circleMask * 2.0, 15)
                  .rgb;
  gl_FragColor = vec4(blur, 1.0);
}
