'use client';

import { useEffect } from 'react';

/****************************
 *  Tinkerbell Magic Sparkle *
 *(c)2005-13 mf2fm web-design*
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/

const SparkleEffect = () => {
  useEffect(() => {
    // Initialize variables
    let colour: string = 'random'; // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
    let sparkles: number = 50;

    let x: number = 400;
    let y: number = 300;
    let ox: number = 400;
    let oy: number = 300;
    let swide: number = 800;
    let shigh: number = 600;
    let sleft: number = 0;
    let sdown: number = 0;
    let tiny: HTMLDivElement[] = [];
    let star: HTMLDivElement[] = [];
    let starv: number[] = [];
    let starx: number[] = [];
    let stary: number[] = [];
    let tinyx: number[] = [];
    let tinyy: number[] = [];
    let tinyv: number[] = [];

    const createDiv = (height: number, width: number): HTMLDivElement => {
      const div: HTMLDivElement = document.createElement('div');
      div.style.position = 'absolute';
      div.style.height = `${height}px`;
      div.style.width = `${width}px`;
      div.style.overflow = 'hidden';
      return div;
    };

    const newColour = (): string => {
      const c: number[] = [
        255,
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * (256 - Math.random() * 128)),
      ];
      c.sort(() => 0.5 - Math.random());
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    };

    const set_width = () => {
      let sw_min = 999999;
      let sh_min = 999999;
      if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth > 0)
          sw_min = document.documentElement.clientWidth;
        if (document.documentElement.clientHeight > 0)
          sh_min = document.documentElement.clientHeight;
      }
      if (typeof self.innerWidth === 'number' && self.innerWidth) {
        if (self.innerWidth > 0 && self.innerWidth < sw_min)
          sw_min = self.innerWidth;
        if (self.innerHeight > 0 && self.innerHeight < sh_min)
          sh_min = self.innerHeight;
      }
      if (document.body.clientWidth) {
        if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min)
          sw_min = document.body.clientWidth;
        if (
          document.body.clientHeight > 0 &&
          document.body.clientHeight < sh_min
        )
          sh_min = document.body.clientHeight;
      }
      if (sw_min === 999999 || sh_min === 999999) {
        sw_min = 800;
        sh_min = 600;
      }
      swide = sw_min;
      shigh = sh_min;
    };

    const set_scroll = () => {
      if (typeof self.pageYOffset === 'number') {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset;
      } else if (
        document.body &&
        (document.body.scrollTop || document.body.scrollLeft)
      ) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
      } else if (
        document.documentElement &&
        (document.documentElement.scrollTop ||
          document.documentElement.scrollLeft)
      ) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop;
      } else {
        sdown = 0;
        sleft = 0;
      }
    };

    const mouse = (e: MouseEvent) => {
      y = e.pageY;
      x = e.pageX;
    };

    const update_star = (i: number) => {
      if (--starv[i] === 25) star[i].style.clip = 'rect(1px, 4px, 4px, 1px)';
      if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += ((i % 5) - 2) / 5;
        if (stary[i] < shigh + sdown) {
          star[i].style.top = `${stary[i]}px`;
          star[i].style.left = `${starx[i]}px`;
        } else {
          star[i].style.visibility = 'hidden';
          starv[i] = 0;
          return;
        }
      } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + 'px';
        tiny[i].style.left = (tinyx[i] = starx[i]) + 'px';
        tiny[i].style.width = '2px';
        tiny[i].style.height = '2px';
        tiny[i].style.backgroundColor = (
          star[i].childNodes[0] as HTMLDivElement
        ).style.backgroundColor;
        star[i].style.visibility = 'hidden';
        tiny[i].style.visibility = 'visible';
      }
    };

    const update_tiny = (i: number) => {
      if (--tinyv[i] === 25) {
        tiny[i].style.width = '1px';
        tiny[i].style.height = '1px';
      }
      if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += ((i % 5) - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
          tiny[i].style.top = `${tinyy[i]}px`;
          tiny[i].style.left = `${tinyx[i]}px`;
        } else {
          tiny[i].style.visibility = 'hidden';
          tinyv[i] = 0;
          return;
        }
      } else tiny[i].style.visibility = 'hidden';
    };

    const sparkle = () => {
      let c: number;
      if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (c = 0; c < sparkles; c++) {
          if (!starv[c]) {
            star[c].style.left = `${(starx[c] = x)}px`;
            star[c].style.top = `${(stary[c] = y + 1)}px`;
            star[c].style.clip = 'rect(0px, 5px, 5px, 0px)';
            (star[c].childNodes[0] as HTMLDivElement).style.backgroundColor = (
              star[c].childNodes[1] as HTMLDivElement
            ).style.backgroundColor =
              colour === 'random' ? newColour() : colour;
            star[c].style.visibility = 'visible';
            starv[c] = 50;
            break;
          }
        }
      }
      for (c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
      }
      setTimeout(sparkle, 40);
    };

    const init = () => {
      let rats, rlef, rdow;
      for (let i = 0; i < sparkles; i++) {
        rats = createDiv(3, 3);
        rats.style.visibility = 'hidden';
        rats.style.zIndex = '999';
        document.body.appendChild((tiny[i] = rats));
        starv[i] = 0;
        tinyv[i] = 0;
        rats = createDiv(5, 5);
        rats.style.backgroundColor = 'transparent';
        rats.style.visibility = 'hidden';
        rats.style.zIndex = '999';
        rlef = createDiv(1, 5);
        rdow = createDiv(5, 1);
        rats.appendChild(rlef);
        rats.appendChild(rdow);
        rlef.style.top = '2px';
        rlef.style.left = '0px';
        rdow.style.top = '0px';
        rdow.style.left = '2px';
        document.body.appendChild((star[i] = rats));
      }
      set_width();
      sparkle();
    };

    if (document.readyState === 'complete') {
      init();
    } else {
      window.onload = init;
    }
    document.onmousemove = mouse;
    window.onscroll = set_scroll;
    window.onresize = set_width;
  }, []);

  return null;
};

export default SparkleEffect;
