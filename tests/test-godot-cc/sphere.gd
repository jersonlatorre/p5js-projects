extends MeshInstance3D

var noise = FastNoiseLite.new()
var time = 0
var index = 0
var sphere_seed
var center


func _ready():
	noise.fractal_octaves = 7
	noise.seed = sphere_seed


func _process(delta):
	time += delta

	var radius = 3
	var x = noise.get_noise_2d(time * 12, index) * radius + center.x
	var y = noise.get_noise_2d(time * 12 + 500, index) * radius + center.y
	var z = noise.get_noise_2d(time * 12 + 1000, index) * radius + center.z
	position = Vector3(x, y, z)
