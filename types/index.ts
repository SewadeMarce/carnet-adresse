import type mongoose from "mongoose";
import type { DefaultTimestampProps, Document, Types } from "mongoose";
export type UserType = (Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
} & DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    username: string;
    email: string;
    password: string;
} & DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null;

export type ContactType = {
    _id?: Types.ObjectId | string;
    userId?: Types.ObjectId;
    name: string;
    emails: string;
    favorite: boolean;
    color: string;
    phones: string | null | undefined;
    addresses: string | null | undefined;
    initials?: string | null | undefined;
}