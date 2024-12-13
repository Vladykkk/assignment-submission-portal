import "@testing-library/jest-dom";
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from "node:stream/web";
import { TextEncoder } from "util";
import "whatwg-fetch";

class BroadcastChannelMock implements BroadcastChannel {
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null =
    null;

  constructor(name: string) {
    this.name = name;
  }

  postMessage(message: any): void {}

  addEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void {}

  removeEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void {}

  close(): void {}

  dispatchEvent(event: Event): boolean {
    return true;
  }
}

global.TransformStream = TransformStream as any;
global.ReadableStream = ReadableStream as any;
global.WritableStream = WritableStream as any;
global.TextEncoder = TextEncoder;
global.BroadcastChannel = BroadcastChannelMock;
