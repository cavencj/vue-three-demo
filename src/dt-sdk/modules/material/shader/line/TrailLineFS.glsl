uniform vec3 u_color;
uniform float u_alpha;
uniform float u_frameNumber;
uniform vec2 u_resolution;
uniform float u_speed;
uniform bool u_isY;
void main(void){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float time = fract(u_frameNumber / 500.0 * u_speed) ;
    gl_FragColor = vec4(u_color, fract( u_isY ? st.t : st.s - time));
}