import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TimelineMax, TweenMax } from 'gsap';
import { WheelActionModel, ActionItems } from './wheel.model';
declare let Winwheel: any;

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements AfterViewInit, OnInit {
  outerWheel: any;
  innerWheel: any;
  innerSegment: any[] = [];
  outerSegment: any[] = [];
  wheelSpinning = false;
  private _textSize: number;
  private _repeat: number;
  private _fairMode: number;
  @Output() result = new EventEmitter<string>();
  @Input() numSegments: number = 8;
  @Input() spinTime: number = 1;
  @Input() repeat: number = 1;
  @Input() fairMode: boolean = false;
  @Input() height: string = '200';
  @Input() width: string = '200';
  @Input() segmentData: any[] = [];
  @Input() set textSize(value: number) {
    if (value) {
      if (!this._textSize) {
        this._textSize = value;
      }
      else {
        this.innerWheel.textFontSize = value;
        this.innerWheel.draw();
        this.outerWheel.draw(false);
      }
    }
  }
  @Input() set action(value: WheelActionModel) {
    if (value) {
      this.manipulateSegments(value);
    }
  }

  ngOnInit() {
    this.updateSegments(this.segmentData);
  }

  ngAfterViewInit(): void {
    // Need to create the SECONDARY wheel first because on construct the variable which keeps track of the wheel to animate will
    // be set to the last created wheel, and we want the outer one the primary with the animation etc.
    this.innerWheel = new Winwheel({
      'numSegments': this.numSegments,
      'outerRadius': (parseInt(this.width) / 2) - 5,
      'centerX': (parseInt(this.width) / 2),
      'centerY': (parseInt(this.width) / 2),
      'lineWidth': 0.1,
      'textFontSize': this._textSize,
      'segments': this.innerSegment,
      'animation':
      {
        'type': 'spinToStop',
        'direction': 'clockwise',                   // Define animation more or less as normal, except for the callbackAfter().
        'duration': 5,
        'spins': this.spinTime,
        'callbackAfter': this.drawTriangle.bind(this),     // Call back after each frame of the animation a function we can draw the inner wheel from.
        'callbackFinished': this.alertPrize.bind(this)
      }
    });

    // Define the outer wheel, we will treat this as the PRIMARY which means it clears the canvas when drawing and also
    // gets the animaton applied to it. We must callback a function during the animation to move and draw the inner wheel
    // so the 2 wheels appear as one thing on the canvas.
    this.outerWheel = new Winwheel({
      'numSegments': this.numSegments,
      'textMargin': 0,
      'centerX': (parseInt(this.width) / 2),
      'centerY': (parseInt(this.width) / 2),
      'outerRadius': parseInt(this.width) / 2,
      'innerRadius': (parseInt(this.width) / 2) - 5,
      'lineWidth': 0.1,
      'segments': this.outerSegment,
      'animation':
      {
        'type': 'spinToStop',
        'direction': 'clockwise',
        'spins': this.spinTime,
        'duration': 5,                  // Define animation more or less as normal, except for the callbackAfter().
      }
    });
    // Call draw on the outerWheel then the inner wheel to ensure that both are rendered on the canvas.
    this.innerWheel.draw();
    this.outerWheel.draw(false);   // Pass false to stop it clearing the canvas and wiping the outer wheel.
  }

  // This function is called after the outer wheel has drawn during the animation.
  drawOuterWheel() {
    // Update the rotationAngle of the innnerWheel to match that of the outer wheel - this is a big part of what
    // links them to appear as one 2-part wheel. Call the draw function passing false so the outer wheel is not wiped.
    this.outerWheel.rotationAngle = this.innerWheel.rotationAngle;
    this.outerWheel.draw(false);
  }

  // Called when the animation has finished.
  alertPrize() {
    // The the indicated segments from the 2 wheels.
    let winningInnerSegment = this.innerWheel.getIndicatedSegment();
    // Alert the combination of prizes won.
    this.result.emit(winningInnerSegment.text);
    // Set things so power and spin button can be clicked again.
    this.wheelSpinning = false;
    this.innerWheel.stopAnimation(false);
    this.innerWheel.rotationAngle = 0;
  }

  startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (this.wheelSpinning == false) {
      this.innerWheel.animation.spins = this.spinTime * 2;
      // Begin the spin animation by calling startAnimation on the wheel object.
      this.innerWheel.startAnimation(new TweenMax(new TimelineMax()));
      // Set to true so that power can't be changed and spin button re-enabled during
      // the current animation. The user will have to reset before spinning again.
      this.wheelSpinning = true;
    }
  }

  drawTriangle() {
    this.drawOuterWheel();
    let tx = this.outerWheel.ctx;
    tx.strokeStyle = '#000000';     // Set line colour.
    tx.fillStyle = 'black';        // Set fill colour.
    tx.lineWidth = 2;
    tx.beginPath();                 // Begin path.
    const position = (parseInt(this.outerWheel.outerRadius) - 30);
    tx.moveTo(position, 2);             // Move to initial position.
    tx.lineTo(position + 60, 2);             // Draw lines to make the shape.
    tx.lineTo(position + 30, 20);
    tx.lineTo(position + 1, 2);
    tx.stroke();                    // Complete the path by stroking (draw lines).
    tx.fill();
  }

  updateSegments(segmentData: any[]) {
    this.innerSegment = [];
    this.outerSegment = [];
    segmentData.map(x => {
      this.innerSegment.push({ 'fillStyle': x.bgColor, 'text': x.name, 'textFillStyle': x.textColor });
      this.outerSegment.push({ 'fillStyle': this.lightenColor(x.bgColor, 20) });
    });
  }

  manipulateSegments(value: WheelActionModel) {
    switch (value.action) {
      case ActionItems.ADD: {
        this.updateSegments(value.param);
        this.innerWheel.addSegment(this.innerSegment[0], value.index);
        this.outerWheel.addSegment(this.outerSegment[0], value.index);
        break;
      }
      case ActionItems.UPDATE: {
        value.index = value.index + 1;
        this.innerWheel.segments[value.index].fillStyle = value.param[0]['bgColor'];
        this.innerWheel.segments[value.index].textFillStyle = value.param[0]['textColor'];
        this.innerWheel.segments[value.index].text = value.param[0]['name'];
        this.outerWheel.segments[value.index].fillStyle = this.lightenColor(value.param[0]['bgColor'], 20);
        break;
      }
      case ActionItems.DELETE: {
        this.innerWheel.deleteSegment(value.index);
        this.outerWheel.deleteSegment(value.index);
        break;
      }
      default: {
        break;
      }
    }
    // The draw method of the wheel object must be called to render the changes.
    this.innerWheel.draw();
    this.outerWheel.draw(false);
  }

  lightenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = (num >> 8 & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;
    return '#' + ((0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1));
  };
}
