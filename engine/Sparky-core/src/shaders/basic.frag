#version 330 core

layout (location = 0) out vec4 color;

uniform vec4 col;

uniform vec2 light_pos = vec2(1.0, 1.0);

in DATA {
	vec4 pos;
	vec2 uv;
	float tid;
	vec4 color;
} fs_in;

uniform sampler2D textures[32];

void main() {
	float intensity = 1.0 / length(fs_in.pos.xy - light_pos);
	//color = col * intensity;
	vec4 texColor = fs_in.color;
	if (fs_in.tid > 0.0) {
		int tid = int(fs_in.tid - 0.5);
		texColor = texture(textures[tid], fs_in.uv);
	}

	color = texColor * intensity;
}