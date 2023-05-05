// A simple WGSL shader
struct VertexOutput {
    [[builtin(position)]] position : vec4<f32>;
};

[[stage(vertex)]]
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = uniforms.model_view_proj * vec4<f32>(input.position, 1.0);
    return output;
}
