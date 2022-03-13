#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

uniform float backgroundColorR;
uniform float backgroundColorG;
uniform float backgroundColorB;

uniform float colorFrontR;
uniform float colorFrontG;
uniform float colorFrontB;

uniform float colorBackR;
uniform float colorBackG;
uniform float colorBackB;

uniform vec2 frontPosition0;
uniform vec2 frontPosition1;
uniform vec2 frontPosition2;
uniform vec2 frontPosition3;
uniform vec2 frontPosition4;
uniform vec2 frontPosition5;
uniform vec2 frontPosition6;
uniform vec2 frontPosition7;
uniform vec2 frontPosition8;
uniform vec2 frontPosition9;

uniform vec2 backPosition0;
uniform vec2 backPosition1;
uniform vec2 backPosition2;
uniform vec2 backPosition3;
uniform vec2 backPosition4;
uniform vec2 backPosition5;
uniform vec2 backPosition6;
uniform vec2 backPosition7;
uniform vec2 backPosition8;
uniform vec2 backPosition9;

uniform float radius0;
uniform float radius1;
uniform float radius2;
uniform float radius3;
uniform float radius4;
uniform float radius5;
uniform float radius6;
uniform float radius7;
uniform float radius8;
uniform float radius9;

uniform float opacity;

float Sphere(vec2 uv, vec2 position, float radius) {
  float dist = radius / distance(uv, position);
  return dist * dist;
}

vec4 blend(vec4 source, vec4 destination) {
  float alpha = source.a + destination.a * (1.0 - source.a);
  vec3 rgb = (source.rgb * source.a + destination.rgb * (1.0 - source.a)) / alpha;
  return vec4(rgb, alpha);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.y;
  vec4 backgroundColor = vec4(backgroundColorR, backgroundColorG, backgroundColorB, 1.0);

    // front value
  float frontValue = 0.0;
  frontValue += Sphere(uv, frontPosition0, radius0);
  frontValue += Sphere(uv, frontPosition1, radius1);
  frontValue += Sphere(uv, frontPosition2, radius2);
  frontValue += Sphere(uv, frontPosition3, radius3);
  frontValue += Sphere(uv, frontPosition4, radius4);
  frontValue += Sphere(uv, frontPosition5, radius5);
  frontValue += Sphere(uv, frontPosition6, radius6);
  frontValue += Sphere(uv, frontPosition7, radius7);
  frontValue += Sphere(uv, frontPosition8, radius8);
  frontValue += Sphere(uv, frontPosition9, radius9);
  frontValue = smoothstep(0.5, 0.501, frontValue);

    // back value
  float backValue = 0.0;
  backValue += Sphere(uv, backPosition0, radius0);
  backValue += Sphere(uv, backPosition1, radius1);
  backValue += Sphere(uv, backPosition2, radius2);
  backValue += Sphere(uv, backPosition3, radius3);
  backValue += Sphere(uv, backPosition4, radius4);
  backValue += Sphere(uv, backPosition5, radius5);
  backValue += Sphere(uv, backPosition6, radius6);
  backValue += Sphere(uv, backPosition7, radius7);
  backValue += Sphere(uv, backPosition8, radius8);
  backValue += Sphere(uv, backPosition9, radius9);
  backValue = smoothstep(0.5, 0.501, backValue);

    // colors calculation
  vec4 front = vec4(colorFrontR, colorFrontG, colorFrontB, frontValue * opacity);
  vec4 back = vec4(colorBackR, colorBackG, colorBackB, backValue * 1.0);

    // blending
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
  color = blend(back, backgroundColor);
  color = blend(front, color);

  gl_FragColor = color;
}