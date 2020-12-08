import { IResponse } from './request';
declare type Priority = -2 | -1 | 0 | 1 | 2;
export interface INotificationData {
    user: string;
    token: string;
    device?: string;
    url?: string;
    url_title?: string;
    timestamp?: number;
    html?: 1;
    title: string;
    message: string;
    sound: Sound;
    priority: number;
    expire: number;
    retry: number;
    file?: {
        name: string;
        filePath: string;
    };
}
declare type Sound = 'pushover' | 'bike' | 'bugle' | 'cashregister' | 'classical' | 'cosmic' | 'falling' | 'gamelan' | 'incoming' | 'intermission' | 'magic' | 'mechanical' | 'pianobar' | 'siren' | 'spacealarm' | 'tugboat' | 'alien' | 'climb' | 'persistent' | 'echo' | 'updown' | 'vibrate' | 'none';
export declare class Pushover {
    private _hostname;
    private _path;
    private _notification;
    constructor(user: string, token: string);
    setDevice(device: string): Pushover;
    setHtml(): Pushover;
    setTitle(title: string): Pushover;
    setMessage(message: string): Pushover;
    setSound(sound: Sound): Pushover;
    setAttachment(name: string, filePath: string): Pushover;
    setPriority(priority: Priority, expire?: number, retry?: number): Pushover;
    setUrl(url: string, title?: string): Pushover;
    setTimestamp(timestamp: number): Pushover;
    send(title?: string, message?: string): Promise<IResponse>;
}
export {};
//# sourceMappingURL=pushover.d.ts.map