uniform vec3 u_color;
uniform float u_alpha;
void main(void){
    gl_FragColor = vec4(u_color,u_alpha);
}