import React from "react";

export type SeoMetaTagType = {
  tag: string;
  content: string | null;
  attributes: Record<string, string> | null;
};

export type ToMetaTagsType = SeoMetaTagType[];

export const renderMetaTags = function(data: SeoMetaTagType[]): JSX.Element[] {
  return data.map(({ tag, attributes, content }) => {
    let key: string[] = [tag];

    if (attributes && "property" in attributes) {
      key.push(attributes.property);
    }

    if (attributes && "name" in attributes) {
      key.push(attributes.name);
    }

    const Tag = (tag as 'meta' | 'title');

    return (
      <Tag key={key.join("-")} {...attributes}>
        {content}
      </Tag>
    );
  });
};

const serializeAttributes = (attributes: Record<string, string> | null) => {
  if (!attributes) {
    return "";
  }

  return " " + Object.entries(attributes).map(([key, value]) => (
    `${key}="${value}"`
  )).join(" ")
}

export const renderMetaTagsToString = function(data: SeoMetaTagType[]) {
  return data.map(({ tag, attributes, content }) => {
    if (content) {
      return `<${tag}${serializeAttributes(attributes)}>${content}</${tag}>`;
    }

    return `<${tag}${serializeAttributes(attributes)} />`;
  }).join("\n");
};