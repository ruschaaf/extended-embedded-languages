// A simple GLSL shader
uniform mat4 model_view_proj;

in vec3 position;

void main() {
    gl_Position = model_view_proj * vec4(position, 1.0);
}
