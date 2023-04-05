// import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
// const { template, utils, rxjs } = ham;

const { forkJoin, Observable, iif, BehaviorSubject, AsyncSubject, Subject, interval, of, fromEvent, merge, empty, delay, from } = rxjs;
const { flatMap, reduce, groupBy, toArray, mergeMap, switchMap, scan, map, tap, filter } = rxjs.operators;
const { fromFetch } = rxjs.fetch;

const dragItem = ({ target, x }) => {
  // console.log('bb', bb)
  const dots = [...document.querySelectorAll('.dot')];
  dots.forEach((d) => {
    d.remove()

  });
  const { width, left, top, height } = target.getBoundingClientRect()
  const dot = document.createElement('div');

  const currCenter =  (width / 2);
  const currMiddle = top + (height / 2);
  dot.classList.add('dot')
  dot.style.top = currMiddle + 'px'
  dot.style.left = currCenter + 'px'
  document.body.append(dot)

  console.log('currCenter', currCenter)
  // console.log('currCenter', currCenter)
  const center = x - currCenter//(parseInt(getComputedStyle(target).width) / 2);
  // const center = x - (parseInt(getComputedStyle(target).width) / 2);
  target.style.left = (center) + 'px'
  // target.style.left = currCenter + 'px'
};

const resetItem = ({ target, x }) => {
  const pos1 = parseInt(getComputedStyle(target).left)
  const delta = pos1 - (parseInt(getComputedStyle(target).width) / 2)
  console.log('delta', delta)
  const center = x - (parseInt(getComputedStyle(target).width) / 2)
  target.style.left = null
};

const getDelta = () => {
  this.lastDragPoint.x + (currPoint.x - this.dragStartPoint.x)
}


let isSwiping = false;

const Points = {
  basePoint: { x: 0, y: 0, },
  dragStartPoint: { x: 0, y: 0, },
  lastDragPoint: { x: 0, y: 0, },
}

let start = {
  x: 0,
  y: 0,
}

let curr = {
  x: 0,
  y: 0,
}

let end = {
  x: 0,
  y: 0,
}

let delta = {
  x: 0,
  y: 0,
}


const list = document.querySelector('.list')
const listItems = [...document.querySelectorAll('.list-item')]
const app = document.querySelector('#app')



const pointerDown$ = fromEvent(listItems, 'pointerdown');
const pointerMove$ = fromEvent(listItems, 'pointermove');
const pointerUp$ = fromEvent(listItems, 'pointerup');


const swipe$ = pointerDown$
  .pipe(
    map(({ clientX, clientY }) => ({ x: clientX, y: clientY })),
    tap(startPoint => start = startPoint),
    tap(() => isSwiping = true),
    switchMap(startPoint => pointerMove$
      .pipe(
        scan((prev, { clientX, clientY, target }) => {
          const { width, left, top, height } = target.getBoundingClientRect()
          const currCenter = left + (width / 2);

          return {
            x: currCenter + (clientX - currCenter),
            y: (clientY) - (prev.y - startPoint.y),
            target
          }
        }, startPoint),
        tap(dragItem),

        switchMap(curr => pointerUp$
          .pipe(
            tap(() => Points.basePoint = curr),
            tap(() => start.x = 0),
            tap(() => isSwiping = false),
            tap(resetItem),

            tap(x => console.log('startPoint.x - curr.x', Math.abs(startPoint.x - curr.x))),
            tap(x => console.log('startPoint.x - curr.x', Math.abs(curr.x - startPoint.x) > 200)),
            filter(x => Math.abs(curr.x - startPoint.x) > 200),
            tap(({ target }) => {
              target.remove()
            }),
          )
        )
      )
    )
  );

swipe$.subscribe()

console.log('fuck')