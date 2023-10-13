"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateTriangles({ height, radius, numberOfSegments }) {
    const pointA = [0, 0, height];
    // eslint-disable-next-line prefer-const
    let triangles = [];
    const pointP0 = [radius * Math.cos(0), radius * Math.sin(0), 0];
    let prevPointP = pointP0;
    for (let index = 1; index < numberOfSegments; index++) {
        const angle = 2 * Math.PI * index / numberOfSegments;
        const X = Math.round(1000 * radius * Math.cos(angle)) / 1000;
        const Y = Math.round(1000 * radius * Math.sin(angle)) / 1000;
        const PointP = [X, Y, 0];
        triangles[index] = [...pointA, ...prevPointP, ...PointP];
        prevPointP = PointP;
    }
    triangles[0] = [...pointA, ...prevPointP, ...pointP0];
    return triangles;
}
exports.default = calculateTriangles;
