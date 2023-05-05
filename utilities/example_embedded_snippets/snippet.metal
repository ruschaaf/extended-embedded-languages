// A simple Metal shader
struct VertexOutput {
    float4 position [[position]];
};

vertex VertexOutput vertexShader(const device packed_float3* vertex_buffer [[buffer(0)]],
                                 constant packed_float4x4& model_view_proj [[buffer(1)]],
                                 uint vid [[vertex_id]]) {
    VertexOutput output;
    float3 position = vertex_buffer[vid];
    output.position = model_view_proj * float4(position, 1.0);
    return output;
}