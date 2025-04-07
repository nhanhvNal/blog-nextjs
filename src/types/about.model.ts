export interface AboutModel {
  profile: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
  story: {
    title: string;
    content: string[];
  };
  mission: {
    title: string;
    content: string[];
  };
}
