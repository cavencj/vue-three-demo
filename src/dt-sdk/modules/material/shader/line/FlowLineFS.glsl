uniform vec3 u_color;
uniform float u_alpha;
uniform float u_frameNumber;
uniform vec2 u_resolution;
uniform float u_speed;
uniform float u_percent;
uniform float u_gradient;
uniform bool u_isY;

void main(void){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float t = fract(u_frameNumber / 1000.0 * u_speed) ;
    t *= (1.0 + u_percent);
    float alpha = smoothstep(t- u_percent, t, u_isY ? st.t : st.s) * step(-t, u_isY ? -st.t : -st.s);
    alpha += u_gradient;
    gl_FragColor = vec4(u_color, alpha);
}