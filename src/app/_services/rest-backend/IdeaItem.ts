export interface IdeaItem {
  id?: number; 
  title: string;
  description: string;
  createdAt?: Date; 
  updatedAt?: Date;
  UserUserName?: string; 
  TotalVotes?: number;
  PositiveVotes?: number;
  NegativeVotes?: number;
  Comments?: CommentItem[];
}

export interface CommentItem {
  id?: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  IdeaId?: number;
  UserUserName?: string;
}

/*
{
  "id": 1,
  "title": "My Awesome Idea",
  "description": "This is my amazing idea that will change the world!",
  "createdAt": "2024-06-07T07:14:54.968Z",
  "updatedAt": "2024-06-07T07:14:54.968Z",
  "UserUserName": "davide",
  "Comments": [
    {
      "id": 1,
      "text": "This is a comment",
      "createdAt": "2024-06-07T16:16:18.505Z",
      "updatedAt": "2024-06-07T16:16:18.505Z",
      "IdeaId": 1,
      "UserUserName": "davide"
    },
    {
      "id": 2,
      "text": "This is a comment",
      "createdAt": "2024-06-07T16:16:21.302Z",
      "updatedAt": "2024-06-07T16:16:21.302Z",
      "IdeaId": 1,
      "UserUserName": "davide"
    },
    {
      "id": 3,
      "text": "This is a comment",
      "createdAt": "2024-06-07T16:16:21.924Z",
      "updatedAt": "2024-06-07T16:16:21.924Z",
      "IdeaId": 1,
      "UserUserName": "davide"
    }
  ]
}
*/