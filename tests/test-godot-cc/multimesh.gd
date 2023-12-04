extends MultiMeshInstance3D

var noise = FastNoiseLite.new()
var time = 0
var size = 100


func map(value, min_a, max_a, min_b, max_b):
	value = clamp(value, min_a, max_a)
	var percentage = (value - min_a) / (max_a - min_a)
	var mapped_value = lerp(min_b, max_b, percentage)
	return mapped_value


func _ready():
	multimesh.transform_format = MultiMesh.TRANSFORM_3D
	multimesh.instance_count = size * size
	multimesh.visible_instance_count = size * size

	noise.fractal_octaves = 3

	for i in range(multimesh.instance_count):
		var x = map(i % size, 0, float(size), -1.0, 1.0)
		var z = map(floor(i / float(size)), 0, float(size), -1.0, 1.0)
		var pos = Vector3(x, 0, z)
		if pos.distance_to(Vector3.ZERO) < 0.9:
			multimesh.set_instance_transform(i, Transform3D(Basis(), pos))

func _process(delta):
	time += delta * 50.0
	for i in multimesh.visible_instance_count:
		var pos = multimesh.get_instance_transform(i).origin
		var n = noise.get_noise_3d(pos.x * 100.0, pos.z * 100.0, time)
		n = map(n, -1.0, 1.0, -0.4, 0.4)
		pos.y = n
		multimesh.set_instance_transform(i, Transform3D(Basis(), pos))
