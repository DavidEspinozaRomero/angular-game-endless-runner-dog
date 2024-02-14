// collision de rectangulos

let rect1 = { x: 5, y: 5, width: 50, height: 50 };
let rect2 = { x: 20, y: 10, width: 10, height: 10 };

// let isColliding = (rect1, rect2) => {
//   return rect1.x < rect2.x + rect2.width &&
//     rect1.x + rect1.width > rect2.x &&
//     rect1.y < rect2.y + rect2.height &&
//     rect1.height + rect1.y > rect2.y;
// }

function isColliding1(rect1: RectanguloProps, rect2: RectanguloProps) {
  return (
    rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.height + rect1.y < rect2.y
  );
}

// contrato
interface RectanguloProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

// colicion de circulos

const circle1 = { x: 500, y: 500, radius: 300 };
const circle2 = { x: 10, y: 10, radius: 150 };

function isColliding2(circle1: CirculoProps, circle2: CirculoProps) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.hypot(dx, dy);
  return distance < circle1.radius + circle2.radius;
  /*
  if (distance < circle1.radius + circle2.radius) {
    // colliding
  } else if (distance == circle1.radius + circle2.radius) {
    // touching
  } else {
    // not colliding
  }
  */
}

interface CirculoProps {
  x: number;
  y: number;
  radius: number;
}
