declare module '@theme/DocItem/Metadata/DocItemInfo' {
  export interface DocItemInfoProps {
    readonly className?: string;
  }
  export default function DocItemInfo(props: DocItemInfoProps): JSX.Element;
}

declare module '@theme/DocItem/Metadata/DocItemAuthors' {
  export interface DocItemAuthorsProps {
    readonly className?: string;
  }
  export default function DocItemAuthors(props: DocItemAuthorsProps): JSX.Element;
}

