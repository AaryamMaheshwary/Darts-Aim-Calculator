// Global variables
var canvas = document.getElementById('canvas')
var slider = document.getElementById("slider");
var ctx = canvas.getContext('2d')
var board_diameter = 250

create_dartboard()

slider.oninput = function() {
    console.log('Slider value: ' + this.value)
}

function get_average_score_in_area(x, y, radius, num_iter) {
    var total_score = 0
    for (var i=0; i<num_iter; i++) {
        // Get a random point in the circular area
        var rand_dist = Math.sqrt(Math.random()) * radius
        var rand_radians = Math.random() * 2 * Math.PI
        var rand_x = rand_dist * Math.cos(rand_radians) + x
        var rand_y = rand_dist * Math.sin(rand_radians) + y

        // Get the point's score
        score = get_score(rand_x, rand_y)

        // Append the score to the total score
        total_score += score
    }
    // Divide the total score by the number of points to find the average score
    var average_score = total_score/num_iter

    return average_score
}

function get_score(x, y) {
    // Get the angle between the positive x axis and the dart
    var angle = Math.atan2(y, x) * 180 / Math.PI
    if (angle < 0) angle += 360

    // Get the distance between the dart and the center of the board
    var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    // Check if the dart has hit the bullseye or has missed the target
    if (dist <= board_diameter*.02689) return 50
    else if (dist <= board_diameter*.06734) return 25
    else if (dist > board_diameter*.72) return 0

    // Find the score of the dart based on its angle
    if (angle >= 351 || angle < 9) var score = 6
    else if (angle >= 9 && angle < 27) var score = 13
    else if (angle >= 27 && angle < 45) var score = 4
    else if (angle >= 45 && angle < 63) var score = 18
    else if (angle >= 63 && angle < 81) var score = 1
    else if (angle >= 81 && angle < 99) var score = 20
    else if (angle >= 99 && angle < 117) var score = 5
    else if (angle >= 117 && angle < 135) var score = 12
    else if (angle >= 135 && angle < 153) var score = 9
    else if (angle >= 153 && angle < 171) var score = 14
    else if (angle >= 171 && angle < 189) var score = 11
    else if (angle >= 189 && angle < 207) var score = 8
    else if (angle >= 207 && angle < 225) var score = 16
    else if (angle >= 225 && angle < 243) var score = 7
    else if (angle >= 243 && angle < 261) var score = 19
    else if (angle >= 261 && angle < 279) var score = 3
    else if (angle >= 279 && angle < 297) var score = 17
    else if (angle >= 297 && angle < 315) var score = 2
    else if (angle >= 315 && angle < 333) var score = 15
    else if (angle >= 333 && angle < 351) var score = 10

    // Check if the dart is on the double or triple ring
    if (dist >= board_diameter*.4193 && dist <= board_diameter*.4532) score *= 3
    else if (dist >= board_diameter*.6861 && dist <= board_diameter*.72) score *= 2

    return score
}

function create_dartboard() {
    // Colors
    var white = '#ffffff'
    var black = '#000000'
    var red = '#ff0000'
    var green = '#008000'

    // Numbers
    create_arc(black, board_diameter, 0, 2*Math.PI)
    create_number('20', 230, 50)
    create_number('1', 300, 60)
    create_number('18', 352, 90)
    create_number('4', 410, 145)
    create_number('13', 430, 205)
    create_number('6', 450, 265)
    create_number('10', 430, 325)
    create_number('15', 400, 385)
    create_number('2', 360, 435)
    create_number('17', 290, 465)
    create_number('3', 240, 475)
    create_number('19', 165, 465)
    create_number('7', 115, 435)
    create_number('16', 55, 385)
    create_number('8', 40, 325)
    create_number('11', 15, 265)
    create_number('14', 25, 205)
    create_number('9', 60, 145)
    create_number('12', 105, 90)
    create_number('5', 175, 60)

    // Double Ring
    var color = green
    for (var i=9; i<=351; i+=18) {
        if (color == red) color = green
        else if (color == green) color = red
        create_arc(color, board_diameter*.72, i/180*Math.PI, (i+18)/180*Math.PI)
    }

    // Outer Single Ring
    var color = white
    for (var i=9; i<=351; i+=18) {
        if (color == black) color = white
        else if (color == white) color = black
        create_arc(color, board_diameter*.6861, i/180*Math.PI, (i+18)/180*Math.PI)
    }

    // Triple Ring
    var color = green
    for (var i=9; i<=351; i+=18) {
        if (color == red) color = green
        else if (color == green) color = red
        create_arc(color, board_diameter*.4532, i/180*Math.PI, (i+18)/180*Math.PI)
    }
    
    // Inner Single Ring
    var color = white
    for (var i=9; i<=351; i+=18) {
        if (color == black) color = white
        else if (color == white) color = black
        create_arc(color, board_diameter*.4193, i/180*Math.PI, (i+18)/180*Math.PI)
    }

    // Bullseye
    create_arc(green, board_diameter*.06734, 0, 2*Math.PI)
    create_arc(red, board_diameter*.02689, 0, 2*Math.PI)
}

function create_arc(color, radius, start_angle, end_angle) {
    ctx.beginPath()
    ctx.moveTo(250, 250)
    ctx.fillStyle = color
    ctx.arc(250, 250, radius, start_angle, end_angle)
    ctx.fill()
}

function create_number(number, x, y) {
    ctx.beginPath()
    ctx.font = '35px Verdana'
    ctx.fillStyle = 'white'
    ctx.fillText(number, x, y)
}