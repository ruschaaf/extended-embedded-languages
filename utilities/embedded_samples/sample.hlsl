// A simple HLSL shader
struct VertexInput {
    float3 position : POSITION;
};

VertexOutput main(VertexInput input) {
    VertexOutput output;
    output.position = mul(float4(input.position, 1.0), model_view_proj);
    return output;
}
