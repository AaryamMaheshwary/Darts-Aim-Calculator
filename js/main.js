function get_score(x, y) {
    // Get the angle between the positive x axis and the dart
    var angle = Math.atan2(y, x) * 180 / Math.PI
    if (angle < 0) angle += 360

    // Get the distance between the dart and the center of the board
    var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    // Check if the dart has hit the bullseye or has missed the target
    if (dist <= 10) return 50
    else if (dist <= 20) return 25
    else if (dist > 144) return 0

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
    if (dist >= 74 && dist <= 84) score *= 3
    else if (dist >= 134 && dist <= 144) score *= 2

    return score
}