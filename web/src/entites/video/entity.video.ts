import { User } from "../user/user.interface";

export default interface Video {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt?: Date;
  creator: User;
}
