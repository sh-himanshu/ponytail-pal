import axios from "axios";

export interface Token {
  sorton: string;
  token: string;
}

export interface Post {
  id: string;
  userid: string;
  iscalendarentry: boolean;
  media: {
    mediatype: number;
    mediaurl: string;
    fileid: string;
    aspectratio: string;
  }[];
  rating: number;
  text: string;
  privacy: string;
  typeofday: string[];
  calendardatetime: string;
  createdontimestamp: string;
}

export interface ResponseData {
  requesteruserid: null;
  requesterusername: null;
  responseobjects: {
    posts: Post[];
    continuationtoken: Token;
  }[];
}

export const fetchPosts = (token: Token | null = null, count: number = 40) =>
  axios.post<ResponseData>("https://api.quinn.care/graph", {
    requestobjects: [
      {
        posts: {
          operationtype: "read",
          id: {
            return: true,
          },
          userid: {
            searchvalues: ["adbef521-7cf6-4344-af48-a9480df46549"],
            return: true,
          },
          iscalendarentry: {
            searchvalues: ["true"],
            return: true,
          },
          media: {
            return: true,
          },
          rating: {
            return: true,
          },
          text: {
            return: true,
          },
          privacy: {
            searchvalues: [18],
            return: true,
          },
          typeofday: {
            return: true,
          },
          calendardatetime: {
            return: true,
            sort: "descending",
          },
          maxitemcount: count.toString(),
          continuationtoken: token,
        },
      },
    ],
  });
