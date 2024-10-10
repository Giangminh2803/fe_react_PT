import { grey, green, blue, red, orange, yellow, purple, gray } from '@ant-design/colors';

export function colorMethod(method) {
    switch (method) {
        case "GET":
            return green[6]
        case "PATCH":
            return purple[6]
        case "POST":
            return yellow[6]
        case "DELETE":
            return red[6]
        default:
            return grey[10];
    }
}

export function colorRole(role) {
    switch (role) {
        case "SUPER ADMIN":
            return green[6]
        case "NORMAL USER":
            return blue[6]
        default:
            return gray[10];
    }
}