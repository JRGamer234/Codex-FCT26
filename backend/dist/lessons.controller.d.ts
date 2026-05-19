import { Model } from 'mongoose';
export declare class LessonsController {
    private lessonModel;
    constructor(lessonModel: Model<any>);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
}
